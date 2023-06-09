import '../styles/ChatStyles.css';
import '../styles/Dotpulse.css';
import '../styles/SidebarStyles.css';
import '../styles/faqstyles.css';
import '../styles/bkprstyles.css';
import JSONFormatter from 'json-formatter-js';
import { FaBars, FaTimes } from 'react-icons/fa';
import { getInitialUnlockedActions, sanitizeSatsInput } from '../utils/utils';
import actionsData from '../actions/actions.json';
import * as ActionsPreprocess from '../actions/actions_preprocess';
import CustomOstrichIcon from './CustomOstrichIcon';
import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import aiAvatar from '../assets/images/ai-avatar.png';
import userAvatar from '../assets/images/user-avatar.png';
import systemAvatar from '../assets/images/system-avatar.png';
import serverAvatar from '../assets/images/system-avatar.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileAlt, faPaste, faCoffee, faQuestionCircle, faFingerprint, faTrash, faFileExport, faBolt } from "@fortawesome/free-solid-svg-icons";
import { faCircleNodes } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faTwitter, faTelegram } from '@fortawesome/free-brands-svg-icons';
import QRCode from 'qrcode.react';
import DOMPurify from 'dompurify';
import socket from '../socket.js';
import handleConnectCLNNode from '../handlers/handleConnectCLNNode';
import { connectToCLNNode, executeCLNCommandWithReconnect } from '../handlers/clnNodeHandler';
import { handleTopUp } from '../handlers/handleTopUp'
import { handleNostrExport, handleNostrExportPhase2 } from '../handlers/handleNostrExport'
import { fetchCreateUser, fetchBalanceLimits, fetchUserBalance } from '../handlers/backendCommHandler';
import { FAQ } from './QAtext';
import ParamsReviewModal from './ParamsReviewModal';


