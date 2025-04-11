
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Users, Loader } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Skeleton } from "@/components/ui/skeleton";

const Landing: React.FC = () => {
  const navigate = useNavigate();
  const [loadingLogo, setLoadingLogo] = useState(true);
  const [loadingCard, setLoadingCard] = useState(true);
  const [typedText, setTypedText] = useState("");
  const fullText = "Created by Lazaros-Antonios Chatzilazarou, PhD";

  // Simulate loading time
  useEffect(() => {
    const logoTimer = setTimeout(() => {
      setLoadingLogo(false);
    }, 800);
    
    const cardTimer = setTimeout(() => {
      setLoadingCard(false);
    }, 1200);
    
    return () => {
      clearTimeout(logoTimer);
      clearTimeout(cardTimer);
    };
  }, []);

  // Typewriter effect
  useEffect(() => {
    if (typedText.length < fullText.length) {
      const typeTimer = setTimeout(() => {
        setTypedText(fullText.substring(0, typedText.length + 1));
      }, 50);
      
      return () => clearTimeout(typeTimer);
    }
  }, [typedText, fullText]);
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md mx-auto text-center space-y-2">
        {/* LSE Logo with loading animation */}
        <div className="flex justify-center">
          {loadingLogo ? (
            <div className="h-48 w-48 flex items-center justify-center">
              <Loader className="h-12 w-12 text-econ-navy animate-spin" />
            </div>
          ) : (
            <img 
              src="/lse-logo.png" 
              alt="LSE Logo" 
              onError={(e) => {
                e.currentTarget.src = "https://www.lse.ac.uk/style-assets/images/lse.svg";
              }}
              className="h-48 object-contain animate-fade-in" 
            />
          )}
        </div>
        
        {loadingCard ? (
          <Skeleton className="w-full h-64 mb-4" />
        ) : (
          <Card className="shadow-lg animate-scale-in">
            <CardHeader className="bg-econ-navy text-white rounded-t-lg">
              <CardTitle className="text-2xl text-center">LSE MiM Assessment</CardTitle>
            </CardHeader>
            
            <CardContent className="pt-6 pb-4">
              <div className="space-y-4">
                <p className="text-gray-700 mb-6">Please select your role to continue:</p>
                
                <Button 
                  variant="default" 
                  className="w-full bg-econ-accent hover:bg-econ-navy mb-4 py-6 text-lg hover-scale"
                  onClick={() => navigate('/student')}
                >
                  <User className="mr-2 h-5 w-5" /> Student
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full border-econ-navy text-econ-navy hover:bg-econ-navy hover:text-white py-6 text-lg hover-scale"
                  onClick={() => navigate('/staff')}
                >
                  <Users className="mr-2 h-5 w-5" /> Staff
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
        
        {/* Creator credit with typewriter effect */}
        <div className="mt-8 text-sm text-gray-500">
          {typedText}
          {typedText.length < fullText.length && <span className="animate-pulse">|</span>}
        </div>
      </div>
    </div>
  );
};

export default Landing;
