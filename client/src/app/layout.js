import {
  ClerkProvider,
} from '@clerk/nextjs'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import ReduxProvider from '@/store/redux-provider'
import { Toaster } from '@/components/ui/sonner'
export default function RootLayout({
  children,
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body>
          <ReduxProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Toaster />
              {children}
            </ThemeProvider>
          </ReduxProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}