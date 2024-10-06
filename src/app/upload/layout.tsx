import localFont from "next/font/local";
import NavbarLogin from "@/components/navbar/NavbarLogin";

const Now = localFont({
  src: "../fonts/Now-Medium.woff",
  variable: "--font-now",
});

export const metadata = {
  title: "Secure-Vault",
};

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en">
      <body className={`${Now.variable} antialiased`}>
        <NavbarLogin />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
