// app/layout.tsx

export const metadata = {
  title: 'Minato Guide Bot',
  description: '港区の観光地を提案するAIチャットボット',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}