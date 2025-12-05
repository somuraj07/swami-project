import { AboutSection }  from "@/components/About";
import EventsSection from "@/components/events";
import { HeroSection } from "@/components/header";
import PlacesSection from "@/components/places";
import Image from "next/image";

export default function Home() {
  return (
  <div>
    <HeroSection/>
    <AboutSection/>
    <PlacesSection/>
    <EventsSection/>

  </div>
  );
}
