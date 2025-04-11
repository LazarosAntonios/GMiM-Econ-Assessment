
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminAuth from "@/components/AdminAuth";
import AdminDashboard from "@/components/AdminDashboard";
import { useToast } from "@/hooks/use-toast";

const Staff: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Empty array for quizResults initially - in a real app this would be fetched from a database
  const quizResults = [];

  const handleAdminAuth = (authenticated: boolean) => {
    if (authenticated) {
      setIsAdmin(authenticated);
    } else {
      navigate('/');
      toast({
        title: "Authentication failed",
        description: "Incorrect password",
        variant: "destructive"
      });
    }
  };

  const handleDisableAdmin = () => {
    setIsAdmin(false);
    navigate('/');
    toast({
      title: "Admin mode disabled",
      description: "You have been logged out",
    });
  };

  // Automatically show auth dialog when component mounts
  React.useEffect(() => {
    setIsAuthDialogOpen(true);
  }, []);

  return (
    <>
      <AdminAuth 
        onAuthenticate={handleAdminAuth}
        isOpen={isAuthDialogOpen}
        onOpenChange={(open) => {
          setIsAuthDialogOpen(open);
          if (!open && !isAdmin) {
            // If dialog is closed and user is not authenticated, go back to landing page
            navigate('/');
          }
        }}
      />

      {isAdmin && <AdminDashboard results={quizResults} onDisableAdmin={handleDisableAdmin} />}
    </>
  );
};

export default Staff;
