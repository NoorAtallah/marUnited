import Image from "next/image";
// import Section from "@/components/section";
import AnimatedSections from "@/components/hero";
import BenefitsSection from "@/components/products";
import FeaturedProducts from "@/components/featuredProducts";
import TestimonialsSection from "@/components/testemonials";
import VelocityScrollSection from "@/components/scrollText";
import CircularGallery from "@/components/gallery";
import FAQSection from "@/components/FAQ";
export default function Home() {
  return (
    <div >
      <AnimatedSections />
      <BenefitsSection />
      <VelocityScrollSection />
      <FeaturedProducts />
      <TestimonialsSection />
      <VelocityScrollSection />
      <CircularGallery />
      <FAQSection />
      {/* <Section /> */}
    </div>
  );
}
