import localFont from "next/font/local";
import "./globals.css";

const Now = localFont({
  src: "./fonts/Now-Medium.woff",
  variable: "--font-now",
});

export const metadata = {
  title: "Secure-Vault",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${Now.variable} antialiased`}>{children}</body>
    </html>
  );
}
