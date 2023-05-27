export const clnNodeMessages = {
    stageOne: `
      <p>ChatLN establishes a connection with your CLN node using the <strong>Commando plugin</strong>.</p>
      <small>
      <p>Commando is a native Core Lightning plugin that enables direct-to-node communication. It provides fine-grained access control to a CLN node's RPC and facilitates RPC access through Lightning-native network connections.</p>
      <p>ChatLN employs a proxy to eliminate the need for experimental WebSocket support on your node, as well as to avoid opening additional ports or configuring SSL. The proxy initiates a WebSocket connection, which in turn creates a standard TCP socket connection to the node. All messages are encrypted using the Noise protocol, ensuring that the server only processes encrypted binary traffic between the browser and the node. <em>At present, ChatLN only supports clearnet connections.</em></p>
      </small>
      <p>Please enter your node connection details below.</p>
      <p><strong>Note:</strong> While ChatLN's proxy will use provided IP addresses and ports, they will not be logged.</p>
      <p><a href="https://X" target="_blank" rel="noopener noreferrer"><i class="fas fa-question-circle" style="font-size: 20px; vertical-align: middle;"></i></a></p>
             `,
    stageTwo: `
        <p>To establish read-only access enforced by your node, we will create a rune that only grants access to your browser.</p>
        <p>Please execute the following command on your node:</p>
        <pre>lightning-cli commando-rune restrictions='[["id=PUBLIC_KEY_PLACEHOLDER"], ["method^list","method^get","method=summary", "method=invoice", "method=waitanyinvoice","method=waitinvoice"],["method/listdatastore"], ["rate=60"]]' | jq -r '.rune'</pre>
        <p>Executing this command will generate an output that includes the rune string you need.
        <br/>Please provide only the <strong>rune</strong> string to proceed.</p>
        <p>Example output:<br/>
        <pre>NbL7KkXcPQsVseJ9TdJNjJK2KsPjnt_q4cE_wvc873I9MCZtZXRob2RebGlzdHxtZXRob2ReZ2V0fG1ldGhvZD1zdW1tYXJ5Jm1ldGhvZC9saXN0ZGF0YXN0b3Jl</pre>
        </p>`,
    invalidInput: `Invalid input`,
    establishingConnection: `Establishing connection to your node ...`,
    invalidRune: `Invalid rune`
  };
  