
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from 'lucide-react';
import { StudentInfo } from '@/types/quiz';
import { Separator } from '@/components/ui/separator';

interface IntroMessageProps {
  studentInfo?: StudentInfo; // Make studentInfo optional
  onContinue?: () => void; // Make onContinue optional
}

const IntroMessage: React.FC<IntroMessageProps> = ({ studentInfo, onContinue }) => {
  return (
    <Card className="max-w-4xl w-full mx-auto shadow-lg animate-fade-in">
      <CardHeader className="bg-econ-navy text-white rounded-t-lg">
        <CardTitle className="text-2xl">Welcome to LSE MiM Economics Assessment</CardTitle>
        <CardDescription className="text-gray-300">
          {studentInfo ? `Hello ${studentInfo.name} (ID: ${studentInfo.studentId})` : "Please register to continue"}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="prose max-w-none">
          <p className="text-lg font-medium mb-4">Hey you!,</p>
          
          <p>Welcome to LSE and, in particular, to the MiM program! My name is Lazaros, and just like a less privileged Tony Stark I built my own dumb Jarvis - the Manager's Test. I'm here to introduce you two different Economics-related tests you'll encounter before the program starts:</p>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">1. Mandatory Foundational Test (Pre- and Post-)</h3>
          
          <h4 className="text-lg font-medium mb-2">Purpose</h4>
          <p>To ensure everyone has a solid baseline in Math, Statistics, and Basic Economics before diving deeper into the MiM curriculum.</p>
          
          <h4 className="text-lg font-medium mt-4 mb-2">Structure</h4>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Pre-Test:</strong> A multiple-choice assessment covering foundational topics (algebra, probability, supply/demand, etc.). You'll take this at the start of the summer.</li>
            <li><strong>Guided Review:</strong> If you don't reach the minimum threshold in one or more sections, you'll be directed to online learning materials to brush up on those areas.</li>
            <li><strong>Post-Test:</strong> A similar test (with new questions) offered later in the summer. If you still don't meet the minimum standard, you'll be required to attend teaching sessions at the in-person pre-sessional. If you pass, you can focus on networking and social events during the pre-sessional instead.</li>
          </ul>
          
          <h4 className="text-lg font-medium mt-4 mb-2">Why It Matters</h4>
          <p>The Foundational Test ensures everyone enters the program on relatively equal footing—so we can spend more time in class on deeper, more interesting applications of Managerial Economics!</p>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">2. Optional Managerial Economics Test (Advanced Placement)</h3>
          
          <h4 className="text-lg font-medium mb-2">Purpose</h4>
          <p>This is for those of you who already feel highly confident in your Economics background—maybe you excelled in undergrad Econ or worked in a heavily quantitative role.</p>
          
          <h4 className="text-lg font-medium mt-4 mb-2">Structure</h4>
          <ul className="list-disc pl-6 space-y-2">
            <li>A single test, split into Part A (fundamental topics) and Part B (advanced or final-level material).</li>
            <li>A strong score could qualify you for a more advanced Economics course option, depending on your overall profile.</li>
          </ul>
          
          <h4 className="text-lg font-medium mt-4 mb-2">Why It's Optional</h4>
          <p>We recognize some students come in with significant prior knowledge. If that's you, this test provides a chance to demonstrate your proficiency and potentially skip some baseline coursework.</p>
          
          <Separator className="my-6" />
          
          <p className="mt-6">So, whether you feel like a math wiz or you feel you are exploring uncharted waters, dive in and give it a go. Remember, like Eminem said:</p>
          
          <blockquote className="border-l-4 border-econ-accent pl-4 italic my-4">
            "If you had one shot, or one opportunity to seize everything you ever wanted in one moment, would you capture it or let it slip?"
          </blockquote>
          
          <p className="mt-4">So now, you only get <strong className="underline">ONE</strong> shot for this test, do not miss your chance to grow, this opportunity comes once in a lifetime.</p>
        </div>
      </CardContent>
      {onContinue && (
        <CardFooter>
          <Button 
            onClick={onContinue}
            variant="default" 
            className="w-full bg-econ-accent hover:bg-econ-navy"
          >
            Continue to Registration <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default IntroMessage;
