import { Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import Navbar from '../components/common/Navbar/Navbar';
import Footer from '../components/common/Footer/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'iqce2027',
  description: 'International Conference on iqce2027 Theory and Turbulence Mechanism',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="app">
          <Navbar />
          <main className="main-content">
            {children}
          </main>
          <Footer />
        </div>
        <Script 
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="beforeInteractive"
        />
      </body>
    </html>
  );
}
