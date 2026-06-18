import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import { WorkflowProvider } from "@/context/WorkflowContext";
import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.elara.com.bd"),
  title: {
    default: "Elara — The Bangladesh Super App | Everything in one tap",
    template: "%s | Elara Bangladesh",
  },
  description:
    "The hyper-local unified consumer ecosystem engineered for Bangladesh. Food delivery, daily bazaar, express courier, TaskOnTap home sheba, and instant bKash & Nagad payments.",
  openGraph: {
    siteName: "Elara Bangladesh",
    type: "website",
    locale: "bn_BD",
  },
  alternates: { canonical: "/" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-BD" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;700&family=Hind+Siliguri:wght@400;500;600;700&family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="flex min-h-screen flex-col bg-ivory text-ink font-sans antialiased selection:bg-cobalt selection:text-ivory">
        <AuthProvider>
          <WorkflowProvider>
            <CartProvider>
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </CartProvider>
          </WorkflowProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
