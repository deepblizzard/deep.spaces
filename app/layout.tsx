'use client';

import "./globals.css";
import { cn } from "@/lib/utils";

import { ThemeProvider } from "@/components/providers/theme-provider";
import { ModalProvider } from "@/components/providers/modal-provider";
import { SocketProvider } from "@/components/providers/socket-provider";
import { QueryProvider } from "@/components/providers/query-provider";

import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import { useRouter } from 'next/navigation';

const openSans = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DeepSpaces",
  description: "Group Chat That’s Fun & Games. Talk, Play, Hang Out"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  return (
    <ClerkProvider
      frontendApi={process.env.NEXT_PUBLIC_CLERK_FRONTEND_API}
      navigate={(to) => router.push(to)}
   afterSignInUrl={process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL} // sign-in redirect
      afterSignUpUrl={process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL}
    >
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn(openSans.className, "bg-white dark:bg-[#0d1117]")}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            storageKey="discord-clone-theme"
          >
            <SocketProvider>
              <ModalProvider />
              <QueryProvider>{children}</QueryProvider>
            </SocketProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}






