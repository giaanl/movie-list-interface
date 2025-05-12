import { Roboto } from "next/font/google";
import "../styles/globals.css";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.className} bg-white dark:bg-gray-900 transition-colors duration-200`}>{children}</body>
    </html>
  );
}
