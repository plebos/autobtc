const generateFAQ = (faqArray) => {
  let faqHtml = '<div style="width: 100%; margin: auto;">';

  faqArray.forEach(faq => {
    faqHtml += `
      <details style="margin-bottom: 1em; border: 1px solid #aaa; border-radius: 4px; padding: .5em;">
        <summary style="font-weight: bold; margin: -.5em -.5em 0; padding: .5em;">${faq.question}</summary>
        <p style="padding: .5em; margin: 0;">${faq.answer}</p>
      </details>
    `;
  });

  faqHtml += `
    <div style="margin-top: 2em; text-align: center;">
      <p style="font-size: 1.2em; line-height: 1.5;">As we conclude our FAQ, remember - there's no need to comb through countless Q&A pages. With <b>AutoBTC</b>, simply top up your sats buffer and ask precisely what you're curious about. Our AI is expertly trained to provide insightful answers. And on the off-chance it can't answer something, it will guide you to reach out to us directly. Your questions are important, and we're here to ensure you get the information you need, with the ease you deserve.</p>
    </div>
  `;
  faqHtml += '</div>';

  return faqHtml;
};

const FAQ_ARRAY = [
  {
    question: 'What is AutoBTC?',
    answer: `AutoBTC is a state-of-the-art platform that harmonizes the cutting-edge capabilities of AI and Language Models with the power of Bitcoin and the Lightning Network. Our platform facilitates the use of advanced LLMs, fine-tuned or custom-designed for optimal performance, in exchange for Lightning payments. This allows us to automate complex tasks and let users focus on their business. AutoBTC embodies a commitment to self-custody and privacy, offering a cost-effective solution that handles the complexities behind the scenes, all thanks to our powerful, precision-engineered AI models.`
  },
  {
    question: 'How does the payment method work?',
    answer: `Users maintain a 'sats buffer', which they can top up with sats. This buffer is utilized for payment, ensuring a seamless conversation experience.`
  },
  {
    question: 'How do I restore my account?',
    answer: 'Users are assigned a unique account ID, stored in the browser storage, which can be used to restore the account at any time. This storage can always be cleared for privacy.'
  },
  {
    question: 'Can I top up more sats than the maximum limit?',
    answer: 'Currently, you cannot top up more than the maximum limit. However, we plan to integrate WebLN and auto-recharge features for a more convenient user experience in the future.'
  },
  {
    question: 'How do I connect my browser to my Lightning node?',
    answer: 'You can link your browser to your CLN node (and soon LND node) by following our guidelines to create a rune. This rune grants your browser permissions to connect and perform operations.'
  },
  {
    question: `Why do I need to connect via AutoBTC's proxy?`,
    answer: `Connecting via AutoBTC's proxy doesn't require opening any additional port. The browser acts like a Lightning node and communicates over the Lightning Network protocol using encrypted messages. The proxy can't read the messages but facilitates communication. This method prevents the need for additional certificate work on your node.`
  },
  {
    question: `What data is stored by AutoBTC's server?`,
    answer: `AutoBTC's server maintains a mapping between unique account IDs and their sats buffer balances. We do not store any messages, images, Lightning node data, or IP addresses.`
  },
  {
    question: 'How does AutoBTC protect my privacy and security?',
    answer: `AutoBTC, backed by deep cybersecurity expertise, prioritizes user privacy and security. We do not store personal data. Private node data, including private channels, is masked with dummy data before it leaves your browser. In the future, we'll implement an 'unmasking' technique that will allow your browser to reconstruct the information locally. If we are ever legally compelled to log or share private information, we will suspend the service until a privacy-preserving solution is found.`
  },
  {
    question: 'What modes does AutoBTC offer?',
    answer: 'AutoBTC currently provides three modes: normal chat, image-based, and Lightning-related interactions. In the Lightning mode, the output of actions is masked for privacy, and in the future, you will be able to unmask this information locally in your browser.'
  },
  {
    question: 'What future features are planned for AutoBTC?',
    answer: 'We plan to integrate more robust plugins, offer cold storage integration for increased security, and extend support for a wider range of Lightning and Bitcoin operations. This includes the ability to set up and personalize a self-hosted Lightning node upon user request.'
  },
  {
    question: 'How can I contribute or sponsor AutoBTC?',
    answer: 'We offer various sponsorship packages that can be tailored to your needs. Please contact us for more information.'
  },
  {
    question: 'How can I communicate with AutoBTC?',
    answer: `We're available on Telegram, Twitter, and Nostr.`
  },

  // More questions...
];

export const FAQ = generateFAQ(FAQ_ARRAY);
