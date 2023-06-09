import { connectToCLNNode } from './clnNodeHandler';
import { isValidRune } from '../utils/validations';
import { generateKeyPair } from '../utils/utils';
import { clnNodeMessages } from './messages/clnNodeMessages';
import { parseNodeIdIpPort } from '../utils/utils';

const handleConnectCLNNode = ({stage, systemMode, setSystemMode, LNnodeIPPort, setLNnodeIPPort, LNnodeID, setLNnodeID, LNNodeRune, setLNnodeRune, messages, setMessages, userPrompt, lnConnection, setLnConnection}) => {
  let messageText = '';

  if (stage === 1) {
    setSystemMode('connectCLNModeIP');
    messageText = clnNodeMessages.stageOne;
  } else if (stage === 2) {
    const ipPortIDObj = parseNodeIdIpPort(userPrompt);

    if (ipPortIDObj) {
      setSystemMode('connectCLNModeRune');
      const ipPortString = `${ipPortIDObj.ip}:${ipPortIDObj.port}`;
      localStorage.setItem("LNNodeipPort", ipPortString);
      setLNnodeIPPort(ipPortString);
      localStorage.setItem("LNNodeID", ipPortIDObj.nodeId);
      setLNnodeID( ipPortIDObj.nodeId);
      const keys = generateKeyPair()
      localStorage.setItem("SessionPrivateKeyHex", keys.privateKey);
      localStorage.setItem("SessionPublicKeyHex", keys.publicKey)

      messageText = clnNodeMessages.stageTwo.replace('PUBLIC_KEY_PLACEHOLDER', keys.publicKey);
    } else { 
      setSystemMode('')
      messageText = clnNodeMessages.invalidInput;
    }

  } else if (stage === 3) {
    if (isValidRune(userPrompt)) {
      // Save rune locally and in localStorage
      localStorage.setItem("LNNoderune", userPrompt);
      // Assuming you have a local state variable named `rune`
      setLNnodeRune(userPrompt);
      // Call the connectToNode function
      messageText = clnNodeMessages.establishingConnection;
      try {
        connectToCLNNode({
          ipPort: LNnodeIPPort, 
          id: LNnodeID, 
          privateKey: localStorage.getItem("SessionPrivateKeyHex"), 
          rune: userPrompt,
          lnConnection: lnConnection, // replace with your actual variable
          setLnConnection: setLnConnection // replace with your actual function
        });
        
      } catch (error) {
        console.error('Error connecting to node:', error);
        messageText = 'An error occurred while connecting to the node. Please try again.';
      }
    } else {
      setSystemMode('')
      messageText = clnNodeMessages.invalidRune;
    }
  }

  setMessages((prevMessages) => [
    ...prevMessages,
    {
      sender: 'system',
      text: messageText,
    },
  ]);
};

export default handleConnectCLNNode;
