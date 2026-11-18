import "./globals.css";
export const metadata = {
  title: "YourName.dev | Full Stack Developer",
  description: "Portfolio of a full stack developer. Projects, skills and contact.",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
