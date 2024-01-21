import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ReactQueryProvider } from "@/providers/react-query-provider";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/providers/theme-provider";
import { ModalProvider } from "@/providers/modal-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "YouTube Ideas Hub",
  description: "SHEEEEEEEEEEEEEEEEEEEEEEEEEEEEEESH 👄",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ReactQueryProvider>
        <UserProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <body className={inter.className}>
              <Header />
              <main>{children}</main>
              <ModalProvider />
              <Toaster richColors closeButton  />
              <Footer />
            </body>
          </ThemeProvider>
        </UserProvider>
      </ReactQueryProvider>
    </html>
  );
}
