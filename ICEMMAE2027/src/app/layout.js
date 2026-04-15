import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '../components/common/Navbar/Navbar';
import Footer from '../components/common/Footer/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'ICEMMAE2027',
  description: 'International Conference and Expo on Mechanical, Mechatronics and Aerospace Engineering',
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
      </body>
    </html>
  );
}
