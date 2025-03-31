
'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function ChatPage() {
  const [messages, setMessages] = useState([
    { role: 'ai', content: 'こんにちは！港区の観光地をご案内します。気になるエリアや目的を教えてください。' },
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
          <Card key={i} className={m.role === 'user' ? 'ml-auto bg-blue-100' : 'mr-auto bg-white'}>
            <CardContent className="p-3 text-sm whitespace-pre-line">{m.content}</CardContent>
          </Card>
        ))}
        {loading && (
          <Card className="mr-auto bg-white">
            <CardContent className="p-3 text-sm">回答を生成中...</CardContent>
          </Card>
        )}
      </div>
      <div className="flex items-center space-x-2">
        <Input
          placeholder="例: 六本木でデートにおすすめは？"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <Button onClick={sendMessage} disabled={loading}>送信</Button>
      </div>
    </div>
  );
}
