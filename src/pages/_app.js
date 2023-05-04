import '../styles/global.css';
import styles from './App.module.css';
import React, { useEffect } from "react";
import Header from '../components/Header/Header';

const App = ({ Component, pageProps }) => {
  useEffect(() => {
    const testWebP = async () => {
      const test = () => new Promise(res => {
        const webP = new Image();
        webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
        webP.onload = webP.onerror = () => {
          res(webP.height === 2);
        };
      });
      const isSupported = await test();
      window.isWebPSupported = isSupported;
    };
    testWebP()
  }, []);

  return (
    <div className={styles.wrapper}>
      <Header page={[Component, pageProps]} />
      <Component {...pageProps} />
    </div>
  )
};

export default App;
