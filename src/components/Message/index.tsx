import React, { createContext, useContext, ReactNode, useState, useCallback } from 'react';
import MessageComponent from './Message';
import { MessageType, MessageInstance } from './types';

interface MessageContextType {
  message: MessageInstance | null;
}

const MessageContext = createContext<MessageContextType>({ message: null });

interface MessageProviderProps {
  children: ReactNode;
}

export const MessageProvider: React.FC<MessageProviderProps> = ({ children }) => {
  const [messages, setMessages] = useState<Array<{ id: number; type: MessageType; content: ReactNode; duration?: number }>>([]);
  const [counter, setCounter] = useState(0);

  const addMessage = useCallback((type: MessageType, content: ReactNode, duration = 3000) => {
    const id = counter;
    setCounter((prev) => prev + 1);

    setMessages((prev) => [...prev, { id, type, content, duration }]);

    const timer = setTimeout(() => {
      removeMessage(id);
    }, duration);

    const removeMessage = (messageId: number) => {
      setMessages((prev) => prev.filter((msg) => msg.id !== messageId));
    };

    return {
      close: () => {
        clearTimeout(timer);
        removeMessage(id);
      }
    };
  }, [counter]);

  const message: MessageInstance = {
    success: (content, duration) => addMessage('success', content, duration),
    warning: (content, duration) => addMessage('warning', content, duration),
    error: (content, duration) => addMessage('error', content, duration),
    close: () => setMessages([])
  };

  return (
    <MessageContext.Provider value={{ message }}>
      {children}
      {messages.map((msg) => (
        <MessageComponent
          key={msg.id}
          type={msg.type}
          content={msg.content}
          duration={msg.duration}
          onClose={() => setMessages((prev) => prev.filter((m) => m.id !== msg.id))}
        />
      ))}
    </MessageContext.Provider>
  );
};

export const useMessage = (): MessageInstance => {
  const context = useContext(MessageContext);
  if (!context?.message) {
    throw new Error('useMessage must be used within a MessageProvider');
  }
  return context.message;
};

export default MessageComponent;
