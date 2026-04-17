'use client';

import Section_1 from "@/src/components/LandingPage/Section_1";
import Section_2 from "@/src/components/LandingPage/Section_2";
import Section_3 from "@/src/components/LandingPage/Section_3";
import Section_4 from "@/src/components/LandingPage/Section_4";
import Footer from "@/src/components/LandingPage/Footer";

export default function Landing() {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <Section_1/>
      <Section_2/>
      <Section_3/>
      <Section_4/>
      <Footer />
    </div>
  )
}
