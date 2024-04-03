import '../assets/styles/globals.css';
import AuthProvider from '../components/AuthProvider';
import Navbar from '../components/Navbar';
export const metaData = {
  title: 'ListingLoom | Easy Real Estate Listing ',
  description: 'A robust and modern web application.',
};
export default function MainLayout({ children }) {
  return (
    <AuthProvider>
      <html lang="en">
        <head>
          <link rel="icon" href="/home.png" />
        </head>
        <body>
          <div>
            <Navbar />
            <div className="min-h-screen ">
              <main>{children}</main>
            </div>
          </div>
        </body>
      </html>
    </AuthProvider>
  );
}
