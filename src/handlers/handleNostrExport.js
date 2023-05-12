import {
    validateEvent,
    verifySignature,
    signEvent,
    getEventHash,
    getPublicKey,
    relayInit,
    nip19
  } from 'nostr-tools'


export const handleNostrExport = ({key, setNostrPrivKey, setMessages, enterNostrExportModePhase2}) => {
  let isValidKey = false;
  let decoded_key = '';

  console.log(key)
  console.log("HHHASDA")
  try {
    decoded_key = nip19.decode(key);
    isValidKey = true;
  } catch (error) {
    console.error('Error decoding key:', error);
  }

  if (isValidKey) {
    setNostrPrivKey(key);
    localStorage.setItem('nostrPrivateKey', key);
    enterNostrExportModePhase2()
  } else {
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: 'system', text: 'Invalid key. Please try again with a valid Nostr private key.' },
    ]);
  }

  return isValidKey;
};

export const handleNostrExportPhase2 = async ({relayUrl, nostrPrivKey, setMessages, messages}) => {
  try {
    // Add "wss://" prefix if "ws://" or "wss://" is not present
    if (!relayUrl.startsWith('ws://') && !relayUrl.startsWith('wss://')) {
      relayUrl = 'wss://' + relayUrl;
    }

    // Create a relay instance with the given relay URL
    const relay = relayInit(relayUrl);
    const decoded_key = nip19.decode(nostrPrivKey);

    relay.on('connect', () => {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          sender: 'system',
          text: `Connected to ${relay.url}`,
        },
      ]);
      localStorage.setItem('nostrRelayUrl', relayUrl);
    });
    relay.on('error', (err) => {
      throw new Error(`Failed to connect to ${relay.url}`);
    });

    // Connect to the relay
    await relay.connect();

    // Create an event object with the messages
    const event = {
      kind: 1,
      created_at: Math.floor(Date.now() / 1000),
      tags: [],
      content: JSON.stringify(messages),
      pubkey: getPublicKey(decoded_key.data),
    };

    // Set the event ID and signature
    event.id = getEventHash(event);
    event.sig = signEvent(event, decoded_key.data);

    // Validate the event and its signature
    const isValidEvent = validateEvent(event);
    const isSignatureValid = verifySignature(event);

    if (!isValidEvent || !isSignatureValid) {
      throw new Error('Unable to validate event or signature');
    }

    // Publish the event to the relay
    const publishEvent = new Promise((resolve, reject) => {
      let pub = relay.publish(event);
      pub.on('ok', () => {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            sender: 'system',
            text: `Event has been published to ${relayUrl}`,
          },
        ]);
        resolve();
      });
      pub.on('failed', (reason) => {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            sender: 'system',
            text: `Failed to publish event to ${relayUrl}: ${reason}`,
          },
        ]);
        reject(new Error(`Failed to publish event to ${relayUrl}: ${reason}`));
      });
    });

    await publishEvent;
    // Close the relay connection
          // Close the relay connection
          relay.close();

          setMessages((prevMessages) => [
            ...prevMessages,
            {
              sender: 'system',
              text: `Closed connection to ${relayUrl}`,
            },
          ]);
        } catch (error) {
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              sender: 'system',
              text: `Error: ${error.message}. Please try again later.`,
            },
          ]);
        }
};
