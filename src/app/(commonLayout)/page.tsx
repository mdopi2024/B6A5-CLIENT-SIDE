
import HeroSection from "@/components/module/home/HeroSection";
import { AuthServices } from "@/services/auth.services";


export default async function Home() {
  return (
    <div>
      {/* here section */}
      <div><HeroSection></HeroSection></div>
    </div>
    
  );
}
