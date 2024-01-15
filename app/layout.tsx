import "./globals.css";
import type { Metadata } from "next";
import {Lato } from "next/font/google";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import Provider from "@/redux/provider";
import { Toaster } from "@/components/ui/toaster";

const lato = Lato({
  weight: '400',
  subsets: ['latin'],
})



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {


  return (
    <html lang="en">
      <body className={lato.className}>
        <Provider>
          <div>
            <Navbar />
            {children}
            <Footer />
          </div>
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
