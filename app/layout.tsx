import './globals.css'
import NavBar from './ui/navbar'
import { gilda } from './ui/fonts'
import { Providers } from './providers'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "gleam",
  description: "mock videography market",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    //global font size, not sure if tailwind is the best way to apply this
    <html suppressHydrationWarning lang="en" className={`${gilda.className} overflow-x-hidden no-scrollbar text-[16px] md:text-[20px] scroll-smooth`}>
      <body className={`min-h-screen antialiased text-foreground`}>
        <Providers>
          <NavBar />
          {children}
        </Providers>
      </body>
    </html>
  )
}
