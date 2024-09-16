import {useState} from 'react'

interface IntroProps {
  showIntro: boolean;
  setShowIntro: (value: boolean) => void;
}

export function Intro({showIntro, setShowIntro}: IntroProps) {
  
  if (!showIntro) {
    return null; 
  }

  return (
    <div className='absolute inset-0 bg-black/80 grid place-items-center z-10'>
      <div className='rounded-md bg-neutral-100 p-4 flex items-center justify-center gap-2 flex-col'>
        <h2 className='text-xl font-semibold'>BlackJack</h2>

        <p>Bem-vindo ao nosso jogo de BlackJack!</p>
        <button className='btn-black' onClick={() => setShowIntro(false)}>
          Começar
        </button>
        <button className='btn-black' onClick={() => setShowIntro(true)}>
          Regras
        </button>
      </div>
    </div>
  )
}

