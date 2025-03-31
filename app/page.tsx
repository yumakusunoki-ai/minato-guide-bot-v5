'use client';

import { useState } from 'react';

export default function ChatPage() {
  const [messages, setMessages] = useState([
    { role: 'ai', content: 'こんにちは！港区でおすすめの観光スポットをご案内します。気になるエリアや目的を教えてください。' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: [...messages, userMessage] }),
    });

    const data = await res.json();
    const aiMessage = { role: 'ai', content: data.reply };
    setMessages((prev) => [...prev, aiMessage]);
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-4">
      <div className="space-y-2">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`rounded-xl p-3 text-sm whitespace-pre-line shadow ${
              m.role === 'user' ? 'ml-auto bg-blue-100 text-right' : 'mr-auto bg-white text-left'
            }`}
          >
            {m.content}
          </div>
        ))}
        {loading && (
          <div className="rounded-xl p-3 text-sm bg-white shadow mr-auto">回答を生成中...</div>
        )}
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="text"
          placeholder="例: 六本木でデートにおすすめは？"
          className="flex-1 px-3 py-2 border rounded"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          送信
        </button>
      </div>
    </div>
  );
}
