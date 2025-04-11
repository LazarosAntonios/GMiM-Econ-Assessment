
import React from 'react';
import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AdvancedAssessmentToggleProps {
  isEligibleForAdvanced: boolean;
  showManagerial: boolean;
  setShowManagerial: (show: boolean) => void;
}

const AdvancedAssessmentToggle: React.FC<AdvancedAssessmentToggleProps> = ({
  isEligibleForAdvanced,
  showManagerial,
  setShowManagerial
}) => {
  return (
    <div className="mb-10 mt-4">
      <div className="flex items-center mb-6">
        <h2 className="text-xl font-bold text-econ-navy mr-3">OPTIONAL ASSESSMENTS</h2>
        <div className="flex-grow bg-econ-navy/20 h-0.5"></div>
      </div>
      
      <div className="flex flex-col items-center">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-5 max-w-md w-full">
          <div className="flex items-start">
            <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-semibold mr-2 mt-1">
              {isEligibleForAdvanced ? "Available" : "Optional"}
            </div>
            <div>
              <h3 className="font-semibold text-econ-navy">Managerial Economics Assessment</h3>
              <p className="text-sm text-gray-600 mb-3">
                For students with prior economics knowledge who may qualify for advanced placement.
              </p>
              {!showManagerial ? (
                <Button 
                  onClick={() => setShowManagerial(true)} 
                  variant="outline"
                  className="text-sm border-econ-navy text-econ-navy hover:bg-econ-navy hover:text-white"
                >
                  <BookOpen className="mr-2 h-4 w-4" />
                  Enroll in Advanced Assessment
                </Button>
              ) : (
                <Button 
                  onClick={() => setShowManagerial(false)} 
                  variant="outline"
                  className="text-sm border-gray-400 text-gray-500"
                >
                  Hide Advanced Assessment
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedAssessmentToggle;
