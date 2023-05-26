import { splitIpPort } from '../utils/utils';
import LnMessage from 'lnmessage';

const createLnConnection = async ({remoteNodeId, ip, port, privateKey}) => {

  try {

    const logger = {
      info: (message) => console.log(`INFO: ${message}`),
      warn: (message) => console.log(`WARN: ${message}`),
      error: (message) => console.log(`ERROR: ${message}`),
    };
    
    const ln = new LnMessage({
      remoteNodePublicKey: remoteNodeId,
      wsProxy: process.env.REACT_APP_WS_PROXY,
      ip: ip,
      port: port,
      privateKey: privateKey,
      logger: logger,
    });

    const isConnected = await ln.connect();
    console.log("connection:", isConnected);
    if (isConnected) {
      console.log("returning", isConnected);
      return ln;
    } else {
      throw new Error('Failed to connect to the node');
    }
  } catch (error) {
    console.error('Error:', error.message);
    return null;
  }
  };

export const connectToCLNNode = async ({ipPort, id, privateKey, rune, lnConnection, setLnConnection}) => {
    console.log("Connecting to node:", ipPort, id, privateKey, rune);
    
    const { ip, port } = splitIpPort(ipPort);
    try {
      const ln = await createLnConnection({
        remoteNodeId: id, 
        ip: ip, 
        port: port, 
        privateKey: privateKey
      });
      
      setLnConnection(ln); // Update the lnConnection state
      return ln
      
    } catch (error) {
      console.error("Error connecting to node:", error);
    }
  };
  
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  export const executeCLNCommandWithReconnect = async ({ipPort, id, privateKey, rune, method, params, lnConnection, setLnConnection, retryDelay = 1000}) => {
    let output = null;
  
    // Establish the connection and execute the command if it's already connected
    if (lnConnection && lnConnection.connectionStatus$.value === 'connected') {
      output = await executeCLNCommand(lnConnection, method, params, rune);
      if (output !== null) {
        // Command executed successfully, return the output
        return output;
      } else {
        console.error('executeLNCommand failed');
      }
    }
  
    // Keep trying to connect and execute the command indefinitely until successful
    while (true) {
      let currentConnection = lnConnection;
  
      if (!currentConnection) {
        currentConnection = await connectToCLNNode({
          ipPort: ipPort, 
          id: id, 
          privateKey: privateKey, 
          rune: rune, 
          lnConnection: lnConnection, 
          setLnConnection: setLnConnection
        });
  
        // Check if currentConnection is not null before proceeding
        if (!currentConnection) {
          console.error('Unable to establish connection');
          await sleep(retryDelay);
          continue;
        }
      }
  
      // Check connection status if currentConnection is not null
      if (currentConnection && currentConnection.connectionStatus$.value !== 'connected') {
        await currentConnection.connect();
      }
  
      // Check connection status and execute command if currentConnection is not null
      if (currentConnection && currentConnection.connectionStatus$.value === 'connected') {
        setLnConnection(currentConnection);
        output = await executeCLNCommand(currentConnection, method, params, rune);
        if (output !== null) {
          // Command executed successfully, return the output
          return output;
        } else {
          console.error('executeLNCommand failed');
        }
        return
      }
  
      // Wait before the next retry
      await sleep(retryDelay);
    }
  };
  

  export async function executeCLNCommand(ln, method, params, rune) {
    if (!ln) {
      console.error('No connection available');
      return null;
    }
  
    try {
      const result = await ln.commando({
        method: method,
        params: params,
        rune: rune,
      });
      return result;
    } catch (error) {
      console.error('Error executing command:', error.message);
      throw error;
    }
  };
