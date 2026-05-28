'use client';

import Section_1 from "@/components/LandingPage/Section_1";
import Section_2 from "@/components/LandingPage/Section_2";
import Section_3 from "@/components/LandingPage/Section_3";
import Section_4 from "@/components/LandingPage/Section_4";
import Section_HowTo from "@/components/LandingPage/Section_HowTo";
import Section_FAQ from "@/components/LandingPage/Section_FAQ";
import Footer from "@/components/LandingPage/Footer";

export default function Landing() {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <Section_1/>
      <Section_2/>
      <Section_3/>
      <Section_HowTo/>
      <Section_4/>
      <Section_FAQ/>
      <Footer />
    </div>
  )
}
