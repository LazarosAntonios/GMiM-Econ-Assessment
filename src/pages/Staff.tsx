
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
      setIsAdmin(true);
      setIsAuthDialogOpen(false);
      toast({
        title: "Admin mode enabled",
        description: "You can now access admin features",
      });
    } else {
      toast({
        title: "Authentication failed",
        description: "Incorrect password",
        variant: "destructive"
      });
      // Don't navigate away on failed authentication - let them try again
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
      {!isAdmin && (
        <AdminAuth 
          onAuthenticate={handleAdminAuth}
          isOpen={isAuthDialogOpen}
          onOpenChange={(open) => {
            setIsAuthDialogOpen(open);
            if (!open && !isAdmin) {
              // Only navigate away if dialog is closed by user without authenticating
              navigate('/');
            }
          }}
        />
      )}

      {isAdmin && <AdminDashboard results={quizResults} onDisableAdmin={handleDisableAdmin} />}
    </>
  );
};

export default Staff;
