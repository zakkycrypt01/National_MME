import Header from "@/components/landing/header"
import HeroSection from "@/components/landing/hero-section"
import TrustBar from "@/components/landing/trust-bar"
import NetworkSection from "@/components/landing/network-section"
import CertificateSection from "@/components/landing/certificate-section"
import InternshipSection from "@/components/landing/internship-section"
import NewsSection from "@/components/landing/news-section"
import CouncilSection from "@/components/landing/council-section"
import Footer from "@/components/landing/footer"
import { LandingDataProvider } from "@/contexts/landing-data-context"

export default function LandingPage() {
  return (
    <LandingDataProvider>
      <main className="min-h-screen bg-background">
        <Header />
        <HeroSection />
        <TrustBar />
        <NetworkSection />
        <CertificateSection />
        <InternshipSection />
        <NewsSection />
        <CouncilSection />
        <Footer />
      </main>
    </LandingDataProvider>
  )
}
