
import React from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { QuizResult } from "@/types/quiz";
import { resultsToCSV, downloadCSV } from "@/utils/exportUtils";
import { useToast } from "@/hooks/use-toast";

interface DownloadResultsProps {
  results: QuizResult[];
  studentId?: string;
  isAdmin: boolean; // Add isAdmin prop
}

const DownloadResults: React.FC<DownloadResultsProps> = ({ results, studentId, isAdmin }) => {
  const { toast } = useToast();
  
  // Don't render anything if not an admin
  if (!isAdmin) return null;
  
  const handleDownload = () => {
    if (results.length === 0) {
      toast({
        title: "No results to download",
        description: "There are no quiz results available to export.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      const csvContent = resultsToCSV(results);
      const filename = studentId 
        ? `student-${studentId}-results.csv` 
        : "quiz-results.csv";
      
      downloadCSV(csvContent, filename);
      
      toast({
        title: "Download started",
        description: "Your results are being downloaded as a CSV file.",
      });
    } catch (error) {
      console.error("Failed to download results:", error);
      toast({
        title: "Download failed",
        description: "There was a problem creating your CSV file.",
        variant: "destructive"
      });
    }
  };
  
  return (
    <Button 
      onClick={handleDownload} 
      variant="outline" 
      className="flex gap-2 items-center"
      disabled={results.length === 0}
    >
      <Download className="h-4 w-4" />
      Export Results as CSV (Admin Only)
    </Button>
  );
};

export default DownloadResults;
