import { useState, useRef, useEffect, Dispatch, SetStateAction } from 'react';
import { sendMessage, Message } from '../lib/dify';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// 扩展 Message 类型以包含 'thinking' 角色
type AppMessage = Message | { role: 'thinking'; content: string };

// 定义 ResumeForm 组件的 props 类型
interface ResumeFormProps {
  onGenerate: Dispatch<SetStateAction<string>>;
}

export default function ResumeForm({ onGenerate }: ResumeFormProps) {
  const [messages, setMessages] = useState<AppMessage[]>([
    {
      role: 'assistant',
      content: '你好！我是你的简历助手。请告诉我你的姓名。'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesRef = useRef(messages); // 创建一个 ref 来跟踪最新的 messages

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
    messagesRef.current = messages; // 保持 ref 与 state 同步
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    setIsLoading(true);
    const userMessage = { role: 'user' as const, content: inputValue };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    try {
      await sendMessage(
        inputValue,
        {
          onThinking: (text) => {
            setMessages(prev => {
              const lastMessage = prev[prev.length - 1];
              if (lastMessage && lastMessage.role === 'thinking') {
                return [...prev.slice(0, -1), { role: 'thinking', content: text }];
              }
              return [...prev, { role: 'thinking', content: text }];
            });
          },
          onMessage: (text) => {
            setMessages(prev => {
              const lastMessage = prev[prev.length - 1];
              if (lastMessage && lastMessage.role === 'assistant') {
                return [...prev.slice(0, -1), { ...lastMessage, content: lastMessage.content + text }];
              }
              return [...prev, { role: 'assistant', content: text }];
            });
          },
          onFinish: () => {
            setIsLoading(false);
            // const finalMessages = messagesRef.current; // 使用 ref 获取最新的 messages
            // const lastAssistantMessage = finalMessages
            //   .filter(m => m.role === 'assistant')
            //   .pop();
            // if (lastAssistantMessage && lastAssistantMessage.content) {
            //   onGenerate(lastAssistantMessage.content); // 调用 onGenerate - 我们将注释掉这一行
            // }
          },
          onError: (error) => {
            console.error('发送消息失败:', error);
            setMessages(prev => [
              ...prev,
              { role: 'assistant', content: '抱歉，发生了错误，请重试。' }
            ]);
            setIsLoading(false);
          }
        }
      );
    } catch (error) {
      console.error('发送消息失败:', error);
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: '抱歉，发生了错误，请重试。' }
      ]);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-15rem)] w-1/2 border rounded-lg shadow-lg my-4">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => {
          if (message.role === 'thinking') {
            return (
              <div key={index} className="flex justify-start">
                <div className="rounded-lg px-4 py-2 max-w-[80%] bg-yellow-50 text-gray-700 border border-yellow-200">
                  <div className="flex items-start">
                    <span className="mr-2 mt-1">🤔</span>
                    <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                  </div>
                </div>
              </div>
            );
          }
          return (
            <div
              key={index}
              className={`flex ${message.role === 'assistant' ? 'justify-start' : 'justify-end'} mb-2`}
            >
              <div
                className={`rounded-lg px-4 py-2 max-w-[80%] ${message.role === 'assistant' ? 'bg-gray-100 dark:bg-gray-700 prose dark:prose-invert max-w-none' : 'bg-blue-600 text-white prose prose-invert max-w-none'}`}
              >
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.content}</ReactMarkdown>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="请输入..."
            disabled={isLoading}
            required
          />
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {isLoading ? '发送中...' : '发送'}
          </button>
        </div>
      </form>
    </div>
  );
}