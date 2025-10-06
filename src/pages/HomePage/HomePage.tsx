import { useNavigate } from "react-router-dom"
import { Header } from "./Header"
import { HeroSection } from "./HeroSection"
import { CreateRoomCard } from "./CreateRoomCard"
import { FeaturesSection } from "./FeaturesSection"
import { HowItWorks } from "./HowItWorks"
import { Footer } from "./Footer"
import { useMutation } from "convex/react"
import { api } from "../../../convex/_generated/api"
import { petNameUrlGenerator } from "@/lib/pet_name_url_generator"

export default function HomePage() {
  const navigate = useNavigate();
  const createRoomMutation = useMutation(api.rooms.createRoom);

  const handleCreateRoom = () => {
    const roomName = petNameUrlGenerator();
      createRoomMutation({roomName }).then(() => {
          navigate(`/room/${roomName}`);
      });
  }

  return (
    <div className="min-h-screen bg-background grid-bg">
      <Header />

      <main className="container mx-auto px-4 py-16">
        <HeroSection>
          <CreateRoomCard
            onCreateRoom={handleCreateRoom}
          />
          <FeaturesSection />
          <HowItWorks />
        </HeroSection>
      </main>

      <Footer />
    </div>
  )
}
