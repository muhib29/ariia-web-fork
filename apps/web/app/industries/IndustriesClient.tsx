'use client';

import React, { useEffect, useState } from 'react';

import { NewsletterFooter } from '../../components/homepage/footer';
import { SectionHeader } from '@/components/SectionHeader';
import { useIsMobile } from '@workspace/ui/hooks/use-mobile';
import LottieAnimation from '../../components/LottieAnimation';
import { Header } from '@/components/homepage/header/header';

interface IndustriesClientProps {
  industry: any;
}

export default function IndustriesClient({ industry }: IndustriesClientProps) {
  // const [industryData, setIndustryData] = useState<any>(industry);
  const industryData = industry;
  // const isMobile = useIsMobile();

  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false; // SSR safe
    return window.innerWidth < 768;
  });


  useEffect(() => {
  const check = () => setIsMobile(window.innerWidth < 768);
  window.addEventListener('resize', check);
  return () => window.removeEventListener('resize', check);
}, []);



  // useEffect(() => {
  //   setIndustryData(industry);
  // }, [industry]);

  const sectionCards = [
    {
      desktop: '/lottie/section1desktop.lottie',
      mobile: '/lottie/section1.lottie',
    },
    {
      desktop: '/lottie/section2desktop.lottie',
      mobile: '/lottie/section2.lottie',
    },
    {
      desktop: '/lottie/section3desktop.lottie',
      mobile: '/lottie/section3.lottie',
    },
    {
      desktop: '/lottie/section4desktop.lottie',
      mobile: '/lottie/section4.lottie',
    },
    {
      desktop: '/lottie/section5desktop.lottie',
      mobile: '/lottie/section5.lottie',
    },
    {
      desktop: '/lottie/section6desktop.lottie',
      mobile: '/lottie/section6.lottie',
    },
    {
      desktop: '/lottie/section7desktop.lottie',
      mobile: '/lottie/section7.lottie',
    },
    {
      desktop: '/lottie/section8desktop.lottie',
      mobile: '/lottie/section8.lottie',
    },
  ];
  const animationFrameClass =
    'bg-gradient-to-br from-[#edf7ff] via-[#f8fbff] to-[#dbeaff] md:bg-none';
  const animationPlaceholderClass =
    'w-full h-full bg-gradient-to-br from-[#eef7ff] via-[#f7fcff] to-[#f8fbff]';

  return (
    <section className="relative overflow-hidden bg-white min-h-screen flex flex-col justify-start pt-16 md:pt-20">
      <div className="absolute inset-0 -z-0">
        <div className="ios-mobile-disable-blob absolute w-[300px] h-[300px] md:w-[400px] md:h-[400px] top-[800px] left-[1%] bg-gradient-to-r from-[#4E97FA] via-[#35B5F5] to-[#2EFFEA] opacity-20 blur-[70px]" />
        <div className="ios-mobile-disable-blob absolute w-[300px] h-[300px] md:w-[400px] md:h-[400px] top-[600px] right-[1%] bg-gradient-to-tr from-[#C4CDF3] to-[#C4CDF3] opacity-40 blur-[100px]" />
        <div className="ios-mobile-disable-blob absolute w-[300px] h-[300px] md:w-[400px] md:h-[400px] bottom-[1080px] right-[1%] bg-gradient-to-tr from-[#C4CDF3] to-[#C4CDF3] opacity-40 blur-[100px]" />
      </div>
      <Header /> {/* //changed */}
      <div className="py-10 z-0 px-4 sm:px-4 md:px-6 max-w-6xl mx-auto relative w-full">
        {/* Header Section */}
        <div className="text-center text-[22px] mb-2 sm:mb-[30px]">
          <div className="text-center">
            <SectionHeader
              tag={industryData?.tag || 'Industries'}
              title={industryData?.title || 'Our AI Agents Streamline Communication, '}
              gradientTitle={
                industryData?.styledTitle || 'Customer Experience, and Efficiency Across Industries'
              }
            />
          </div>
        </div>

        {/* First two cards - side by side */}
        <div className="w-[97%] max-sm:mx-auto md:w-full z-0 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 mb-5 sm:mb-10">
          {sectionCards.slice(0, 2).map((card, index) => (
            <div key={index}>
              <div className={`relative overflow-hidden rounded-3xl ${animationFrameClass} shadow-lg w-full border-0 outline-none [&_canvas]:outline-none min-h-[378px]  md:min-h-[480px]`}>
                <div className="absolute -inset-[2px] overflow-hidden rounded-3xl [&>div]:!min-h-0">
                  <div
                    className="absolute inset-0 w-full h-full scale-[1.04] md:scale-[1.04]"
                    style={{ top: 0, left: 0, right: 0, bottom: 0 }}
                  >
                    <LottieAnimation
                      src={isMobile ? card.mobile : card.desktop}
                      loop
                      autoplay
                      eager
                      playWhenInView={false}
                      className="w-full h-full object-cover"
                      placeholderClassName={animationPlaceholderClass}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Third card - full width */}
        <div>
          <div className={`relative w-[97%] max-sm:mx-auto md:w-full z-0 overflow-hidden rounded-3xl ${animationFrameClass} shadow-lg mb-5 sm:mb-10 min-h-[710px]   md:min-h-[264px] border-0 outline-none [&_canvas]:outline-none`}>
            <div className="absolute inset-0 overflow-hidden rounded-3xl [&>div]:!min-h-0">
              <div
                className="absolute inset-0 w-full h-full scale-[1.04] md:scale-[1.06]"
                style={{ top: 0, left: 0, right: 0, bottom: 0 }}
              >
                <LottieAnimation
                  src={isMobile ? sectionCards[2].mobile : sectionCards[2].desktop}
                  loop
                  autoplay
                  playWhenInView
                  className="w-full h-full object-cover"
                  placeholderClassName={animationPlaceholderClass}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Fourth and fifth cards - (Moving 7th card to 5th place) */}
        <div className="w-[97%] max-sm:mx-auto md:w-full z-0 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 mb-5 sm:mb-10">
          {[sectionCards[3], sectionCards[6]].map((card, index) => (
            <div key={index + 3}>
              <div className={`relative overflow-hidden rounded-3xl ${animationFrameClass} shadow-lg w-full border-0 outline-none [&_canvas]:outline-none min-h-[379px] sm:min-h-[380px] md:min-h-[480px]`}>
                <div className="absolute -inset-[2px] overflow-hidden rounded-3xl [&>div]:!min-h-0">
                  <div
                    className="absolute inset-0 w-full h-full scale-[1.04] md:scale-[1.04]"
                    style={{ top: 0, left: 0, right: 0, bottom: 0 }}
                  >
                    <LottieAnimation
                      src={isMobile ? card.mobile : card.desktop}
                      loop
                      autoplay
                      playWhenInView
                      className="w-full h-full object-cover"
                      placeholderClassName={animationPlaceholderClass}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sixth card - full width */}
        <div>
          <div className={`relative z-0 w-[97%] max-sm:mx-auto md:w-full overflow-hidden rounded-3xl ${animationFrameClass} shadow-lg mb-5 sm:mb-10 min-h-[379px]  md:min-h-[260px] border-0 outline-none [&_canvas]:outline-none`}>
            <div className="absolute -inset-[2px] overflow-hidden rounded-3xl [&>div]:!min-h-0">
              <div
                className="absolute inset-0 w-full h-full scale-[1.06] md:scale-[1.05]"
                style={{ top: 0, left: 0, right: 0, bottom: 0 }}
              >
                <LottieAnimation
                  src={isMobile ? sectionCards[5].mobile : sectionCards[5].desktop}
                  loop
                  autoplay
                  playWhenInView
                  className="w-full h-full object-cover"
                  placeholderClassName={animationPlaceholderClass}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <NewsletterFooter isHomePage={false} />
    </section>
  );
}
