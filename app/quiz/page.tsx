'use client'
import React, {useState} from 'react'
import { quiz, IQuestion, IQuiz, IResult } from '../data'
import { Work_Sans } from 'next/font/google'

const Page = () => {
    const [activeQuestionIndex, setActiveQuestionIndex] = useState<number>(0)
    const [selectedAnswer, setSelectedAnswer] = useState<boolean>(false)
    const [checked, setChecked] = useState<boolean>(false)
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number>(-1)
    const [showResult, setShowResult] = useState<boolean>(false)
    const [result, setResult] = useState<IResult>({score:0, correctAnswers:0, wrongAnswers:0})

    const { questions } = quiz
    const { question, answers, correctAnswer } = questions[activeQuestionIndex]

    const onAnswerSelected = (answer: string, index: number) => {
        setChecked(true)
        setSelectedAnswerIndex(index)
        if (answer === correctAnswer) {
            setSelectedAnswer(true)
            console.log('true')
        } else {
            setSelectedAnswer(false)
            console.log('false')
        }
    }

    const onNextQuestion = () => {
        setSelectedAnswerIndex(-1)
        if (selectedAnswer) {
            setResult((prev:IResult) => {
                return {
                    score: prev.score + 2,
                    correctAnswers: prev.correctAnswers + 1,
                    wrongAnswers: prev.wrongAnswers
                }
            })
        } else {
            setResult((prev:IResult) => {
                return {
                    score: prev.score,
                    correctAnswers: prev.correctAnswers,
                    wrongAnswers: prev.wrongAnswers + 1
                }
            })
        }
        if (activeQuestionIndex < questions.length - 1) {
            setActiveQuestionIndex((prev) => prev + 1)
        } else {
            setShowResult(true)
            setActiveQuestionIndex(0)
        }
        setChecked(false)
    }

  return (
    <div className='container'> 
        <h1>Quiz Page</h1>
        <div>
            <h2>{showResult ? 
            (<span>Result</span>) 
            : 
            (
            <span>
                Question {activeQuestionIndex + 1}<span>/{questions.length}</span>
            </span>
            )}</h2>

        </div>
        <div>
            {!showResult ? (
                <div className='quiz-container'>
                    <h3>{questions[activeQuestionIndex].question}</h3>
                    {questions[activeQuestionIndex].answers.map((answer: string, index: number) => (
                        <li className={selectedAnswerIndex === index ? 'li-selected' : 'li-hover'} 
                            key={index} 
                            onClick={() => onAnswerSelected(answer, index)}>
                            <span>{answer}</span>
                        </li>
                    ))}
                    {checked ? (
                        <button className='btn' onClick={() => onNextQuestion()}>
                            {activeQuestionIndex === questions.length - 1 ? 'Fishished' : 'Next Question'}
                        </button>
                    ) : (
                        <button disabled className='btn-disabled'>
                            {activeQuestionIndex === questions.length - 1 ? 'Fishished' : 'Next Question'}
                        </button>
                    )}
                </div>
            ) : (
                <div className='quiz-container'>
                    <h3>Overall {Math.round(result.correctAnswers/questions.length * 100).toFixed(2)}%</h3>
                    <div className='container'>
                        <p>Score: {result.score}</p>
                        <p>Correct Answers: {result.correctAnswers}</p>
                        <p>Wrong Answers: {result.wrongAnswers}</p>
                    </div>
                    {/* <button className='btn' onClick={() => setShowResult(false)}>Try Again</button> */}
                    <button className='btn' onClick={() => window.location.reload()}>Restart</button>
                </div>
            )}
        </div>
    </div>
  )
}

export default Page