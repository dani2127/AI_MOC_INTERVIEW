"use client"
import React, { useEffect, useState } from 'react'
import {MockInterview} from '../../../../../utils/schema'
import { db } from '../../../../../utils/db'; 
import {eq} from'drizzle-orm'
import Webcam from 'react-webcam';
import { Lightbulb, WebcamIcon } from 'lucide-react';
import { Button } from '@mui/material';

function Interview({params}) {
    const[interviewData,setInterviewData]=useState();
    const[webCamEnabled, setWebCamEnabled]=useState(false)

      useEffect(()=>{
        console.log(params.InterviewId)
        GetInterviewDetails()
      },[])

      //used to get interview details by mockid/interview id
      const GetInterviewDetails=async()=>{
        const result=await db.select().from(MockInterview)
        .where(eq(MockInterview.mockId,params.interviewId))
    
        setInterviewData(result[0])
      }

  return (
    <div className='my-10 '>
    <h2 className='font-bold text-2xl'>  Let's Get Started </h2>
    <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
    
    <div className='flex flex-col my-5 gap-5 '>
      <div className='flex flex-col p-5 rounded-lg border gap-5'>  
      {/* <h2><strong>Job Role/Job Position:</strong>{interviewData.jobPosition} </h2>   */}
      <h2 className='text-lg'>
            <strong>Job Role/Job Position:</strong>
            {interviewData ? interviewData.jobPosition : 'Loading...'}
        </h2>
        <h2 className='text-lg'>
            <strong>Job Description/Tech Stack:</strong>
            {interviewData ? interviewData.jobDesc : 'Loading...'}
        </h2>
        <h2 className='text-lg'>
            <strong>Years of Experience:</strong>
            {interviewData ? interviewData.jobExperience : 'Loading...'}
        </h2>
        </div>
        <div className='p-5 border rounded-lg border-yellow-300 bg-yellow-100'>
          
          <h2 className='flex gap-2 items-center text-yellow-500'>  <Lightbulb/> <strong>Information</strong> </h2>
          <h2 className='mt-3 text-yellow-500'> {process.env.NEXT_PUBLIC_INFORMATION}  </h2>
        </div>
     </div>
     <div>
        {webCamEnabled? <Webcam
        onUserMedia={()=>setWebCamEnabled(true)}
        onUserMediaError={()=>setWebCamEnabled(false)}
        mirrored={true}
        style={
          {
            height:300,
            width:300
          }
        }
        />
        :
        <>  
    <WebcamIcon className='h-60 w-full  p-20 bg-secondary rounded-lg border my-7'  />
    <Button className='text-black hover:bg-gray-100 ' style={{ textTransform: 'none' }}  onClick={()=>setWebCamEnabled(true)} >Enable Web cam and Microphone </Button>
    </>
        }
    </div>

    </div>
   

     <div className='flex justify-end itmes-end  '> 

    <Button className='bg-green-600 text-white ' style={{ textTransform: 'none' }}>Start Interview</Button>
    
     </div>
    

    </div>
    
  )
}

export default Interview
