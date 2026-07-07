import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

// Layout racine minimaliste pour le routage de next-intl
export default function RootLayout({ children }: Props) {
  return children;
}
