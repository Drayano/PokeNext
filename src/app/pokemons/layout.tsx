import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Pokemons",
  description: "List of all pokemons",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <main className={inter.className}>{children}</main>;
}
