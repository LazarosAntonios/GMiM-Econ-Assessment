
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface AdminAuthProps {
  onAuthenticate: (isAuthenticated: boolean) => void;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const AdminAuth: React.FC<AdminAuthProps> = ({ onAuthenticate, isOpen, onOpenChange }) => {
  const [password, setPassword] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password === "Jarvis") {
      // Call onAuthenticate with success but don't close the dialog here
      // Let the parent component handle closing
      onAuthenticate(true);
    } else {
      toast({
        title: "Authentication failed",
        description: "Incorrect password",
        variant: "destructive"
      });
      onAuthenticate(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Admin Authentication</DialogTitle>
          <DialogDescription>
            Please enter the admin password to continue
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid gap-4">
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="col-span-3"
              autoFocus
            />
          </div>
          
          <DialogFooter>
            <Button type="submit">Verify</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AdminAuth;
