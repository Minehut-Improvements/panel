import { Geist, Geist_Mono } from "next/font/google";
import { Rubik, Rubik_Glitch } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
});

const rubikGlitch = Rubik_Glitch({
  variable: "--font-rubik-glitch",
  subsets: ["latin"],
  weight: "400",
});

export const metadata = {
  title: "Minehut Improvements",
  description: "Welcome to Minehut Improvements Website!",
  author: "@MinehutImprovementsTeam",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${rubik.variable} ${rubikGlitch.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
