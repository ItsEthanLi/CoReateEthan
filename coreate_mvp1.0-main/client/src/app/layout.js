import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import connectDB from '../lib/mongodb';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

// Initialize MongoDB connection
connectDB();

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <ClerkProvider>
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
