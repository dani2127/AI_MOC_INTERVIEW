"use client"
import {useUser} from '@clerk/nextjs'
import { db } from '../../../../utils/db'; 
import {MockInterview} from '../../../../utils/schema'

import React, { useState } from 'react'
import Button from '@mui/material/Button';
// import input from '../../../components/ui/input' 
// import { Input } from "@/components/ui/input"
import { Input } from '../../../components/ui/input'; 

import { chatSession } from '../../../../utils/text_generation'
import { v4 as uuidv4 } from 'uuid';






import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    
  } from '../../../components/ui/dialog'
import { Loader2, LoaderCircle } from 'lucide-react';
import moment from 'moment';
import { useRouter } from 'next/navigation';

  
  
function Addinterview() {
    const {user}=useUser()
    const [openDialog, setOpenDialog]= useState(false)
    const [jobPosition, setjobPosition]= useState()
    const [jobDescription, setjobDescription]= useState()
    const [jobExperience, setjobobExperience]= useState()
    const [loading,setLoading]=useState(false)
    const [jsonResponse,setJsonResponse]=useState([])
    const router = useRouter()
   
   
    const  onSubmit =async(e)=>{
      setLoading(true)
      e.preventDefault();
      console.log(jobPosition, jobDescription, jobExperience)
      const InputPrompt="Job Position:"+jobPosition+", Job Description:"+jobDescription+",  Years of Experience:"+jobExperience+", Depends on this information please give me "+process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT+" interview question with Answered in json Format, Give Question and Answered as field in JSON"

      const result=await chatSession.sendMessage(InputPrompt)
      const MockJsonResp=(result.response.text()).replace('```json','').replace('```','')
      console.log(MockJsonResp)
      setJsonResponse(MockJsonResp)
      if(MockJsonResp){ 
      const resp=await db.insert( MockInterview)
      .values({
        mockId:uuidv4(),  
        jsonMockResp:MockJsonResp,
        jobPosition:jobPosition,
        jobDesc:jobDescription,
        jobExperience:jobExperience,
        createdBy:user?.primaryEmailAddress?.emailAddress,
        createdAt:(moment().format('DD-MM-YYYY'))
      }).returning({mockId:MockInterview.mockId})
        console.log('Inserted ID',resp)
        if (resp)
        {
          setOpenDialog(false)
          router.push('/dashboard/interview/'+resp[0]?.mockId)
        }
    }  
    else{  
      console.log('Error')
    }
      setLoading(false)
    }
    
  return (
  <div>
     <div className='p-10 border rounded-lg bg-gray-100 hover:scale-105 hover:shadow-md cursor-pointer transition-all'
     onClick={()=>setOpenDialog(true)}
     >
        <h2 className='font-bold text-lg text-center'>+ Add New</h2>
     </div>
     
    
     <Dialog open={openDialog} >
  
  <DialogContent className='max-w-2xl'>
    <DialogHeader>
      <DialogTitle className='text-2xl'>Tell us more about your job interviewing</DialogTitle>
      <DialogDescription >
        <div>
            <h2>Add Details about your job position/role,job description and years of experience</h2>

           
           <div className='mt-5 space-y-4'>
            <div><label htmlFor='jobRole'>Job Role/ Position</label>
            <Input  id='jobRole' type="text" placeholder="Ex.Full stack Developer"
            onChange={(event)=>setjobPosition(event.target.value)}
            
            /> 
             </div>  
           <div >
            <label htmlFor="jobDescription">Job Description/Tech Stack(in short) </label>
           <Input  className="min-h-[75px]" id='jobDescription' type="text" placeholder="Ex.React,Angular,Nodejs,Mysql etc" 
           onChange={(event)=>setjobDescription(event.target.value)}
           />
           
           </div>
             <div> 
             <label htmlFor="experience">Year of experience</label>
             <Input  id='experience' type="number" max="60" placeholder="Ex.5"
             onChange={(event)=>setjobobExperience(event.target.value)}
             />
               </div>
           
           </div>
        </div>
       

       <div className='flex gap-5 justify-end'>
        <Button type='button' onClick={()=>setOpenDialog(false)}>Cancel</Button>
        <Button onClick={onSubmit} className='bg-green-600' type='submit' disabled={loading} >
          {loading?
          <>  
          <LoaderCircle className='animate-spin'/>'Generating from AI':
         </>:'Start Interview'
          
        }
          </Button> 
        
        
        
       </div>
      </DialogDescription>
      

    </DialogHeader>
  </DialogContent>
</Dialog>

     
     
  </div>
  )
}

export default Addinterview

