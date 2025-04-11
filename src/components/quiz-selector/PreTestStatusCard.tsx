
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle } from "lucide-react";

interface PreTestStatusCardProps {
  preTestStatus: {
    score: number;
    totalQuestions: number;
    percentage: number;
    isEligible: boolean;
    date: Date;
  } | null;
}

const PreTestStatusCard: React.FC<PreTestStatusCardProps> = ({ preTestStatus }) => {
  if (!preTestStatus) return null;
  
  return (
    <div className="mb-8 max-w-lg mx-auto">
      <Card className="border-l-4 border-econ-navy">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg">Pre-Test Results</CardTitle>
            <Badge variant="outline" className={preTestStatus.isEligible ? 
              "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
              {preTestStatus.isEligible ? "Advanced Eligible" : "Standard Track"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-600">
                Score: <span className="font-bold">{preTestStatus.score}/{preTestStatus.totalQuestions}</span> ({preTestStatus.percentage}%)
              </p>
              <p className="text-xs text-gray-500">
                Completed on {preTestStatus.date.toLocaleDateString()}
              </p>
            </div>
            <div className={`p-2 rounded-lg ${preTestStatus.isEligible ? 
              'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'}`}>
              {preTestStatus.isEligible ? (
                <p className="text-sm font-medium flex items-center"><CheckCircle className="h-4 w-4 mr-1" /> Eligible for advanced course</p>
              ) : (
                <p className="text-sm font-medium flex items-center"><AlertTriangle className="h-4 w-4 mr-1" /> Standard course recommended</p>
              )}
            </div>
          </div>
          <div className="mt-4 bg-blue-50 p-3 rounded-lg text-sm border border-blue-100">
            <p><strong>Next steps:</strong></p>
            {preTestStatus.isEligible ? (
              <p>You can now continue to the optional advanced assessments or wait for the post-test (password available in Moodle).</p>
            ) : (
              <p>Please refresh your skills on Moodle and return to complete the post-test when ready (password available in Moodle).</p>
            )}
            <p className="mt-2 text-xs font-medium">Please screenshot this page for your records and email it to your instructor.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PreTestStatusCard;
