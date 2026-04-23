"use client";
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase'; // Adjust based on your supabase client path

export default function QuizModal({ lessonId, onClose }: { lessonId: number, onClose: () => void }) {
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchQuiz() {
      const { data } = await supabase
        .from('quiz_questions')
        .select('*')
        .eq('lesson_id', lessonId);
      if (data) setQuestions(data);
      setLoading(false);
    }
    fetchQuiz();
  }, [lessonId]);

  const handleAnswer = (selectedOption: string) => {
    if (selectedOption === questions[currentIndex].correct_answer) {
      setScore(score + 1);
    }

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setShowResults(true);
    }
  };

  if (loading) return <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[100] text-white">Loading Quest...</div>;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-[100] p-4">
      <div className="bg-white dark:bg-gray-900 w-full max-w-2xl rounded-[2.5rem] p-8 border-4 border-[#7042F4] relative">
        <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-black dark:hover:text-white">✕</button>

        {!showResults ? (
          <div>
            <div className="mb-8">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#7042F4]">Question {currentIndex + 1} of {questions.length}</span>
              <h2 className="text-2xl font-black mt-2">{questions[currentIndex].question_text}</h2>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {questions[currentIndex].options.map((option: string, i: number) => (
                <button 
                  key={i}
                  onClick={() => handleAnswer(option)}
                  className="p-4 text-left rounded-2xl border-2 border-gray-100 dark:border-gray-800 hover:border-[#7042F4] hover:bg-[#7042F4]/5 transition-all font-bold"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-10">
            <h2 className="text-5xl font-black mb-4">🎉 {score}/{questions.length}</h2>
            <p className="text-xl font-bold text-gray-500 mb-8">You earned {(score * 10)} XP!</p>
            <button onClick={onClose} className="px-10 py-4 bg-[#7042F4] text-white rounded-2xl font-black uppercase tracking-widest">Finish Mission</button>
          </div>
        )}
      </div>
    </div>
  );
}