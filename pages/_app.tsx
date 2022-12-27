import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { RecipeProvider } from '../context/RecipeContext';
import { AuthProvider } from '../context/AuthContext';
import { Poppins } from '@next/font/google';
import Layout from '../components/Layout';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { CgSpinnerTwo } from 'react-icons/cg';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
});

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => {
      setIsLoading(true);
    };
    const handleComplete = () => {
      setIsLoading(false);
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);
  }, []);

  return (
    <div className={`${poppins.variable} font-sans`}>
      <RecipeProvider>
        <AuthProvider>
          <Layout>
            {isLoading ? (
              <div className="absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%]">
                <CgSpinnerTwo className="animate-spin text-8xl text-primary-normal" />
              </div>
            ) : (
              <Component {...pageProps} />
            )}
          </Layout>
        </AuthProvider>
      </RecipeProvider>
    </div>
  );
}

export default MyApp;
