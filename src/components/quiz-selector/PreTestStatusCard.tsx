
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle, UserRound, IdCard } from "lucide-react";
import { StudentInfo } from '@/types/quiz';

interface PreTestStatusCardProps {
  preTestStatus: {
    score: number;
    totalQuestions: number;
    percentage: number;
    isEligible: boolean;
    date: Date;
  } | null;
  studentInfo: StudentInfo;
}

const PreTestStatusCard: React.FC<PreTestStatusCardProps> = ({ preTestStatus, studentInfo }) => {
  if (!preTestStatus) return null;
  
  return (
    <div className="mb-8 max-w-lg mx-auto">
      <Card className="border-l-4 border-econ-navy">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg">Pre-Test Results</CardTitle>
            <Badge variant="outline" className={preTestStatus.isEligible ? 
              "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
              {preTestStatus.isEligible ? "Advanced Eligible" : "Pre-Sessional Required"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          {/* Student Information */}
          <div className="flex items-center justify-center space-x-2 mb-4 text-gray-700 border-b pb-3">
            <UserRound className="h-5 w-5" />
            <span className="font-medium">{studentInfo.name}</span>
            <IdCard className="h-5 w-5 ml-2" />
            <span>{studentInfo.studentId}</span>
          </div>
          
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
                <p className="text-sm font-medium flex items-center"><CheckCircle className="h-4 w-4 mr-1" /> Ready for post-test</p>
              ) : (
                <p className="text-sm font-medium flex items-center"><AlertTriangle className="h-4 w-4 mr-1" /> Complete pre-sessional first</p>
              )}
            </div>
          </div>
          <div className="mt-4 bg-blue-50 p-3 rounded-lg text-sm border border-blue-100">
            <p><strong>Next steps:</strong></p>
            {preTestStatus.isEligible ? (
              <p>You can now proceed to the post-test using the provided passkey. It's also recommended (but not required) to explore the optional advanced assessments.</p>
            ) : (
              <p>Please complete the pre-sessional materials on Moodle before taking the post-test. When you return, you can skip the pre-test and move directly to the post-test using the passkey available in Moodle.</p>
            )}
            <p className="mt-2 text-xs font-medium">Please screenshot this page for your records and email it to your instructor.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PreTestStatusCard;
