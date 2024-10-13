"use client"
import Webcam from 'react-webcam'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Button } from '@mui/material'
import useSpeechToText from 'react-hook-speech-to-text';
import { Mic } from 'lucide-react'



function RecordAnswerSection() {
  const [userAnswer,setUserAnswer]=useState('')
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false
  });

  useEffect(() => {
    // Clear previous answer before updating
    setUserAnswer(''); // {{ edit_1 }}
    
    results.forEach((result) => {
      setUserAnswer((prevAns) => prevAns + result?.transcript); // {{ edit_2 }}
    });
  }, [results]); // Ensure to add results as a dependency

  return (
    <div className='flex items-center justify-center flex-col' >
    <div className='flex flex-col my-20 justify-center  items-center bg-black rounded-lg pd-5'>
     
    <Image src={'/webcam.png'}width={200} height={200}
    className='absolute' />
    <Webcam
    mirrored={true}
    style={{
        height:300,
        width:"100%",
        zIndex:10,
       
       

    }}
    />
    </div>
    <Button variant='autline' className='border-sm my-10'
    onClick={isRecording?stopSpeechToText:startSpeechToText}
    >
    {isRecording?
    <h2 className='text-red-700 flex gap-2'>
      <Mic/>Stop Recording...
    </h2>
    :
  'Record Answer'} </Button>
  <Button onClick={()=>console.log(userAnswer)}>Show user Answer</Button>
    
   
    </div>
  )
}

export default RecordAnswerSection
