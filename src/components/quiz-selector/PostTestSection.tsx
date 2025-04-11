
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, ArrowRight, Clock, Lock, Unlock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Quiz } from '@/types/quiz';
import { toast } from "@/hooks/use-toast";

interface PostTestSectionProps {
  postTest: Quiz;
  onSelectQuiz: (id: number) => void;
}

const PostTestSection: React.FC<PostTestSectionProps> = ({ postTest, onSelectQuiz }) => {
  const [postPasskey, setPostPasskey] = useState<string>("");
  const [postTestUnlocked, setPostTestUnlocked] = useState<boolean>(false);
  
  const handleUnlockPostTest = () => {
    if (postPasskey === "PASS") {
      setPostTestUnlocked(true);
      toast({
        title: "Post-Test Unlocked",
        description: "You now have access to the post-test assessment.",
      });
    } else {
      toast({
        title: "Invalid Passkey",
        description: "The passkey you entered is incorrect. Please check your Moodle slides for the correct passkey.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="mt-10">
      <div className="bg-green-50 border-l-4 border-green-500 p-3 mb-4">
        <h3 className="font-bold text-green-700">REQUIRED: Post-Test Assessment</h3>
        <p className="text-sm text-green-600">Complete the post-test when instructed by your course coordinator</p>
      </div>
      
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-econ-navy">Post-Test Assessment</h2>
        {!postTestUnlocked && (
          <div className="flex space-x-2">
            <Input
              type="password"
              placeholder="Enter passkey from Moodle"
              value={postPasskey}
              onChange={(e) => setPostPasskey(e.target.value)}
              className="w-48"
            />
            <Button onClick={handleUnlockPostTest} size="sm">
              <Lock className="w-4 h-4 mr-2" /> Unlock
            </Button>
          </div>
        )}
        {postTestUnlocked && (
          <Badge className="bg-green-100 text-green-800 flex items-center">
            <Unlock className="w-4 h-4 mr-1" /> Unlocked
          </Badge>
        )}
      </div>
      
      {postTestUnlocked ? (
        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="bg-econ-navy text-white rounded-t-lg">
            <div className="flex justify-between items-center">
              <CardTitle>{postTest.title}</CardTitle>
              <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                Foundational
              </span>
            </div>
            <CardDescription className="text-gray-300 flex items-center mt-2">
              <Clock className="h-4 w-4 mr-1" /> {postTest.duration} minutes | {postTest.questions.length} questions
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-gray-700">{postTest.description}</p>
            <div className="bg-yellow-50 border border-yellow-200 rounded p-3 mt-4">
              <div className="flex items-start">
                <AlertTriangle className="h-4 w-4 text-yellow-600 mr-2 mt-1" />
                <p className="text-sm text-yellow-700">
                  This is the final course assessment with a higher passing threshold (75%). It covers Math, Statistics, and Economics.
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={() => onSelectQuiz(postTest.id)} 
              variant="default" 
              className="w-full bg-econ-accent hover:bg-econ-navy"
            >
              Start Post-Test <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
          <Lock className="w-8 h-8 mx-auto mb-3 text-gray-400" />
          <h3 className="text-lg font-medium text-gray-700">Post-Test is Locked</h3>
          <p className="text-gray-500 mt-2">Enter the correct passkey from your Moodle slides to unlock the post-test assessment.</p>
        </div>
      )}
    </div>
  );
};

export default PostTestSection;
