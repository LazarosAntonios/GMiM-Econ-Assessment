
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { StudentInfo } from '@/types/quiz';
import { Separator } from '@/components/ui/separator';
import { useNavigate } from 'react-router-dom';

interface IntroMessageProps {
  studentInfo?: StudentInfo; // Make studentInfo optional
  onContinue?: () => void; // Make onContinue optional
}

const IntroMessage: React.FC<IntroMessageProps> = ({ studentInfo, onContinue }) => {
  const navigate = useNavigate();

  return (
    <Card className="max-w-4xl w-full mx-auto shadow-lg animate-fade-in">
      <CardHeader className="bg-econ-navy text-white rounded-t-lg">
        <div className="flex justify-between items-center">
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-econ-navy/50"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
          </Button>
          <div>
            <CardTitle className="text-2xl">Welcome to LSE MiM Economics Assessment</CardTitle>
            <CardDescription className="text-gray-300">
              {studentInfo ? `Hello ${studentInfo.name} (ID: ${studentInfo.studentId})` : "Please register to continue"}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-6">
        <div className="prose max-w-none">
          <p className="text-lg font-medium mb-4">Hello there,</p>
          
          <p>Welcome to your pre-arrival assessments for the MiM program. It might already sound and feel stressing but you know, when Apollo 13's oxygen tank exploded en route to the Moon back in the 70's, the crew had zero chance to rehearse their fix in space; they had to improvise life-saving solutions on the fly. Thankfully, your situation is much less stressful—you actually get a chance to prepare!</p>
          
          <p>Unlike those astronauts, you'll have clear guidance and supportive resources along the way. These tests are here to gauge your Math, Statistics, and Economics readiness, so you'll know exactly where you stand before stepping into the classroom.</p>
          
          <Separator className="my-6" />
          
          <h3 className="text-xl font-semibold mt-6 mb-3">The Mandatory Foundational Test</h3>
          <p>Goal: This is a 2-part test to ensure everyone's comfortable with core quantitative and economic principles.</p>
          
          <h4 className="text-lg font-medium mb-2">Part 1: Pre-Test</h4>
          <p>Availability: Open right away, so you can dive in as soon as you're ready.</p>
          <p>Goal: Quickly assess your baseline understanding of core concepts.</p>
          
          <p className="font-medium mt-3">What Happens Next:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Pass: You're set—no immediate extra work required. Move to the 2nd part.</li>
            <li>Don't Pass: No worries; we'll direct you to a set of Moodle-based pre-sessional materials so you can strengthen any weaker areas.</li>
          </ul>
          
          <h4 className="text-lg font-medium mt-4 mb-2">Part 2: Post-Test</h4>
          <p>Unlock: You'll receive a passkey to access the Post-Test if you either:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Pass the Pre-Test, or</li>
            <li>Complete the designated Moodle pre-sessional modules.</li>
          </ul>
          
          <p className="mt-3">Goal: Confirm you've reached the baseline proficiency for the MiM program.</p>
          <p>Outcome: Passing this test fully clears you for the next stage of your studies.</p>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">The Optional Managerial Economics Test</h3>
          <p>Purpose: If you're already feeling like a seasoned econ pro, this single test (in two parts) lets you prove it. A high score could place you into more advanced coursework.</p>
          <p>No Pressure: If you'd rather stick with the standard path, that's completely fine; it's about knowing your starting point.</p>
          
          <Separator className="my-6" />
          
          <p>Use these assessments to your advantage—no last-minute heroics needed. If you have questions or want to discuss the best approach, just let me know. I'm here to make sure your mission to academic success goes smoothly.</p>
          
          <p className="mt-6">So, whether you feel like a math wiz or you feel you are exploring uncharted waters, dive in and give it a go. Remember, like Eminem said:</p>
          
          <blockquote className="border-l-4 border-econ-accent pl-4 italic my-4">
            "If you had one shot, or one opportunity to seize everything you ever wanted in one moment, would you capture it or let it slip?"
          </blockquote>
          
          <p className="mt-4">So now, you only get <strong className="underline">ONE</strong> shot for this test, do not miss your chance to grow, this opportunity comes once in a lifetime.</p>
          
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="font-medium text-red-800">⚠️ Important Warning:</p>
            <p className="text-red-700">Please ensure you're in a stable environment with reliable internet before starting any assessment. If you quit early or refresh the page, your chance might be gone as you only have one attempt per test. Complete each assessment in one sitting.</p>
          </div>
        </div>
      </CardContent>
      {onContinue && (
        <CardFooter className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={() => navigate('/')}
            className="hover:bg-econ-navy/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
          </Button>
          <Button 
            onClick={onContinue}
            variant="default" 
            className="bg-econ-accent hover:bg-econ-navy"
          >
            Continue to Registration <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default IntroMessage;
