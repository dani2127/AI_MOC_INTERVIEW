"use client"
import React, { useState } from 'react'
import Button from '@mui/material/Button';
// import input from '../../../components/ui/input' 
import { Input } from '../../../components/ui/input'
import { chatSession } from '../../../../utils/text_generation'





import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    
  } from '../../../components/ui/dialog'

  
  
function Addinterview() {
    const [openDialog, setOpenDialog]= useState(false)
    const [jobPosition, setjobPosition]= useState()
    const [jobDescription, setjobDescription]= useState()
    const [jobExperience, setjobobExperience]= useState()
    const  onSubmit =async(e)=>{
      e.preventDefault();
      console.log(jobPosition, jobDescription, jobExperience)
      const InputPrompt="Job Position:"+jobPosition+", Job Description:"+jobDescription+",  Years of Experience:"+jobExperience+", Depends on this information please give me "+process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT+" interview question with Answered in json Format, Give Question and Answered as field in JSON"
      const result=await chatSession.sendMessage(InputPrompt)
      console.log(result.response.text())
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
        <Button onClick={onSubmit} className='bg-green-600' type='submit'>Start Interview </Button> 
        
        
        
       </div>
      </DialogDescription>
      

    </DialogHeader>
  </DialogContent>
</Dialog>

     
     
  </div>
  )
}

export default Addinterview
