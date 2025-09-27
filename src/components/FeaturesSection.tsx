import { Users, Zap, Shield } from "lucide-react"

export function FeaturesSection() {
  return (
    <div id="features" className="grid md:grid-cols-3 gap-8 mb-16">
      <div className="text-center">
        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
          <Users className="h-6 w-6 text-primary" />
        </div>
        <h3 className="text-lg font-semibold mb-2">Real-time Collaboration</h3>
        <p className="text-muted-foreground">See votes in real-time as team members make their estimates</p>
      </div>

      <div className="text-center">
        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
          <Zap className="h-6 w-6 text-primary" />
        </div>
        <h3 className="text-lg font-semibold mb-2">Multiple Scales</h3>
        <p className="text-muted-foreground">Choose from Fibonacci, T-shirt sizes, or custom estimation scales</p>
      </div>

      <div className="text-center">
        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
          <Shield className="h-6 w-6 text-primary" />
        </div>
        <h3 className="text-lg font-semibold mb-2">No Sign-up Required</h3>
        <p className="text-muted-foreground">Jump straight into estimation sessions without creating accounts</p>
      </div>
    </div>
  )
}
