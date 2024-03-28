import '../assets/styles/globals.css';
import Navbar from '../components/Navbar';
export const metaData = {
  title: 'ListingLoom | Easy Real Estate Listing ',
  description: 'A robust and modern web application.',
};
export default function MainLayout({ children }) {
  return (
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
  );
}
