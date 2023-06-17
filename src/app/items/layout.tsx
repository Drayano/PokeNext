import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Items",
  description: "List of all pokemon items",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <main className={inter.className}>{children}</main>;
}
