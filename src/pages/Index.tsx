import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, Leaf, Heart, ArrowRight } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-sage">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="p-4 rounded-full bg-primary/10 border border-primary/20">
              <Leaf className="w-12 h-12 text-primary" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-foreground mb-6">
            Discover Your <span className="text-primary">Prakruti</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-3xl mx-auto">
            Unveil your unique Ayurvedic constitution through our comprehensive 18-question assessment. 
            Understand your natural tendencies, balance your doshas, and receive personalized lifestyle recommendations.
          </p>
          <Link to="/patient-info">
            <Button className="text-lg px-8 py-4 bg-gradient-primary hover:opacity-90 shadow-soft">
              Begin Your Journey
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Understanding Your Constitution
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Ayurveda recognizes three fundamental energies (doshas) that govern all life processes. 
              Discover which combination defines your unique nature.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="shadow-soft hover:shadow-elevated transition-all duration-300">
              <CardHeader className="text-center">
                <div className="w-16 h-16 rounded-full bg-dosha-vata/20 flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-8 h-8 text-dosha-vata" />
                </div>
                <CardTitle className="text-xl">Vata</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center">
                  Air & Space elements. Governs movement, circulation, and nervous system. 
                  Creative, energetic, and quick-thinking when balanced.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-soft hover:shadow-elevated transition-all duration-300">
              <CardHeader className="text-center">
                <div className="w-16 h-16 rounded-full bg-dosha-pitta/20 flex items-center justify-center mx-auto mb-4">
                  <div className="w-8 h-8 rounded-full bg-dosha-pitta" />
                </div>
                <CardTitle className="text-xl">Pitta</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center">
                  Fire & Water elements. Controls metabolism, digestion, and transformation. 
                  Intelligent, focused, and determined when balanced.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-soft hover:shadow-elevated transition-all duration-300">
              <CardHeader className="text-center">
                <div className="w-16 h-16 rounded-full bg-dosha-kapha/20 flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-dosha-kapha" />
                </div>
                <CardTitle className="text-xl">Kapha</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center">
                  Earth & Water elements. Provides structure, immunity, and stability. 
                  Calm, strong, and nurturing when balanced.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-6">
            What is Prakruti Parikshana?
          </h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Prakruti Parikshana is an ancient Ayurvedic method of constitutional analysis that helps identify 
              your unique mind-body type. "Prakruti" means nature or constitution, while "Parikshana" means examination.
            </p>
            <p>
              This assessment examines your physical characteristics, mental tendencies, digestive patterns, 
              and lifestyle preferences to determine your doshic constitution - the blueprint you were born with.
            </p>
            <p>
              Understanding your prakruti empowers you to make lifestyle choices that enhance your natural strengths 
              and maintain optimal health through personalized diet, exercise, and daily routines.
            </p>
          </div>
          <div className="mt-8">
            <Link to="/patient-info">
              <Button variant="outline" className="text-lg px-6 py-3 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                Start Assessment
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 Prakruti Assessment. Based on traditional Ayurvedic principles for educational purposes.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
