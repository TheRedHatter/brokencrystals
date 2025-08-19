import type { FC } from 'react';
import { useEffect } from 'react';
import Counts from './Counts';
import Hero from './Hero';
import Header from './Header/Header';
import FAQ from './FAQ';
import Contact from './Contact';
import Footer from './Footer';

// Add jQuery to Window interface
declare global {
  // Define jQuery interface to avoid using 'any'
  interface JQuery {
    delay(ms: number): JQuery;
    fadeOut(speed: string, callback?: (this: HTMLElement) => void): JQuery;
    remove(): void;
    length: number;
  }

  // Define jQuery static interface
  interface JQueryStatic {
    (selector: string | HTMLElement): JQuery;
  }

  interface Window {
    jQuery: JQueryStatic;
  }
}

const extractIframeUrlParam = (): string | null => {
  const { searchParams } = new URL(window.location.href);
  const mapTitle = searchParams.get('maptitle');
  return mapTitle;
};

export const Main: FC = () => {
  const mapTitle = extractIframeUrlParam();

  // Ensure preloader is handled properly when component mounts
  useEffect(() => {
    // Small delay to ensure the DOM is fully rendered
    setTimeout(() => {
      const $ = window.jQuery;
      if ($ && $('#preloader').length) {
        $('#preloader')
          .delay(100)
          .fadeOut('slow', function (this: HTMLElement) {
            $(this).remove();
          });
      }
    }, 50);
  }, []);

  return (
    <>
      <Header />
      <Hero />

      <main id="main">
        <Counts />
        <FAQ />
        <Contact mapTitle={mapTitle} />
      </main>

      <Footer />

      <a href="/" className="back-to-top">
        <i className="icofont-simple-up" />
      </a>
      <div id="preloader" />
    </>
  );
};

export default Main;
