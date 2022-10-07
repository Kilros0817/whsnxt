// useChatClient.js

import { useEffect, useState } from 'react';
import { StreamChat } from 'stream-chat';
import { chatApiKey } from './chatConfig';

const chatClient = StreamChat.getInstance(chatApiKey);

export const useChatClient = () => {
  const [clientIsReady, setClientIsReady] = useState(false);

  return {
    clientIsReady,
  }
}
