import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Poppins } from '@next/font/google';
import Layout from '../components/Layout';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={`${poppins.variable} font-sans`}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </div>
  );
}

export default MyApp;
