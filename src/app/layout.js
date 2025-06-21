import "./globals.css";
import { Montserrat } from "next/font/google";
import { UserProvider } from "@/context/UserContext";
import { Geist, Geist_Mono, Montserrat } from "next/font/google";
import LayoutWrapper from "@/components/LayoutWrapper";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "700"] });
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"]});

export const metadata = {
  title: "AetherCare",
  description: "Health intelligence and real-time vitals insight.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${montserrat.className}`}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <UserProvider>
          <LayoutWrapper>{children}</LayoutWrapper>
        </UserProvider>
      </body>
    </html>
  );
}