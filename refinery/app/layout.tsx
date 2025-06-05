import Navbar from '../components/Navbar';
import './globals.css';

export const metadata = {
  title: 'Refine Leads',
  description: 'Verified & Enriched B2B Leads Platform',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}

