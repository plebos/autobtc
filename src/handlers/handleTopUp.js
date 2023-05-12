import { requestInvoice } from './backendCommHandler';
import { topUpMessages } from './messages/topUpMessages';

export const handleTopUp = async ({uniqueId, amount_sats, messages,sid, setMessages, setPendingInvoices, sponsor=false}) => {
  // Add a system message to inform the user about the invoice request
  const messageIndex = messages.length;
  const messageType = sponsor ? "sponsorship" : "top-up";
  setMessages((prevMessages) => [
    ...prevMessages,
    {
      sender: 'system',
      text: topUpMessages.requestingInvoice(amount_sats, messageType),
    },
  ]);

  // Request the invoice
  console.log('Requesting invoice with amount_sats:', amount_sats);
  const invoiceResponse = await requestInvoice(uniqueId, sid, amount_sats, sponsor);
  console.log(invoiceResponse);

  if (invoiceResponse.error) {
    // Handle errors and inform the user accordingly
    console.error('Error requesting invoice:', invoiceResponse.message);
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        sender: 'system',
        text: invoiceResponse.message,
      },
    ]);
  } else {
    // Add a system message to inform the user about the received invoice
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        sender: 'system',
        type: 'invoice',
        qrCode: true,
        bolt11: invoiceResponse.bolt11,
        text: sponsor? topUpMessages.invoiceAttachedMessageSponsorship: topUpMessages.invoiceAttachedMessage,
      },
    ]);

    // Store the invoice's label in pendingInvoices
    setPendingInvoices((prevPendingInvoices) => {
      const newPendingInvoices = new Map(prevPendingInvoices);
      newPendingInvoices.set(invoiceResponse.label, messageIndex+1);
      return newPendingInvoices;
    });
  }
};
