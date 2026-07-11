
import AboutSection from "@/components/module/home/About";
import CTASection from "@/components/module/home/CallToActions";
import FaqSection from "@/components/module/home/Faq";
import FeaturesSection from "@/components/module/home/Features";
import GallerySection from "@/components/module/home/GellarySection";
import HeroSection from "@/components/module/home/HeroSection";
import ServicesSection from "@/components/module/home/Services";



export default async function Home() {
  return (
    <div>
      {/* here section */}
      <div><HeroSection></HeroSection></div>
      {/* about section */}
      <div>
        <AboutSection></AboutSection>
      </div>
      {/* gellay section */}
      <div id="gallery">
        <GallerySection></GallerySection>
      </div>
      {/* services section */}
      <div>
        <ServicesSection></ServicesSection>
      </div>
      {/* features section */}
      <div>
       <FeaturesSection></FeaturesSection>
      </div>
      {/* faq section */}
      <div>
       <FaqSection></FaqSection>
      </div>
      {/* call to actions section */}
      <div>
       <CTASection></CTASection>
      </div>
      {/* footer section */}
      
    </div>


  );
}
