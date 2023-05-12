import { splitIpPort } from '../utils/utils';
import LnMessage from 'lnmessage';

const createLnConnection = async ({remoteNodeId, ip, port, privateKey}) => {
  try {
    const ln = new LnMessage({
      remoteNodePublicKey: remoteNodeId,
      wsProxy: process.env.REACT_APP_WS_PROXY,
      ip: ip,
      port: port,
      privateKey: privateKey,
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
      // const output = await executeLnCommand(ln, "getinfo", [], rune)
      // console.log(output);
      // return output;
    } catch (error) {
      console.error("Error connecting to node:", error);
    }
  };
  
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  export const executeCLNCommandWithReconnect = async ({ipPort, id, privateKey, rune, method, params, lnConnection, setLnConnection, retries = 3, retryDelay = 1000}) => {
    let currentRetry = 0;
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
  
    // Retry the connection until successful or out of retries
    while (currentRetry <= retries) {
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
      } else if (currentConnection.connectionStatus$.value !== 'connected') {
        await currentConnection.connect();
      }
  
      if (currentConnection.connectionStatus$.value === 'connected') {
        setLnConnection(currentConnection);
        output = await executeCLNCommand(currentConnection, method, params, rune);
        if (output !== null) {
          // Command executed successfully, return the output
          return output;
        } else {
          console.error('executeLNCommand failed');
        }
      }
  
      // Increment the current retry counter and wait before the next retry
      currentRetry++;
      if (currentRetry <= retries) {
        await sleep(retryDelay);
      }
    }
  
    // If the loop finishes, all retries have failed
    console.error(`Failed to execute command after ${retries} retries.`);
    return null;
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
      return null;
    }
  };