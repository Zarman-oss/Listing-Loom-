import Footer from '@/components/Footer.jsx';
import '../assets/styles/globals.css';
import AuthProvider from '../components/AuthProvider';
import Navbar from '../components/Navbar';
import { GlobalProvider } from '@/context/globalContext.js';


export const metaData = {
  title: 'ListingLoom | Easy Real Estate Listing ',
  description: 'A robust and modern web application.',
};
export default function MainLayout({ children }) {
  return (
    <GlobalProvider>
      <AuthProvider>
        <html lang='en'>
          <head>
            <link rel='icon' href='/home.png' />
          </head>
          <body>
            <div>
              <Navbar />
              <div className='min-h-screen '>
                <main>{children}</main>
              </div>
              <Footer />
            </div>
          </body>
        </html>
      </AuthProvider>
    </GlobalProvider>
  );
}
