import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Apple - 혁신적인 기술로 일상을 바꾸다',
  description: '최고의 사용자 경험을 통해 삶을 더 풍요롭게. 간편하고 아름다운 기술을 경험하세요.',
  keywords: ['Apple', '애플', '혁신', '기술', '디자인', '사용자 경험'],
  authors: [{ name: 'Apple Inc.' }],
  openGraph: {
    title: 'Apple - 혁신적인 기술로 일상을 바꾸다',
    description: '최고의 사용자 경험을 통해 삶을 더 풍요롭게',
    type: 'website',
    locale: 'ko_KR',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}