function AutoBTC({ chatMode: initialChatMode }) {
  const [placeholder, setPlaceholder] = useState("Type your question...");
  // React Hooks to manage sidebar state
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);
  const [style, setStyle] = useState({});
  const [unlockedActions, setUnlockedActions] = useState(getInitialUnlockedActions());
  const [deferredActions, setDeferredActions] = useState([]);
  const [chatMode, setChatMode] = useState(initialChatMode || 'normal');
  const [pricingData, setPricingData] = useState({ price_per_image_sats: 0, tokens_per_sat: 0 });
  const [userPrompt, setUserPrompt] = useState('');
  const [lnConnection, setLnConnection] = useState(null);
  const [currentConnectionStatus, setCurrentConnectionStatus] = useState("disconnected");
  const [aiThinking, setAiThinking] = useState(false);
  const [uniqueId, setUniqueId] = useState('');
  const [LNnodeIPPort, setLNnodeIPPort] = useState('');
  const [LNnodeID, setLNnodeID] = useState('');
  const [LNnodeRune, setLNnodeRune] = useState('');
  const [nostrPrivKey, setNostrPrivKey] = useState(null);
  const [balance, setBalance] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  const [systemMode, setSystemMode] = useState('');
  const [balanceLimits, setBalanceLimits] = useState({ min_balance: 1000, max_balance: 10000 });
  const [exportOptionsVisible, setExportOptionsVisible] = useState(false);
  const [pendingInvoices, setPendingInvoices] = useState(new Map());
  const messagesEndRef = useRef(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentAction, setCurrentAction] = useState(null);
  const [uniqueIdVisible, setUniqueIdVisible] = useState(false);
  const [normalChatMessages, setNormalChatMessages] = useState([
    { sender: 'ai', text: 'Hello, how are you?', total_tokens: null },
  ]);
  const [lightningChatMessages, setLightningChatMessages] = useState([
    { sender: 'ai', text: 'Hello! How can I assist you with Lightning today?', total_tokens: null },
  ]);
  const [imagesCreatorMessages, setImagesCreatorMessages] = useState([
    { sender: 'ai', text: 'Welcome to Images Creator!', total_tokens: null },
  ]);
  const [faqMessages, setQandaMessages] = useState([
    { sender: 'system', text: FAQ, total_tokens: null },
  ]);
  const inputRef = useRef();

  const messages = useMemo(() => {
    switch (chatMode) {
      case 'normal':
        return normalChatMessages;
      case 'lightning':
        return lightningChatMessages;
      case 'images':
        return imagesCreatorMessages;
      case 'faq':
        return faqMessages;
      default:
        return [];
    }
  }, [chatMode, normalChatMessages, lightningChatMessages, imagesCreatorMessages, faqMessages]);

  const handlePricingUpdate = (data) => {
    setPricingData({
      price_per_image_sats: data.price_per_image_sats,
      tokens_per_sat: data.tokens_per_sat,
    });
  };

  useEffect(() => {
    socket.on("pricing_update", handlePricingUpdate);

    return () => {
      socket.off("pricing_update", handlePricingUpdate);
    };
  }, [socket, setPricingData]);

  const setMessages = useCallback(
    (updateFunction) => {
      switch (chatMode) {
        case 'normal':
          setNormalChatMessages(updateFunction);
          break;
        case 'lightning':
          setLightningChatMessages(updateFunction);
          break;
        case 'images':
          setImagesCreatorMessages(updateFunction);
          break;
        case 'faq':
          setQandaMessages(updateFunction);
          break;
        default:
          break;
      }
    },
    [chatMode]
  );

  // Function to lock all unlocked actions
  const lockAllNodeActions = useCallback(() => {
    const lockedActions = unlockedActions.filter(action => action.category !== 'node');
    setUnlockedActions(lockedActions);
  }, [unlockedActions, setUnlockedActions]);

  const handleExportToggle = useCallback(() => {
    setExportOptionsVisible(prev => !prev);
  }, [setExportOptionsVisible]);

  // Function to handle copying the invoice to the clipboard
  const copyToClipboard = useCallback((text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Invoice copied to clipboard');
    });
  }, []);

  const handleExportHTML = useCallback(() => {
    const jsonData = JSON.stringify(messages);
    const blob = new Blob([jsonData], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'chat_messages.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [messages]);


  async function changeModeWrapper(method, params) {
    let message = `We want to save you sats! For non-lightning related questions or operations, it's cheaper to switch to another chat mode. Would you like to do so?`;

    // You can replace the `confirm` function with a custom modal or alert
    if (confirm(message)) {

      setAiThinking(false);
      if (method === "changeToNormalChatMode") {
        setChatMode("normal")
      } else if (method === "changeToImagesChatMode") {
        setChatMode("images")
      }
    }
  }


  async function GeneratedAIQr(method, params) {
    // Check if both offer and style are missing
    if (!params || (!params.offer && !params.style)) {
      return { error: 'Missing required parameters' };
    }
  
    const bolt12 = params.offer || '';
    const style = params.style || '';
    const url = `https://bolt12.tattoo/?type=bolt12&value=${encodeURIComponent(bolt12)}&option=${encodeURIComponent(style)}`;
  
    // Construct the JSON response
    const jsonResponse = {
      bolt12: bolt12,
      style: style,
      url: url
    };
  
    return jsonResponse;
  }
  

  async function executeCLNCommandWrapper(method, params) {
    const LNNodeipPort = localStorage.getItem("LNNodeipPort");
    const LNNodeID = localStorage.getItem("LNNodeID");
    const SessionPrivateKeyHex = localStorage.getItem("SessionPrivateKeyHex");
    const LNNoderune = localStorage.getItem("LNNoderune");

    try {
      let output = await executeCLNCommandWithReconnect({
        ipPort: LNNodeipPort,
        id: LNNodeID,
        privateKey: SessionPrivateKeyHex,
        rune: LNNoderune,
        method: method,
        params: params,
        lnConnection: lnConnection,
        setLnConnection: setLnConnection
      });

      return output;

    } catch (error) {
      if (error.name === "ConnectionError") {
        throw {
          name: "ConnectionError",
          message: "Could not connect to Lightning node. Please check your connection and try again."
        };
      } else {
        throw {
          name: "CLNCommandError",
          message: `An unexpected error occurred. Reason: ${error.message}`
        };
      }
    }

  }

  const handleSetChatMode = (mode) => {
    if (!aiThinking) {
      console.log("Chat mode changed to:", mode);
      setChatMode(mode);
    } else {
      // Perform some action or show a message when the AI is thinking
      console.log("Cannot change chat mode while AI is thinking");
    }
  };

  const enterTopUpMode = () => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: 'system', text: `Please enter an amount of sats between ${Math.max(balanceLimits.min_balance - balance, 1)} and ${balanceLimits.max_balance - balance}` },
    ]);
    setSystemMode("topUpMode");
  };

  const enterSponsorMode = () => {

    const sponsorshipText = `
    <p>Thank you for considering sponsoring <strong>AutoBTC</strong>, the pioneering project that harnesses the incredible power of large language models and artificial intelligence to revolutionize the Bitcoin and Lightning ecosystems, your support is vital to our mission.</p>

    <p>To begin your sponsorship journey, please input the amount you wish to contribute in <em>sats</em>. For generous contributions, we offer exclusive sponsorship packages tailored to your needs. To learn more about these unique opportunities and how they can benefit you, don't hesitate to reach out to us via <a href="https://nostr.com" target="_blank">Nostr</a> or <a href="https://twitter.com" target="_blank">Twitter</a>.</p>
    
    <p>By sponsoring <strong>AutoBTC</strong>, you not only contribute to the ongoing development and enhancement of our innovative platform, but also demonstrate your unwavering commitment to fostering the growth and adoption of Bitcoin and the Lightning network. Join us in shaping the future of financial technology, where the synergy of cutting-edge AI and the transformative potential of BTC and Lightning create unparalleled possibilities!</p>
    `;


    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: 'system', text: sponsorshipText },
    ]);
    setSystemMode("sponsorMode");
  };

  const enterRestoreAccountMode = () => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: 'system', text: 'Please enter your secret account ID to restore your account.' },
    ]);
    setSystemMode("restoreAccountMode")
  };

  const enterConnectNodeMode = () => {

    const NodeImpl = localStorage.getItem("LNNodeImpl");

    if (checkLocalStorageValues() && NodeImpl.toLowerCase() === 'cln') {
      // All required values exist in local storage and NodeImpl is 'cln'
      const LNNodeipPort = localStorage.getItem("LNNodeipPort");
      const LNNodeID = localStorage.getItem("LNNodeID");
      const SessionPrivateKeyHex = localStorage.getItem("SessionPrivateKeyHex");
      const LNNoderune = localStorage.getItem("LNNoderune");

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          sender: "system",
          text: "All required connection values have been saved to your browser's local storage. Connecting to your node...",
        },
      ]);

      // Proceed with connecting to the node using the connectToNode function


      setMessages((prevMessages) => {
        (async () => {

          try {
            let out = await executeCLNCommandWithReconnect({
              ipPort: LNNodeipPort,
              id: LNNodeID,
              privateKey: SessionPrivateKeyHex,
              rune: LNNoderune,
              method: "getinfo",
              params: [],
              lnConnection: lnConnection,
              setLnConnection: setLnConnection
            });

            setMessages([
              ...prevMessages,
              {
                sender: "system",
                text: chatMode !== 'lightning' ? `Connected to ${out.alias} ⚡ <br/> Consider changing mode to Lightning Assistant` : `Connected to ${out.alias} ⚡`
              },
            ]);
          } catch (error) {
            if (error.name === "ConnectionError") {
              setMessages([
                ...prevMessages,
                {
                  sender: "system",
                  text: `Could not connect to Lightning node. Please check your connection and try again. ${error.message}`
                },
              ]);
            } else {
              setMessages([
                ...prevMessages,
                {
                  sender: "system",
                  text: `An unexpected error occurred. Please try again later. ${error.message}`
                },
              ]);
            }
          }

        })();
        return prevMessages;
      });

    } else {

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          sender: 'system',
          text: 'The ability to connect to your Lightning node is an experimental feature. At the moment, we support read-only actions, which are enforced by your node. Please specify the implementation you are using: CLN, LND, or LDK.',
        },
      ]);
      setSystemMode("connectNodeMode");
    }
  };

  const enterNostrExportMode = () => {
    const storedPrivateKey = localStorage.getItem('nostrPrivateKey');
    const storedRelayUrl = localStorage.getItem('nostrRelayUrl');

    if (storedPrivateKey && storedRelayUrl) {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          sender: 'system',
          text: `Your Nostr private key and Relay URL (${storedRelayUrl}) have been saved to your browser's local storage. Would you like to use them? (yes/no)`,
        },
      ]);
      setSystemMode('useStoredNostrData');
    } else {

      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'system', text: "Please provide any Nostr private key. The key remains safely within your browser without being transmitted to the server and will be used to sign only the operations you asked for." },
      ]);
      setSystemMode('nostrExportMode');
    }
  };

  const enterNostrExportModePhase2 = () => {
    setSystemMode('relayUrlMode');
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        sender: 'system',
        text:
          'The provided key is valid. Now, please provide the relay URL to use for the Nostr operation.',
      },
    ]);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleToggleIdVisibility = () => {
    setUniqueIdVisible(!uniqueIdVisible);
  };


  const handleModalClose = () => {
    if (deferredActions.length > 0) {
      // Resolve the promise
      const { resolve } = deferredActions[0];
      resolve();

      // Remove the current action from the deferred actions list
      setDeferredActions(prevDeferredActions => prevDeferredActions.slice(1));
    }

    setModalOpen(false);
  };


  const handleModalApproval = async (formData) => {
    if (deferredActions.length > 0) {
      let action = { ...deferredActions[0].action }; // create a new action object

      // Convert action.args from an array to an object
      let argsObj = {};
      action.args.forEach(arg => {
        argsObj[arg.name] = arg.value;
      });

      // Update the values from formData
      Object.keys(formData).forEach(key => {
        if (key !== undefined && formData[key] !== undefined && formData[key] !== '') {
          argsObj[key] = formData[key]; // Update the argument's value
        }
      });


      action.args = argsObj; // Assign the updated args object back to action.args


      // Update the action in the deferredActions state
      setDeferredActions(prevDeferredActions => {
        let updatedDeferredActions = [...prevDeferredActions];
        updatedDeferredActions[0].action = action;
        return updatedDeferredActions;
      });

      // If there are more actions to review, open the modal for the next one
      if (deferredActions.length > 1) {
        setModalOpen(true);
      } else {
        setModalOpen(false);
      }

      // Execute the action and resolve the promise
      const { handleActionExecution, resolve } = deferredActions[0];
      await handleActionExecution(action);
      resolve();

      // Remove the action from the deferred actions list
      setDeferredActions(prevDeferredActions => prevDeferredActions.slice(1));
    }
  };




  const restoreAccount = async (inputUniqueId, init = false) => {
    try {
      const response = await fetchUserBalance({
        unique_id: inputUniqueId
      })

      if (response.ok) {
        const data = await response.json();

        if (!init && data.balance == 0) {
          return false;
        }

        setUniqueId(inputUniqueId);
        setBalance(data.balance);
        // Send the unique_id to the backend over the WebSocket connection
        socket.emit("init", { unique_id: inputUniqueId });

        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Error restoring account:', error);
      return false;
    }
  };

  const handleRestoreAccount = async (inputUniqueId) => {
    const success = await restoreAccount(inputUniqueId);

    if (success) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'system', text: 'Account restored successfully.' },
      ]);
      localStorage.setItem('accountId', inputUniqueId);
    } else {
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'system', text: 'Error restoring account. AutoBTC only remembers accounts with a non-zero sats buffer balance.' },
      ]);
    }
  };

  const fetchUniqueIdAndBalance = async () => {
    try {
      const data = await fetchCreateUser();
      if (data) {
        setUniqueId(data.unique_id);
        localStorage.setItem('accountId', data.unique_id);
        setBalance(data.balance);
        socket.emit("init", { unique_id: data.unique_id });
      }
    } catch (error) {
      console.error('Error fetching unique ID and balance:', error);
    }
  };

  useEffect(() => {
    // Attach the handleClickOutside function to the click event
    document.addEventListener('click', handleClickOutside);

    // Return a cleanup function that will be called when the component is unmounted
    return () => {
      // Remove the handleClickOutside function from the click event
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);  // Empty dependency array means this effect runs once on mount and cleanup on unmount

  // Create a resize listener
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  useEffect(() => {
    const { placeholder, style } = getInputPlaceholderAndStyle();
    setPlaceholder(placeholder);
    setStyle(style);
  }, [systemMode, darkMode]);

  useEffect(() => {
    if (!aiThinking) {
      inputRef.current.focus();
    }
  }, [aiThinking]);

  useEffect(() => {
    if (currentConnectionStatus === "disconnected") {
      lockAllNodeActions();
    } else {
      const updatedUnlockedActions = unlockedActions.concat(
        actionsData.actions.filter((action) =>
          action.category === "node" &&
          action.hasOwnProperty("unlocked") &&
          action.unlocked &&
          !unlockedActions.find((unlockedAction) => unlockedAction.name === action.name)
        )
      );
      setUnlockedActions(updatedUnlockedActions);
    }
  }, [currentConnectionStatus]);

  useEffect(() => {
    if (lnConnection) {
      const subscription = lnConnection.connectionStatus$.subscribe((status) => {
        setCurrentConnectionStatus(status);
      });

      return () => {
        subscription.unsubscribe();
      };
    }
  }, [lnConnection]);

  const wrapperFunctions = {
    executeCLNCommandWrapper: executeCLNCommandWrapper,
    changeModeWrapper: changeModeWrapper,
    GeneratedAIQr: GeneratedAIQr
    // Add other wrapper functions here as needed
  };

  async function executeAction(wrapperFunctionName, actionName, args) {
    // Call the appropriate wrapper function with the action name and args
    if (typeof wrapperFunctions[wrapperFunctionName] === "function") {
      console.log(`Running ${wrapperFunctionName} with ${(actionName, args)}`)
      let out = await wrapperFunctions[wrapperFunctionName](actionName, args);
      return out
    } else {
      console.error(`Wrapper function '${wrapperFunctionName}' not found.`)
    }
  }

  function askForUserApproval(actionName, isDangerous, onUserApproval) {
    let warningMessage = isDangerous ? ' This might be a dangerous operation.' : '';
    let message = `The action '${actionName}' requires your approval.${warningMessage} Do you want to proceed?`;

    // You can replace the `confirm` function with a custom modal or alert
    if (confirm(message)) {
      onUserApproval();
    }
  }

  useEffect(() => {
    const handleAnswer = async (message) => {
      console.log('Received answer:', message);
      if (message.sender === 'server') {
        setAiThinking(false);
        setMessages((prevMessages) => {
          console.log('Updating messages with answer:', message); // Add this line
          const newMessages = [...prevMessages];
          newMessages[newMessages.length - 1].text = message.answer;
          newMessages[newMessages.length - 1].sender = message.sender;

          return newMessages;
        });
      } else if (message.sender === 'ai') {
        setBalance(message.balance); // Update the balance
        if (message.chat_mode === "images") {
          setAiThinking(false);
          setMessages((prevMessages) => {
            console.log('images mode', message);
            const newMessages = [...prevMessages];
            newMessages[newMessages.length - 1].text = message.answer;
            newMessages[newMessages.length - 1].sender = message.sender;
            newMessages[newMessages.length - 1].images = message.images;
            newMessages[newMessages.length - 1].tokens_per_sat = message.tokens_per_sat;
            newMessages[newMessages.length - 1].cost = message.cost;
            return newMessages;
          });
        } else if (message.chat_mode === "normal" || message.chat_mode === "faq") {
          setAiThinking(false);
          setMessages((prevMessages) => {
            console.log('normal mode', message);
            const newMessages = [...prevMessages];
            newMessages[newMessages.length - 1].text = message.answer;
            newMessages[newMessages.length - 1].sender = message.sender;
            newMessages[newMessages.length - 1].total_tokens = message.total_tokens;
            newMessages[newMessages.length - 1].tokens_per_sat = message.tokens_per_sat;
            newMessages[newMessages.length - 1].cost = message.cost;
            return newMessages;
          });
        } else if (message.chat_mode === "lightning") {
          let parsedAnswer;
          let actionsToExecute = [];
          let validJson = true;

          try {
            parsedAnswer = JSON.parse(message.answer);
            if (parsedAnswer && Array.isArray(parsedAnswer) && parsedAnswer[0]) {
              actionsToExecute = parsedAnswer[0].actions_to_execute || [];
              actionsToExecute = actionsToExecute.filter(action =>
                unlockedActions.some(unlockedAction => unlockedAction.name === action.name)
              );

            } else {
              validJson = false;
            }
          } catch (error) {
            validJson = false;
          }

          if (!validJson) {
            setAiThinking(false)
            setMessages((prevMessages) => {
              const newMessages = [...prevMessages];
              newMessages[newMessages.length - 1].text = "You got our AI confused 😕 <br/>Please ask again!";
              newMessages[newMessages.length - 1].sender = "system";

              return newMessages;
            });
          } else {

            setMessages((prevMessages) => {
              const newMessages = [...prevMessages];
              newMessages[newMessages.length - 1].text = parsedAnswer[0].answer;
              newMessages[newMessages.length - 1].sender = message.sender;
              newMessages[newMessages.length - 1].actions = actionsToExecute;
              newMessages[newMessages.length - 1].total_tokens = message.total_tokens;
              newMessages[newMessages.length - 1].tokens_per_sat = message.tokens_per_sat;
              newMessages[newMessages.length - 1].cost = message.cost;

              return newMessages;
            });

            let countApprovedActions = 0;
            let followupCounter = message.followup_counter ? message.followup_counter : 0;
            if (actionsToExecute.length > 0 && followupCounter < 2) {
              // Execute the actions

              let followUpQuestion = `Sending your question to AI together with action(s) output for further review. <p>Question asked: ${message.asked_question} <br/>`;
              let nonfollowUpResults = ``;
              let action_output_bolt11;
              const promises = [];

              for (const action of actionsToExecute) {
                const correspondingUnlockedAction = unlockedActions.find(unlockedAction => unlockedAction.name === action.name);

                if (correspondingUnlockedAction) {
                  //const { wrapper_function, requires_user_approval, dangerous, ai_preprocess_function, avoid_followup } = correspondingUnlockedAction.frontend_data;
                  const {
                    wrapper_function,
                    requires_user_approval = false,
                    dangerous = false,
                    ai_preprocess_function,
                    avoid_followup = false,
                    should_review_ai_params = false,
                    format_output_as_json = true
                  } = correspondingUnlockedAction.frontend_data;
                  
                  const promise = new Promise(async (resolve) => {
                    async function handleActionExecution(action, avoid_followup, ai_preprocess_function, format_output_as_json) {
                      let actionOutput;
                      let processedOutput;

                      try {
                        console.log(action.args);  // Log arguments before executing action
                        actionOutput = await executeAction(wrapper_function, action.name, action.args);
                        processedOutput = actionOutput;
                      } catch (error) {
                        // If there's an error, assign the error message to processedOutput
                        processedOutput = error.message;
                      }

                      if (ai_preprocess_function && ActionsPreprocess[ai_preprocess_function] && actionOutput) {
                        console.log("Preprocessing output")
                        processedOutput = ActionsPreprocess[ai_preprocess_function](actionOutput);
                      }

                    function printArgs(args) {
                      if (Array.isArray(args)) {
                        return args.join(',');
                      } else {
                        return Object.entries(args)
                          .filter(([key, value]) => key !== undefined && value !== undefined)
                          .map(([key, value]) => `${key}=${value}`)
                          .join(', ');
                      }
                    }

                    function formatJSON(json) {
                        const formatter = new JSONFormatter(json, open=4);
                        return formatter.render().outerHTML;
                    }
                                     
                    if (processedOutput !== undefined) {
                      let output = format_output_as_json ? (!avoid_followup ? `${JSON.stringify(processedOutput, null, 2)}` : `<div class="json-to-html-output">${formatJSON(processedOutput)}</div>`) : processedOutput;
                      output = `${action.name}(${printArgs(action.args)}) action obtained:<br/>${output}<br/><br/>`;
                      if (!avoid_followup) {
                        followUpQuestion += output 
                        countApprovedActions += 1;
                      } else {
                        nonfollowUpResults += output
                      }
                    }
                    
                    if (processedOutput && typeof processedOutput === 'object' && processedOutput !== null && !action_output_bolt11) {
                      for (let value of Object.values(processedOutput)) {
                        if (typeof value === 'string' && (value.startsWith("lnbc") || value.startsWith("lno"))) {
                          action_output_bolt11 = value;
                          break; // stop searching once we found the value
                        }
                      }
                    }

                      resolve(); // Resolve the promise
                    }

                    if (should_review_ai_params) {
                      // Open the modal and save the current action in the state
                      setCurrentAction({
                        name: action.name,
                        args: correspondingUnlockedAction.args.map((arg, index) => ({
                          ...arg,
                          value: action.args[index] || '',
                          description: correspondingUnlockedAction.args_description[index],
                        })),
                        frontend_data: correspondingUnlockedAction.frontend_data,
                      });
                      setModalOpen(true);
                      // Add the action execution handler and promise resolve function to the deferred actions
                      setDeferredActions(prevDeferredActions => [
                        ...prevDeferredActions,
                        {
                          action,
                          handleActionExecution: (action) => handleActionExecution(action, avoid_followup, ai_preprocess_function, format_output_as_json),
                          resolve
                        }
                      ]);
                    } else if (requires_user_approval) {
                      // Prompt the user for approval via system messages
                      askForUserApproval(action.name, dangerous, async () => {
                        await handleActionExecution(action, avoid_followup, ai_preprocess_function, format_output_as_json);
                      });

                    } else {
                      // Execute the action without user approval
                      await handleActionExecution(action, avoid_followup, ai_preprocess_function, format_output_as_json);
                    }
                  });

                  promises.push(promise);
                }
              }

              await Promise.all(promises);
              if (countApprovedActions > 0) {
                handleAskQuestion(followUpQuestion, followupCounter + 1);
              }

              if (nonfollowUpResults != ``) {
                setMessages((prevMessages) => [
                  ...prevMessages,
                  {
                    sender: 'user',
                    text: nonfollowUpResults,
                    ...(action_output_bolt11 && { bolt11: action_output_bolt11 }),
                  },
                ]);
              }

            }

            setBalance(message.balance); // Update the balance
            setAiThinking(countApprovedActions > 0);

          }
        }
      }
    };

    socket.on("answer", handleAnswer);

    return () => {
      socket.off("answer", handleAnswer);
    };
  }, [unlockedActions, setMessages]);


  const handlePaidInvoice = (message) => {
    if (message.sender === "server" && message.status === "paid") {
      setPendingInvoices((prevPendingInvoices) => {
        const messageIndex = prevPendingInvoices.get(message.invoice_label);

        if (messageIndex !== undefined) {
          setMessages((prevMessages) => {
            const newMessages = [...prevMessages];
            newMessages[messageIndex].text = ``;
            newMessages[messageIndex].qrCode = false;
            newMessages[messageIndex].isPaid = true; // Set isPaid to true
            return newMessages;
          });

          setBalance(message.balance); // Update the balance

          // Remove the invoice label from the pendingInvoices
          const newPendingInvoices = new Map(prevPendingInvoices);
          newPendingInvoices.delete(message.invoice_label);
          return newPendingInvoices;
        } else {
          // Optionally, display the message.text if the invoice label is not found in pendingInvoices
          setMessages((prevMessages) => [
            ...prevMessages,
            message,
          ]);
          return prevPendingInvoices; // Return the previous pendingInvoices without changes
        }
      });
    }
  };

  useEffect(() => {
    socket.on("notify_paid_invoice", handlePaidInvoice);

    return () => {
      socket.off("notify_paid_invoice", handlePaidInvoice);
    };
  }, [socket, setMessages, setBalance, setPendingInvoices]);

  useEffect(() => {
    // Fetch balance limits from the backend
    async function updateBalanceLimits() {
      try {
        const data = await fetchBalanceLimits();
        if (data) {
          setBalanceLimits(data);
        }
      } catch (error) {
        console.error("Error fetching balance limits:", error);
      }
    }
    updateBalanceLimits();
  }, []);

  useEffect(() => {
    const storedAccountId = localStorage.getItem('accountId');
    if (storedAccountId) {
      restoreAccount(storedAccountId, true);
    } else {
      fetchUniqueIdAndBalance();
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleClearLocalStorage = () => {
    localStorage.clear()
    fetchUniqueIdAndBalance()
    setSystemMode("")
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: 'system', text: 'Local storage has been cleared. You can always restore your sats buffer with the secret account ID' },
    ]);
  };

  const handleRestoreAccountMode = () => {
    handleRestoreAccount(userPrompt);
    setUserPrompt('');
    setSystemMode('');
  };

  const handleNostrExportMode = () => {
    const isSuccess = handleNostrExport({
      key: userPrompt,
      setNostrPrivKey: setNostrPrivKey,
      enterNostrExportModePhase2: enterNostrExportModePhase2,
      setMessages: setMessages
    });

    if (!isSuccess) {
      setSystemMode('');
    }
    setUserPrompt('');
  };

  const handleRelayUrlMode = () => {
    handleNostrExportPhase2({
      relayUrl: userPrompt,
      nostrPrivKey: nostrPrivKey,
      setMessages: setMessages,
      messages: messages
    });

    setUserPrompt('');
    setSystemMode('');
  };

  const handleUseStoredNostrDataMode = () => {

    const storedPrivateKey = localStorage.getItem('nostrPrivateKey');
    const storedRelayUrl = localStorage.getItem('nostrRelayUrl');

    if (userPrompt.toLowerCase() === 'yes') {
      setNostrPrivKey(storedPrivateKey);
      handleNostrExportPhase2({
        relayUrl: storedRelayUrl,
        nostrPrivKey: nostrPrivKey,
        setMessages: setMessages,
        messages: messages
      });

      setUserPrompt('');
      setSystemMode('');
    } else if (userPrompt.toLowerCase() === 'no') {
      localStorage.removeItem('nostrPrivateKey');
      localStorage.removeItem('nostrRelayUrl');
      enterNostrExportMode();
      setUserPrompt('');
    } else {
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'system', text: 'Invalid response. Please type "yes" or "no".' },
      ]);
    }
  };


  const checkLocalStorageValues = () => {
    const requiredKeys = [
      "LNNodeipPort",
      "LNNodeID",
      "SessionPrivateKeyHex",
      "SessionPublicKeyHex",
      "LNNoderune",
      "LNNodeImpl",
    ];

    return requiredKeys.every((key) => {
      const value = localStorage.getItem(key);
      return value !== null && value !== "";
    });
  };

  const handleConnectNodeMode = () => {
    switch (userPrompt.toLowerCase()) {
      case "cln":
        localStorage.setItem("LNNodeImpl", userPrompt);
        handleConnectCLNNode({ stage: 1, systemMode, setSystemMode, LNnodeIPPort, setLNnodeIPPort, LNnodeID, setLNnodeID, LNnodeRune, setLNnodeRune, messages, setMessages, userPrompt, lnConnection, setLnConnection })
        //handleConnectCLNNode(1, setSystemMode, setLNnodeIPPort, setLNnodeID, setLNnodeRune, setMessages, userPrompt);
        break;
      case "lnd":
        setSystemMode("");
        setUserPrompt("");
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            sender: "system",
            text:
              "Coming soon ...",
          },
        ]);
        break;
      case "ldk":
        setSystemMode("");
        setUserPrompt("");
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            sender: "system",
            text:
              "Coming soon ...",
          },
        ]);
        break;
      default:
        setSystemMode("");
        setUserPrompt("");
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            sender: "system",
            text:
              "Invalid input. Please enter a valid implementation: CLN, LND, or LDK.",
          },
        ]);
    }
  };


  const isValidAmount = (amount, balanceLimits, balance, sponsor) => {
    const minVal = Math.max(balanceLimits.min_balance - balance, 1);
    return !isNaN(amount) && (sponsor && amount >= 1 || amount >= minVal) && (sponsor || (amount <= balanceLimits.max_balance - balance));
  }


  const handleTopUpMode = (sponsor = false) => {
    const amount = sanitizeSatsInput(userPrompt);
    console.log(amount, balanceLimits, balance, sponsor)
    if (!isValidAmount(amount, balanceLimits, balance, sponsor)) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'system', text: 'Invalid amount. Please enter a valid number in the range.' },
      ]);

    } else {

      handleTopUp({
        uniqueId: uniqueId,
        amount_sats: amount,
        messages: messages,
        sid: socket.id,
        setMessages: setMessages,
        setPendingInvoices: setPendingInvoices,
        sponsor: sponsor,
      });

      // Move to phase 2 - fetch the invoice
      // fetchInvoiceAndDisplay(amount, uniqueId);
      setSystemMode('');
    }

    setUserPrompt('');
  };


  const handleSubmit = () => {
    if (systemMode === 'restoreAccountMode') {
      handleRestoreAccountMode();
      setSystemMode('');
    } else if (systemMode === 'nostrExportMode') {
      handleNostrExportMode();
    } else if (systemMode === 'relayUrlMode') {
      handleRelayUrlMode();
      setSystemMode('');
    } else if (systemMode === 'useStoredNostrData') {
      handleUseStoredNostrDataMode();
      setSystemMode('');
    } else if (systemMode === 'topUpMode') {
      handleTopUpMode();
      setSystemMode('');
    } else if (systemMode === 'sponsorMode') {
      handleTopUpMode(true);
      setSystemMode('');
    } else if (systemMode === 'connectNodeMode') {
      handleConnectNodeMode();
    } else if (systemMode === 'connectCLNModeIP') {
      handleConnectCLNNode({ stage: 2, systemMode, setSystemMode, LNnodeIPPort, setLNnodeIPPort, LNnodeID, setLNnodeID, LNnodeRune, setLNnodeRune, messages, setMessages, userPrompt, lnConnection, setLnConnection })
    } else if (systemMode === 'connectCLNModeRune') {
      handleConnectCLNNode({ stage: 3, systemMode, setSystemMode, LNnodeIPPort, setLNnodeIPPort, LNnodeID, setLNnodeID, LNnodeRune, setLNnodeRune, messages, setMessages, userPrompt, lnConnection, setLnConnection })
      setSystemMode('');
    } else {
      handleAskQuestion();
      setSystemMode('');
    }

    // Reset the input field and system mode (if needed)
    setUserPrompt('');

  };

  const handleAskQuestion = (overridePrompt, followupCounter = 0) => {
    const prompt = overridePrompt || userPrompt;

    if (prompt.trim() === '') {
      return; // Don't do anything if the message is empty.
    }

    const sanitizedUnlockedActions = unlockedActions.map(action => {
      const { frontend_data, ...rest } = action;
      return rest;
    });

    let history = messages.filter(msg => ['user', 'ai'].includes(msg.sender));

    const questionData = {
      type: 'question',
      question: prompt,
      unique_id: uniqueId,
      chat_mode: chatMode,
      followup_counter: followupCounter,
      unlocked_actions: sanitizedUnlockedActions,
      history: history
    };

    console.log('Emitting question:', questionData);
    socket.emit("question", questionData);

    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: 'user', text: prompt },
      { sender: 'ai', text: '' },
    ]);

    setUserPrompt('');
    setAiThinking(true);
  };


  const getInputPlaceholderAndStyle = () => {
    let placeholder = "Type your question...";
    let style = {};

    const systemModes = [
      'restoreAccountMode',
      'nostrExportMode',
      'relayUrlMode',
      'useStoredNostrData',
      'topUpMode',
      'sponsorMode',
      'connectNodeMode',
      'connectCLNModeIP',
      'connectCLNModeID',
      'connectCLNModeRune',
    ];

    if (systemModes.includes(systemMode)) {
      placeholder = {
        restoreAccountMode: "Enter your unique ID...",
        nostrExportMode: "nsec...",
        relayUrlMode: "wss://...",
        useStoredNostrData: "yes/no",
        sponsorMode: "1-∞ sats",
        topUpMode: `${Math.max(balanceLimits.min_balance - balance, 1)}-${balanceLimits.max_balance - balance} sats`,
        connectNodeMode: "CLN/LND/LDK",
        connectCLNModeIP: "034d72cdecda17e7a3fb085345d8b6391429fcd4066ddded183a84d765208f1973@198.46.215.52:37710",
        connectCLNModeID: "021c97a90a411ff2b10dc2a8e32de2f29d2fa49d41bfbb52bd416e460db0747d0d",
        connectCLNModeRune: "NbL7KkXcPQsVseJ9TdJNjJK2KsPjnt_q4cE_wvc873I9MCZtZXRob2RebGlzdHxtZXRob2ReZ2V0fG1ldGhvZD1zdW1tYXJ5Jm1ldGhvZC9saXN0ZGF0YXN0b3Jl",
      }[systemMode];
    }

    style.backgroundColor = darkMode ? '#5c5c5c' : '#f0f0f0';
    style.color = darkMode ? '#ffffff' : '#000000';

    setPlaceholder(placeholder);
    setStyle(style);
    return { placeholder, style };
  };


  const renderSystemMessageContent = (message, index) => {
    if (message.type === "invoice") {
      return (
        <div className={`qr-container${message.isPaid ? " paid" : ""}`} onClick={() => copyToClipboard(message.bolt11)}>
          <QRCode className="qr-code" value={message.bolt11} size={200} />
          {message.isPaid ? (
            <div className="stamp" style={{ opacity: message.stampOpacity }}>
              PAID
            </div>
          ) :
            <div className="copy-icon-container">
              <FontAwesomeIcon className="copy-icon" icon={faPaste} />
            </div>
          }
        </div>
      );
    } else {
      return <></>;
    }
  };


  const calculateColor = (balance, min, max) => {
    if (balance < min) {
      return "rgb(255, 0, 0)"; // red
    }

    const ratio = (balance - min) / (max - min);
    const red = Math.round(255 * (1 - ratio));
    const green = 255;
    return `rgb(${red}, ${green}, 0)`;
  };

  const connectionStatusClass = `connection-status-${currentConnectionStatus}`;

  const renderActions = (actions) => {
    return (
      <div className="actions-container">
        <div className="actions-header">
          <h5>The fine-tuned AI model recommends executing these actions:</h5>
          <p><small>
            Executing these actions can enhance the model response or perform your requested operations.
          </small></p> </div>
        <div className="actions-grid">
          {actions.map((action, index) => (
            <div key={index} className="action-item">
              <div className="function-name">{action.name}</div>
              {action.args && action.args.length > 0 && (
                <ul className="args-list">
                  {action.args.map((arg, argIndex) => (
                    <li key={argIndex}>
                      {arg.length > 50 ? arg.slice(0, 50) + "..." : arg}
                    </li>
                  ))}
                </ul>
              )}

            </div>
          ))}
        </div>
      </div>
    );
  };

  function toggleDarkMode() {
    setDarkMode(!darkMode);
  }

  function handleClickOutside(event) {
    if (isMobile && isSidebarOpen && !event.target.closest('.sidebar')) {
      setIsSidebarOpen(false);
    }
  }

  function handleButtonClick(fn) {
    fn();
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  }


  return (
    <div className="app-container">
      <div className={`sidebar ${isSidebarOpen ? "" : "collapsed"}`}>
        <div
          className={`dark-mode-icon ${darkMode ? "fas fa-sun" : "fas fa-moon"}`}
          onClick={toggleDarkMode}
          style={{ cursor: "pointer" }}
        ></div>
        <h1 class="logo">
          Auto<b>BTC</b>
          <span class="beta">beta</span>
        </h1>

        <div className="token-info">
          <p>
            <span className="token-info-title">Secret Account ID:</span> <span onClick={handleToggleIdVisibility} className="masked-id">{uniqueIdVisible ? uniqueId : '••••••••'}</span>
          </p>
          <span className="status-title">Sats buffer balance:</span>
          <div className="progress-bar-container">
            <div
              className="progress-bar"
              style={{
                width: `${(balance / balanceLimits.max_balance) * 100}%`,
                backgroundColor: calculateColor(
                  balance,
                  balanceLimits.min_balance,
                  balanceLimits.max_balance
                ),
              }}
            >
              <div
                className="min-boundary"
                style={{
                  left: `${(balanceLimits.min_balance / balanceLimits.max_balance) * 100}%`,
                }}
              ></div>
            </div>

          </div>

          <div className="progress-bar-labels">
            <div className="label-container">
              <span className="min-label">Min: <i className="fak fa-thin" />{balanceLimits['min_balance']} </span>
            </div>
            <div className="label-container">
              <span className="balance-label" style={{ left: `${(balance / balanceLimits.max_balance) * 100}%` }}>Balance: <i className="fak fa-thin" />{balance}</span>
            </div>
            <div className="label-container">
              <span className="max-label">Max: <i className="fak fa-thin" />{balanceLimits.max_balance} </span>
            </div>
          </div>


        </div>
        <div className="button-container">
          <div className="main-buttons">
            <div className="sidebar-button top-up" onClick={() => handleButtonClick(enterTopUpMode)}>
              <FontAwesomeIcon icon={faBolt} />
              <span className="icon-space"></span>
              Top-up
            </div>


            <div className="sidebar-button export" onClick={handleExportToggle}>
              <FontAwesomeIcon icon={faFileExport} />
              <span className="icon-space"></span>
              Export
            </div>
            {exportOptionsVisible && (
              <div className="export-options">
                <div className="sidebar-button export-html" onClick={() => handleButtonClick(handleExportHTML)}>
                  <FontAwesomeIcon icon={faFileAlt} />
                  <span className="icon-space"></span>
                  json
                </div>
                <div className="sidebar-button export-nostr" onClick={() => handleButtonClick(enterNostrExportMode)}>
                  <CustomOstrichIcon className="sidebar-icon custom-ostrich-icon-export" />
                  <span className="icon-space"></span>
                  Nostr
                </div>
              </div>
            )}


            <div className="sidebar-button connect-ln" onClick={() => handleButtonClick(enterConnectNodeMode)}>
              <FontAwesomeIcon icon={faCircleNodes} />
              <span className="icon-space"></span>
              Connect LN Node
              <div className="tooltip">
                <span className={`connection-status-indicator ${connectionStatusClass}`}></span>
                <span className="tooltip-text">{currentConnectionStatus}</span>
              </div>
            </div>
            <div className="sidebar-button restore-uid" onClick={() => handleButtonClick(enterRestoreAccountMode)}>
              <FontAwesomeIcon icon={faFingerprint} />
              <span className="icon-space"></span>
              Restore Account
            </div>
            <div className="sidebar-button clear-local-storage" onClick={() => handleButtonClick(handleClearLocalStorage)}>
              <FontAwesomeIcon icon={faTrash} />
              <span className="icon-space"></span>
              Clear Local Storage
            </div>
          </div>
          <div className="separator"></div>

          <div className="bottom-icons">
            <div className="icon-wrapper" onClick={() => {
              handleSetChatMode("faq");
              if (isMobile) {
                setIsSidebarOpen(false);
              }
            }}>
              <FontAwesomeIcon className="sidebar-icon" icon={faQuestionCircle} />
              <span className="icon-text">Q&A</span>
            </div>
            <div className="icon-wrapper" onClick={() => window.open("https://github.com/yourusername/yourrepository", "_blank")}>
              <FontAwesomeIcon className="sidebar-icon" icon={faGithub} />
              <span className="icon-text">GitHub</span>
            </div>
            <div className="icon-wrapper" onClick={() => window.open("https://twitter.com/autobtcai", "_blank")}>
              <FontAwesomeIcon className="sidebar-icon" icon={faTwitter} />
              <span className="icon-text">Twitter</span>
            </div>
            <div className="icon-wrapper" onClick={() => window.open("https://snort.social/p/npub1lzmk2evgs4hryjg5hnv3h6cj7fl3qa6nqnxazs9udap3krgr9rpq2w2q9x", "_blank")}>
              <CustomOstrichIcon className="sidebar-icon custom-ostrich-icon" />
              <span className="icon-text">Nostr</span>
            </div>

            <div className="icon-wrapper" onClick={() => window.open("https://t.me/autobtcai", "_blank")}>
              <FontAwesomeIcon className="sidebar-icon" icon={faTelegram} />
              <span className="icon-text">Telegram</span>
            </div>

            <div className="icon-wrapper">

              <FontAwesomeIcon className="sidebar-icon" icon={faCoffee} onClick={() => handleButtonClick(enterSponsorMode)} />
              <span className="icon-text">Sponsor</span>
            </div>
          </div>

        </div>
      </div>

      <div className={`chat-container ${darkMode ? "dark-mode" : ""} ${isSidebarOpen ? "" : "expanded"}`}>

        {/* Button to toggle sidebar */}
        <button className={`toggle-sidebar-button ${isSidebarOpen ? "" : "collapsed"}`} onClick={(event) => {
          event.stopPropagation();
          setIsSidebarOpen(!isSidebarOpen)
        }}>
          {isSidebarOpen ? <FaTimes /> : <FaBars />}
        </button>
        <div className="chat-type-container">
          <div className="chat-type-selector" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            {chatMode}
            <div className="extended-hover-area">
              <div className="chat-type-options" style={{ display: isDropdownOpen ? "block" : "none" }}>
                <div
                  className="chat-type-option"
                  onClick={() => {
                    handleSetChatMode("normal");
                    setIsDropdownOpen(false); // close the dropdown
                  }}
                >
                  Normal Chat
                </div>

                <div
                  className="chat-type-option"
                  onClick={() => {
                    handleSetChatMode("images");
                    setIsDropdownOpen(false); // close the dropdown
                  }}
                >
                  Images Creator
                </div>
                <div
                  className="chat-type-option"
                  onClick={() => {
                    handleSetChatMode("lightning");
                    setIsDropdownOpen(false); // close the dropdown
                  }}
                >
                  ⚡Lightning Assistant⚡
                </div>
              </div>
            </div>
          </div>
          <div className="pricing-display">
            {chatMode === "images" ? (
              <React.Fragment>
                {Math.ceil(pricingData.price_per_image_sats)}{" "}
                <i className="fak fa-thin"></i>
                /image
              </React.Fragment>
            ) : (
              <React.Fragment>
                {Math.floor(pricingData.tokens_per_sat)} tokens/{" "}
                <i className="fak fa-thin"></i>
              </React.Fragment>
            )}
          </div>
        </div>


        <div className="chat-messages">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message ${message.sender}-message`}
              style={
                message.sender === "ai" && darkMode
                  ? { backgroundColor: "#5c5c5c", color: "#ffffff" }
                  : {}
              }
            >
              {message.sender === 'user' && <img className="avatar" src={userAvatar} alt="User" />}
              {message.sender === 'ai' && <img className="avatar" src={aiAvatar} alt="AI" />}
              {message.sender === 'system' && <img className="avatar" src={systemAvatar} alt="System" />}
              {message.sender === 'server' && <img className="avatar" src={serverAvatar} alt="Server" />}
              {message.sender === 'system' && renderSystemMessageContent(message)}
              {message.sender === 'system' ? (
                <span
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(message.text),
                  }}
                />

              ) : (
                <span
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(message.text),
                  }}
                />
              )}

              {message.sender === 'user' && message.bolt11 && (
                <div className="qr-container" onClick={() => copyToClipboard(message.bolt11)}>
                  <QRCode className="qr-code" value={message.bolt11} size={200} />
                  <div className="copy-icon-container">
                    <FontAwesomeIcon className="copy-icon" icon={faPaste} />
                  </div>
                </div>
              )}

              {message.sender === 'ai' && message.images && (
                <div className="images-container">
                  {message.images.map((url) => (
                    <img src={url} alt="Generated image" />
                  ))}
                </div>
              )}
              {message.sender === 'ai' && message.actions && message.actions.length > 0 && renderActions(message.actions)}
              {message.sender === 'ai' && message.cost && (
                <div className="token-cost">
                  {message.total_tokens ? `${message.total_tokens} tokens | ` : ''}
                  <i className="fak fa-thin"></i>{message.cost}
                </div>
              )}
              {aiThinking && message.sender === 'ai' && index === messages.length - 1 && (
                <div className="thinking-animation-container">
                  <div className="thinking-dots">
                    <div className="thinking-dot thinking-dot-1"></div>
                    <div className="thinking-dot thinking-dot-2"></div>
                    <div className="thinking-dot thinking-dot-3"></div>
                  </div>
                </div>

              )}

            </div>
          ))}

          <div ref={messagesEndRef} />
        </div>
        <div
          className={`chat-input ${systemMode !== '' ? 'system-chat-input' : ''}`}
          style={
            systemMode === '' && darkMode
              ? { backgroundColor: '#5c5c5c', color: '#ffffff' }
              : {}
          }
        >

          <input
            ref={inputRef}
            type="text"
            placeholder={placeholder}
            value={userPrompt}
            onChange={(e) => setUserPrompt(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') handleSubmit();
            }}
            style={{ ...style, fontSize: '16px' }}
            disabled={aiThinking}
          />
          <button onClick={handleSubmit}>Send</button>
        </div>
      </div>

      <ParamsReviewModal
        isOpen={modalOpen}
        action={currentAction}
        onConfirm={handleModalApproval}
        onClose={handleModalClose}
        darkMode={darkMode}
      />
    </div>
  );

}

export default AutoBTC;