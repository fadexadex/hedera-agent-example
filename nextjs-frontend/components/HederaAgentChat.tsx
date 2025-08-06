'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Settings, Trash2, ExternalLink, Copy, CheckCircle, XCircle } from 'lucide-react';
import { chatWithAgent, clearSession, type ChatRequest } from '@/lib/api';
import { generateSessionId, parseHederaResponse } from '@/lib/utils';

interface Message {
  id: string;
  type: 'user' | 'agent';
  content: string;
  timestamp: Date;
  hashScanLink?: string;
  tokenId?: string;
  transactionId?: string;
}

export default function HederaAgentChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(() => generateSessionId());
  const [showSettings, setShowSettings] = useState(false);
  const [credentials, setCredentials] = useState({
    accountId: '',
    privateKey: ''
  });
  const [credentialsSet, setCredentialsSet] = useState(false);
  const [copySuccess, setCopySuccess] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleCredentialsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (credentials.accountId && credentials.privateKey) {
      setCredentialsSet(true);
      setShowSettings(false);
      // Add welcome message
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        type: 'agent',
        content: `Welcome! Connected to Hedera account ${credentials.accountId}. I'm ready to help you with blockchain operations. You can ask me to create tokens, transfer HBAR, manage topics, or query account information.`,
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !credentialsSet || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: message,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    setIsLoading(true);

    try {
      const request: ChatRequest = {
        sessionId,
        accountId: credentials.accountId,
        privateKey: credentials.privateKey,
        message
      };

      const response = await chatWithAgent(request);
      const parsed = parseHederaResponse(response.response);

      const agentMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'agent',
        content: parsed.cleanText,
        timestamp: new Date(),
        hashScanLink: parsed.hashScanLink,
        tokenId: parsed.tokenId,
        transactionId: parsed.transactionId
      };

      setMessages(prev => [...prev, agentMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'agent',
        content: `Error: ${error instanceof Error ? error.message : 'Something went wrong'}`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearSession = async () => {
    try {
      await clearSession(sessionId);
      setMessages([]);
    } catch (error) {
      console.error('Failed to clear session:', error);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess(text);
      setTimeout(() => setCopySuccess(null), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  if (!credentialsSet) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-hedera-500 rounded-full flex items-center justify-center mx-auto mb-4 flex-shrink-0">
              <Bot className="w-10 h-10 text-white flex-shrink-0" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Hedera Agent Kit</h1>
            <p className="text-gray-600">Connect your Hedera account to get started</p>
          </div>

          <form onSubmit={handleCredentialsSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hedera Account ID
              </label>
              <input
                type="text"
                placeholder="0.0.xxxxxxx"
                value={credentials.accountId}
                onChange={(e) => setCredentials(prev => ({ ...prev, accountId: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hedera-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                DER Encoded Private Key
              </label>
              <input
                type="password"
                placeholder="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                value={credentials.privateKey}
                onChange={(e) => setCredentials(prev => ({ ...prev, privateKey: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hedera-500 focus:border-transparent"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-hedera-500 text-white py-2 px-4 rounded-lg hover:bg-hedera-600 transition-colors font-medium"
            >
              Connect to Hedera
            </button>
          </form>


        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto max-w-4xl p-4 h-screen flex flex-col">
        {/* Header */}
        <div className="bg-white rounded-t-xl shadow-sm p-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-hedera-500 rounded-full flex items-center justify-center flex-shrink-0">
              <Bot className="w-6 h-6 text-white flex-shrink-0" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Hedera Agent</h1>
              <p className="text-sm text-gray-500">Connected: {credentials.accountId}</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={handleClearSession}
              className="p-2 text-gray-500 hover:text-red-600 transition-colors"
              title="Clear conversation"
            >
              <Trash2 className="w-5 h-5" />
            </button>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
              title="Settings"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  <strong>Connected Account:</strong> {credentials.accountId}
                </p>
                <button
                  onClick={() => {
                    setCredentialsSet(false);
                    setMessages([]);
                    setShowSettings(false);
                  }}
                  className="mt-2 text-sm text-yellow-800 underline hover:text-yellow-900"
                >
                  Change credentials
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Messages */}
        <div className="bg-white flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-3xl flex ${
                  msg.type === 'user' ? 'flex-row-reverse' : 'flex-row'
                } items-start space-x-3`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    msg.type === 'user'
                      ? 'bg-blue-500 text-white ml-3'
                      : 'bg-hedera-500 text-white mr-3'
                  }`}
                >
                  {msg.type === 'user' ? <User className="w-4 h-4 flex-shrink-0" /> : <Bot className="w-4 h-4 flex-shrink-0" />}
                </div>
                <div
                  className={`rounded-lg p-3 ${
                    msg.type === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                  
                  {/* Show transaction details */}
                  {(msg.tokenId || msg.transactionId || msg.hashScanLink) && (
                    <div className="mt-3 pt-3 border-t border-gray-300 space-y-2">
                      {msg.tokenId && (
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium">Token ID:</span>
                          <div className="flex items-center space-x-2">
                            <code className="bg-gray-200 px-2 py-1 rounded">{msg.tokenId}</code>
                            <button
                              onClick={() => copyToClipboard(msg.tokenId!)}
                              className="text-gray-500 hover:text-gray-700"
                            >
                              {copySuccess === msg.tokenId ? (
                                <CheckCircle className="w-4 h-4 text-green-500" />
                              ) : (
                                <Copy className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        </div>
                      )}
                      
                      {msg.transactionId && (
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium">Transaction ID:</span>
                          <div className="flex items-center space-x-2">
                            <code className="bg-gray-200 px-2 py-1 rounded text-xs">{msg.transactionId}</code>
                            <button
                              onClick={() => copyToClipboard(msg.transactionId!)}
                              className="text-gray-500 hover:text-gray-700"
                            >
                              {copySuccess === msg.transactionId ? (
                                <CheckCircle className="w-4 h-4 text-green-500" />
                              ) : (
                                <Copy className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        </div>
                      )}
                      
                      {msg.hashScanLink && (
                        <a
                          href={msg.hashScanLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-800"
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span>View on HashScan</span>
                        </a>
                      )}
                    </div>
                  )}
                  
                  <p className="text-xs opacity-70 mt-2">
                    {msg.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-3xl flex items-start space-x-3">
                <div className="w-8 h-8 bg-hedera-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-white flex-shrink-0" />
                </div>
                <div className="bg-gray-100 rounded-lg p-3">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSendMessage} className="bg-white rounded-b-xl shadow-sm p-4">
          <div className="flex space-x-4">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask me to create tokens, transfer HBAR, or query accounts..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hedera-500 focus:border-transparent"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !message.trim()}
              className="bg-hedera-500 text-white px-6 py-2 rounded-lg hover:bg-hedera-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
            >
              <Send className="w-4 h-4" />
              <span>Send</span>
            </button>
          </div>
          
          <div className="mt-2 text-xs text-gray-500">
            <span className="font-medium">Try:</span> "Create a fungible token called MyToken with symbol MTK" • "What's my HBAR balance?" • "Transfer 10 HBAR to 0.0.1234567"
          </div>
        </form>
      </div>
    </div>
  );
}