
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { StudentInfo } from '@/types/quiz';
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { BookOpen } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  studentId: z.string().min(5, "Student ID must be at least 5 characters")
});

type FormValues = z.infer<typeof formSchema>;

interface StudentRegistrationProps {
  onSubmit: (studentInfo: StudentInfo) => void;
}

const StudentRegistration: React.FC<StudentRegistrationProps> = ({ onSubmit }) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      studentId: ""
    }
  });

  const handleSubmit = (values: FormValues) => {
    onSubmit({
      name: values.name,
      studentId: values.studentId
    });
  };

  return (
    <Card className="max-w-md w-full mx-auto shadow-lg animate-fade-in">
      <CardHeader className="bg-econ-navy text-white rounded-t-lg">
        <div className="flex justify-center mb-2">
          <BookOpen className="h-12 w-12 text-econ-gold" />
        </div>
        <CardTitle className="text-2xl text-center">LSE MiM Economics Assessment</CardTitle>
        <CardDescription className="text-gray-300 text-center">
          Please enter your information to continue
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Smith" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="studentId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Student ID</FormLabel>
                  <FormControl>
                    <Input placeholder="12345678" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button 
              type="submit" 
              variant="default" 
              className="w-full bg-econ-accent hover:bg-econ-navy"
            >
              Continue to Tests
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default StudentRegistration;
