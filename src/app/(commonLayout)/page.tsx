
import Footer from "@/components/module/home/Footer";
import GallerySection from "@/components/module/home/GellarySection";
import HeroSection from "@/components/module/home/HeroSection";
import ServicesSection from "@/components/module/home/Services";
import { AuthServices } from "@/services/auth.services";


export default async function Home() {
  return (
    <div>
      {/* here section */}
      <div><HeroSection></HeroSection></div>
      {/* gellay section */}
      <div id="gallery">
        <GallerySection></GallerySection>
      </div>
      {/* services section */}
      <div>
        <ServicesSection></ServicesSection>
      </div>
      {/* footer section */}
      <div>
        <Footer></Footer>
      </div>
    </div>
    
    
  );
}
