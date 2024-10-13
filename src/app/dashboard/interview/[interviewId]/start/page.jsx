"use client"
import { db } from '../../../../../../utils/db';
import {MockInterview} from '../../../../../../utils/schema'
import {eq} from'drizzle-orm'
import React, { useEffect, useState } from 'react'
import QuestionsSection from './_components/QuestionsSection'
import RecordAnswerSection from './_components/RecordAnswerSection'

 


function StartInterview({params}) {
    const [interviewData, setInterviewData]=useState()
    const [mockInterviewQuestion, setMockInterviewQuestion]=useState()
    const[activeQuestionIndex,setActiveQuestionIndex]=useState(0)

    useEffect(()=>{
        GetInterviewDetails()
        
    }, [])

     //used to get interview details by mockid/interview id
     const GetInterviewDetails=async()=>{
     
      //  console.log('Params:', params);
      //   console.log('Raw Interview ID:', params.interviewId);
      //   const result=await db.select().from(MockInterview)
      //   .where(eq(MockInterview.mockId,params.interviewId))
      //   const jsonMockResp=JSON.parse(result[0].jsonMockResp) 
      //   console.log(jsonMockResp)
      //   setMockInterviewQuestion(jsonMockResp)
      //   setInterviewData(result[0])

      

      let decodedInterviewId;
      try {
          // Decode the ID and trim leading/trailing spaces
          decodedInterviewId = decodeURIComponent(params.interviewId).trim();
          console.log('Decoded Interview ID:', decodedInterviewId); // Log the decoded ID
      } catch (error) {
          console.error('Error decoding Interview ID:', error);
          return; // Exit the function if decoding fails
      }

      // Query the database
      const result = await db.select().from(MockInterview)
          .where(eq(MockInterview.mockId, decodedInterviewId));
      // console.log('Query result:', result); // Log the result of the query

      if (result.length > 0) {
          try {
              const jsonMockResp = JSON.parse(result[0].jsonMockResp);
              console.log('Parsed mock response:', jsonMockResp); // Log the parsed response
              setMockInterviewQuestion(jsonMockResp);
              setInterviewData(result[0]);
          } catch (error) {
              console.error('Error parsing JSON response:', error);
          }
      } else {
          console.error('No interview found for the given ID:', decodedInterviewId);
      }
        
      }

  return (
    <div>
      <div className='grid grid-cols-1 md:grid-cols-2'>
       
        <QuestionsSection 
        
        mockInterviewQuestion={mockInterviewQuestion}
        activeQuestionIndex={activeQuestionIndex}
        />
        <RecordAnswerSection/>
      </div>
    </div>
  )
}

export default StartInterview



