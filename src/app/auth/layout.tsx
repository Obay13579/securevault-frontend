export default function AuthLayout({children,}: Readonly<{children: React.ReactNode;}>) {
  return (
    <div style={{ backgroundColor: '#2E073F' }} className="flex flex-col items-center justify-center min-h-screen">
          {children}
    </div>
  );
}
