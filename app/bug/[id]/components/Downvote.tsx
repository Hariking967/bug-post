'use client'

import React from 'react'
import { useState } from 'react';

export default function Downvote({ answer }: { answer: {
  id: string;
  answer: string;
  fromUserId: string | null;
  bugId: string | null;
  upvote: number;
  downvote: number;
} }) {
  const initialVote = answer.downvote
  const [vote, setVote] = useState(initialVote)
  const handleDownvote = async () =>{
    const res = await fetch("/api/downvote",{
        method: 'POST',
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({
            ans: answer
        })
    })
    const newVote = await res.json()
    setVote(newVote)
  }
  return (  
    <div className='bg-red-500 flex flex-row items-center'>
        <button className='ml-4 cursor-pointer text-4xl' onClick={()=>handleDownvote()}>⬇️</button>
        <p className='text-white text-2xl ml-2 mr-2'>{vote}</p>
    </div>
  )
}
