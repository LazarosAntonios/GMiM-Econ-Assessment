
import React, { useState, useEffect } from 'react';
import { sampleQuizzes } from "@/data/sampleQuizzes";
import { foundationalPreTest } from "@/data/preTestQuiz";
import { foundationalPostTest } from "@/data/postTestQuiz";
import QuizSelector from "@/components/QuizSelector";
import QuizContainer from "@/components/QuizContainer";
import { Quiz, StudentInfo, QuizResult } from "@/types/quiz";
import StudentRegistration from '@/components/StudentRegistration';
import IntroMessage from '@/components/IntroMessage';
import { useToast } from "@/hooks/use-toast";
import DownloadResults from '@/components/DownloadResults';
import { Button } from "@/components/ui/button"; // Add Button import
