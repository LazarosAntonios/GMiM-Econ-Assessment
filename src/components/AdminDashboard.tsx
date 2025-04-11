
import React from 'react';
import { Button } from "@/components/ui/button";
import { QuizResult } from '@/types/quiz';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download } from "lucide-react";
import { resultsToCSV, downloadCSV } from "@/utils/exportUtils";
import { useToast } from "@/hooks/use-toast";

interface AdminDashboardProps {
  results: QuizResult[];
  onDisableAdmin: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ results, onDisableAdmin }) => {
  const { toast } = useToast();
  
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
      const filename = "all-student-results.csv";
      
      downloadCSV(csvContent, filename);
      
      toast({
        title: "Download started",
        description: "Results are being downloaded as a CSV file.",
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
    <div className="container mx-auto py-8 px-4 max-w-5xl animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-econ-navy">Admin Dashboard</h1>
        <Button onClick={onDisableAdmin} variant="destructive">Disable Admin Mode</Button>
      </div>
      
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Student Quiz Results</h2>
          <Button 
            onClick={handleDownload} 
            variant="outline" 
            className="flex gap-2 items-center"
            disabled={results.length === 0}
          >
            <Download className="h-4 w-4" />
            Export All Results as CSV
          </Button>
        </div>
        
        {results.length > 0 ? (
          <Table>
            <TableCaption>Student assessment data</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Student ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Quiz</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Percentage</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {results.map((result, index) => {
                const percentage = Math.round((result.score / result.totalQuestions) * 100);
                const formattedDate = new Date(result.date).toLocaleDateString();
                
                return (
                  <TableRow key={index}>
                    <TableCell>{result.studentInfo.studentId}</TableCell>
                    <TableCell>{result.studentInfo.name}</TableCell>
                    <TableCell>{result.quizTitle}</TableCell>
                    <TableCell>
                      {result.score}/{result.totalQuestions}
                    </TableCell>
                    <TableCell>{percentage}%</TableCell>
                    <TableCell>{formattedDate}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        result.isEligibleForAdvanced ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {result.isEligibleForAdvanced ? 'Advanced Eligible' : 'Standard Track'}
                      </span>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>No student results available yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
