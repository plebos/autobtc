import actionsData from '../actions/actions.json';

const { ec } = require('elliptic');
const secp256k1 = new ec('secp256k1');

export function generateKeyPair() {
  const keyPair = secp256k1.genKeyPair();
  const privateKey = keyPair.getPrivate('hex');
  const publicKey = keyPair.getPublic().encode('hex', true);
  return { privateKey, publicKey };
}

export function getInitialUnlockedActions() {
  return actionsData.actions.filter((action) => action.unlocked && action.category !== "node");
}

export const parseNodeIdIpPort = (input) => {
  const regex = /^([^@]+)@((?:[0-9]{1,3}\.){3}[0-9]{1,3})(?::([0-9]{1,5}))?$/;

  const match = input.match(regex);
  if (match) {
    const nodeId = match[1];
    const ip = match[2];
    const port = match[3] || "9735";

    // Validate IP and port ranges
    const ipParts = ip.split('.').map(part => parseInt(part));
    const isValidIP = ipParts.every(part => part >= 0 && part <= 255);
    const isValidPort = parseInt(port) >= 1 && parseInt(port) <= 65535;

    if (isValidIP && isValidPort) {
      return { nodeId, ip, port };
    }
  }
  return null;
};

export const splitIpPort = (ipPort) => {
  const [ip, port] = ipPort.split(':');
  return { ip, port: port || '9735' };
};

export const sanitizeSatsInput = (userPrompt) => {
  const satsRegex = /(\d+)(?:\s*(sats|sat))?$/i;
  // Remove any spaces in the input
  const sanitizedInput = userPrompt.replace(/\s+/g, '');
  const match = sanitizedInput.match(satsRegex);
  return match ? parseInt(match[1], 10) : 0;
}
