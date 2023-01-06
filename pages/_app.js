import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { CgSpinnerTwo } from 'react-icons/cg';
import Layout from '../components/layout/Layout';
import { AuthProvider } from '../context/AuthContext';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
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
    <AuthProvider>
      <Layout>
        {isLoading ? (
          <div className="absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] bg-gray-light">
            <CgSpinnerTwo className="animate-spin text-5xl lg:text-7xl xl:text-8xl text-primary-normal" />
          </div>
        ) : (
          <Component {...pageProps} />
        )}
      </Layout>
    </AuthProvider>
  );
}

export default MyApp;
