import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Moves",
  description: "List of all pokemon moves",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <main className={inter.className}>{children}</main>;
}
