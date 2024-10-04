"use client"
import React, { useEffect, useState } from 'react'
import {MockInterview} from '../../../../../utils/schema'
import { db } from '../../../../../utils/db'; 
import {eq} from'drizzle-orm'

function Interview({params}) {
    const[interviewData,setInterviewData]=useState();

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
    <div className='my-10 flex justify-center flex-col items-center'>
    <h2 className='font-bold text-2xl'>  Let's Get Started </h2>
    </div>
    
  )
}

export default Interview
