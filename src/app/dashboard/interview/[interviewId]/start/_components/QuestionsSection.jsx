import { Lightbulb, Volume2 } from 'lucide-react'
import React from 'react'


function QuestionsSection({mockInterviewQuestion,activeQuestionIndex}) {

  const textToSpeech=(text)=>{
    if('speechSynthesis' in window){
      const speech=new SpeechSynthesisUtterance(text)
      window.speechSynthesis.speak(speech)
    }
    else{
      alert('Sorry, your browser does not support text to speech')
    }
  }
  return mockInterviewQuestion&&(
    // <div className='p-5 border rounded-lg my-10'>
    //   <div className='grid grid-col-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
    //       {mockInterviewQuestion && mockInterviewQuestion.map((question,index)=>(
            
          
    //       <h2 className={`p-2 bg-green-500 rounded-full text-xs md:text-sm text-center cursor-pointer${activeQuestionIndex==index&&'bg-primary text-white'}`}>Question #{index+1}  </h2>
    //     ))}
        
    //   </div>
    //   <h2 className='my-5 text-md md:text-lg '>{mockInterviewQuestion[activeQuestionIndex]?.question}</h2>
    //   <div className='border rounded-lg p-5 bg-green-200 mt-20 '>
    //     <h2 className='flex gap-5 items-center text-green-600'>
    //         <Lightbulb/>
    //         <strong>Note:</strong>
    //     </h2>
    //     <h2 className='text-sm text-green-500 my-2 '>{process.env.NEXT_PUBLIC_INFO}</h2>
    //   </div>
      
    // </div>
    
      <div className="p-5 rounded-lg border my-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {mockInterviewQuestion &&
            mockInterviewQuestion.map((question, index) => (
              <h2
                key={index}
                className={`p-1 bg-gray-100 rounded-full text-lg md:text-sm text-center cursor-pointer ${
                  activeQuestionIndex === index && "bg-blue-700 text-white"
                }`}
              >
                Question #{index + 1}
              </h2>
            ))}
        </div>
        <h2 className="my-2 text-md md:text-lg">
          {mockInterviewQuestion[activeQuestionIndex]?.question}
        </h2>
        <Volume2
          className="cursor-pointer"
          onClick={() =>
            textToSpeech(mockInterviewQuestion[activeQuestionIndex]?.question)
          }
        />
        <div className="border p-3 rounded-lg bg-blue-100 mt-20">
          <h2 className="flex gap-2 items-center text-blue-700">
            <Lightbulb />
            <strong>Note:</strong>
          </h2>
          <h2 className="text-sm text-blue-700 my-2">
            {process.env.NEXT_PUBLIC_INFO}
          </h2>
        </div>
      </div>
  )
}

export default QuestionsSection
