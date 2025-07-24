import React, { useEffect } from 'react'
import Header from '../components/Header'
import Hero from '../components/Hero'
import VideoIntro from '../components/VideoIntro'
import Features from '../components/Features'
import Timeline from '../components/Timeline'
import Prizes from '../components/Prizes'
import Footer from '../components/Footer'
import WhyAccelerate from '../components/WhyAccelerate'

const HomePage = () => {
  useEffect(() => {
    // Handle hash scroll on page load
    if (window.location.hash === '#timeline') {
  setTimeout(() => {
    const element = document.getElementById('timeline');
    if (element) {
      const headerHeight = 35;
      const elementPosition = element.offsetTop - headerHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  }, 100);
}
}, []);

  return (
    <>
      <Header />
      <Hero />
      <WhyAccelerate/>
      <Prizes />
      <Features />
      <Footer />
    </>
  )
}

export default HomePage