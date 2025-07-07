import ClientProviders from '@/components/ClientProviders'

export const metadata = {
  title: 'Sacred mayhem Admin Dashboard',
  description: 'Admin dashboard for Sacred mayhem e-commerce platform',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  )
} 