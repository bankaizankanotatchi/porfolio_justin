import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { ThemeProvider } from '@/components/theme-provider';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import MascotHelper from '@/components/ui/MascotHelper';
import '../globals.css';

export const metadata = {
  title: 'NGUEMO NAGUE JUSTIN THEOPHANE | Développeur Fullstack',
  description: 'Portfolio professionnel de NGUEMO NAGUE JUSTIN THEOPHANE, Développeur Fullstack Web & Mobile, Expert ERP Odoo et automatisation.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning style={{ scrollBehavior: 'smooth' }}>
      <body className="antialiased min-h-screen flex flex-col bg-background text-foreground">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <Header locale={locale} />
            <main className="flex-grow flex flex-col">{children}</main>
            <Footer />
            <MascotHelper />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
