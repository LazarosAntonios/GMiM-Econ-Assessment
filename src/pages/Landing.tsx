
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Landing: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md mx-auto text-center space-y-8">
        {/* LSE Logo */}
        <div className="flex justify-center">
          <img 
            src="/lse-logo.png" 
            alt="LSE Logo" 
            onError={(e) => {
              e.currentTarget.src = "https://www.lse.ac.uk/style-assets/images/lse.svg";
            }}
            className="h-40 object-contain" // Increased from h-24 to h-40
          />
        </div>
        
        <Card className="shadow-lg">
          <CardHeader className="bg-econ-navy text-white rounded-t-lg">
            <CardTitle className="text-2xl text-center">LSE MiM Assessment</CardTitle>
          </CardHeader>
          
          <CardContent className="pt-6 pb-4">
            <div className="space-y-4">
              <p className="text-gray-700 mb-6">Please select your role to continue:</p>
              
              <Button 
                variant="default" 
                className="w-full bg-econ-accent hover:bg-econ-navy mb-4 py-6 text-lg"
                onClick={() => navigate('/student')}
              >
                <User className="mr-2 h-5 w-5" /> Student
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full border-econ-navy text-econ-navy hover:bg-econ-navy hover:text-white py-6 text-lg"
                onClick={() => navigate('/staff')}
              >
                <Users className="mr-2 h-5 w-5" /> Staff
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Landing;
