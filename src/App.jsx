import './App.css'
import Die from './components/Die'
import { useState } from 'react'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

function App() {

  const [dice, setDice] = useState(() => generateRandomNumber())
  const gameWon = dice.every(die => die.isHeld && die.value === dice[0].value)

  function generateRandomNumber() {
    return new Array(10)
      .fill(0)
      .map(() => {
        return {
          value: Math.ceil(Math.random() * 6),
          isHeld: false,
          id: nanoid()
        }
      })
  }

  function getAllDiceElements(){
    return dice.map((dieObj) => {
      return <Die key={dieObj.id} value={dieObj.value} isHeld={dieObj.isHeld} hold={() => hold(dieObj.id)} />
    })
  }

  function rollDice() {
    if(gameWon){
      setDice(() => generateRandomNumber())
    }
    else{
      setDice(prev => prev.map(die => die.isHeld ? die : {...die, value: Math.ceil(Math.random() * 6)}))
    }
  }

  function hold(id) {
    setDice((prevDice) => {
      return prevDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die
      })
    })
  }

  return (
    <main className='bg-[#F5F5F5] h-full rounded-[5px] flex flex-col justify-center items-center p-8'>
      {gameWon && <Confetti />}
      <h1 className="title text-4xl font-bold text-blue-700 mb-2 tracking-wide">Tenzies</h1>
      <p className="instructions text-lg text-gray-600 mb-6 text-center max-w-xl">
        Roll until all dice are the same. Click each die to freeze it at its current value between rolls.
      </p>
      <div className="grid grid-cols-5 gap-5 mb-8">
        {getAllDiceElements()}
      </div>

      <button
        onClick={rollDice}
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded shadow transition duration-200 cursor-pointer"
      >
        {gameWon ? "New Game" : "Roll"}
      </button>
    </main>
  )
}

export default App
