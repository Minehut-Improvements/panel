"use client";
import React, { useEffect, useState, useRef } from 'react';

const ServerConsole = ({ serverId }) => {
  const [messages, setMessages] = useState([]);
  const [connected, setConnected] = useState(false);
  const [command, setCommand] = useState('');
  const wsRef = useRef(null);
  const consoleRef = useRef(null);

  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const connectWebSocket = () => {
      const ws = new WebSocket(`wss://oddbyte-api.deeka.me/proxy/server/${serverId}/console`);
      
      ws.onopen = () => {
        console.log('WebSocket Connected');
        setConnected(true);
        setMessages(prev => [...prev, { type: 'system', content: 'Connected to server console' }]);
      };

      ws.onmessage = async (event) => {
        try {
          // Handle different types of incoming data
          if (event.data instanceof Blob) {
            // If the data is a Blob, read it as text
            const text = await event.data.text();
            try {
              // Try to parse as JSON
              const jsonData = JSON.parse(text);
              const content = jsonData.message || jsonData.content || JSON.stringify(jsonData);
              setMessages(prev => [...prev, { type: 'message', content }]);
            } catch {
              // If not JSON, use the text directly
              setMessages(prev => [...prev, { type: 'message', content: text }]);
            }
          } else if (typeof event.data === 'string') {
            try {
              // Try to parse string as JSON
              const jsonData = JSON.parse(event.data);
              const content = jsonData.message || jsonData.content || JSON.stringify(jsonData);
              setMessages(prev => [...prev, { type: 'message', content }]);
            } catch {
              // If not JSON, use the string directly
              setMessages(prev => [...prev, { type: 'message', content: event.data }]);
            }
          } else {
            // For other types, convert to string
            setMessages(prev => [...prev, { 
              type: 'message', 
              content: String(event.data)
            }]);
          }
        } catch (e) {
          console.error('Error processing message:', e);
          setMessages(prev => [...prev, { 
            type: 'error', 
            content: 'Error processing message'
          }]);
        }
      };

      ws.onclose = () => {
        console.log('WebSocket Disconnected');
        setConnected(false);
        setMessages(prev => [...prev, { type: 'system', content: 'Disconnected from server console' }]);
        setTimeout(connectWebSocket, 5000);
      };

      ws.onerror = (error) => {
        console.error('WebSocket Error:', error);
        setMessages(prev => [...prev, { type: 'error', content: 'Connection error occurred' }]);
      };

      wsRef.current = ws;
    };

    connectWebSocket();

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [serverId]);

  const handleSendCommand = (e) => {
    e.preventDefault();
    if (!command.trim() || !wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return;

    wsRef.current.send(command);
    setMessages(prev => [...prev, { type: 'command', content: `> ${command}` }]);
    setCommand('');
  };

  return (
    <div className="w-full max-w-4xl bg-gray-900 rounded-lg shadow-lg overflow-hidden">
      <div className="bg-gray-800 p-3 border-b border-gray-700 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${connected ? 'bg-green-500' : 'bg-red-500'}`} />
          <span className="text-white font-medium">Server Console</span>
        </div>
        <div className="text-gray-400 text-sm">
          {connected ? 'Connected' : 'Disconnected'}
        </div>
      </div>

      <div 
        ref={consoleRef}
        className="h-96 overflow-y-auto p-4 font-mono text-sm"
        style={{ backgroundColor: '#1a1a1a' }}
      >
        {messages.map((msg, idx) => (
          <div 
            key={idx} 
            className={`mb-1 ${
              msg.type === 'error' ? 'text-red-400' : 
              msg.type === 'system' ? 'text-blue-400' :
              msg.type === 'command' ? 'text-yellow-400' :
              'text-gray-300'
            }`}
          >
            {typeof msg.content === 'string' ? msg.content : JSON.stringify(msg.content)}
          </div>
        ))}
      </div>

      <form onSubmit={handleSendCommand} className="border-t border-gray-700 p-3">
        <div className="flex space-x-2">
          <input
            type="text"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            placeholder="Enter command..."
            className="flex-1 bg-gray-800 text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={!connected}
            className={`px-4 py-2 rounded font-medium ${
              connected 
                ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            }`}
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default ServerConsole;