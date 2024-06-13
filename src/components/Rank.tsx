import Bronze from '../assets/img/bronze.png'
import Prata from '../assets/img/prata.png'
import Ouro from '../assets/img/ouro.png'
import Esmeralda from '../assets/img/esmeralda.png'
import Rubi from '../assets/img/rubi.png'
import Diamante from '../assets/img/diamante.png'
import Mestre from '../assets/img/mestre.png'
import { TaskContextProps, useTaskContext } from '../contexts/taskContext'
import { useEffect, useState } from 'react'

export default function Rank() {
  const { taskDone } = useTaskContext() as TaskContextProps

  const [totalScore, setTotalScore] = useState(taskDone.length * 10)
  const [rank, setRank] = useState('')
  const [image, setImage] = useState('')

  useEffect(() => {
    setTotalScore(taskDone.length * 10)

    const newRank = () => {
      if (totalScore <= 100) {
        setRank('Bronze')
        setImage(Bronze)
      } else if (totalScore <= 200) {
        setRank('Prata')
        setImage(Prata)
      } else if (totalScore <= 400) {
        setRank('Ouro')
        setImage(Ouro)
      } else if (totalScore <= 800) {
        setRank('Rubi')
        setImage(Rubi)
      } else if (totalScore <= 1200) {
        setRank('Esmeralda')
        setImage(Esmeralda)
      } else if (totalScore <= 1600) {
        setRank('Diamante')
        setImage(Diamante)
      } else {
        setRank('Mestre')
        setImage(Mestre)
      }
    }

    newRank()
  }, [taskDone, totalScore])

  return (
    <div className="max-w-[600px] w-[90%] flex flex-col justify-center items-center bg-white rounded-lg mt-3 text-violet-700 text-center">
      <h3 className="text-lg font-bold p-2">Atualmente você possui</h3>
      <h1 className="text-[24px] font-bold mb-3">{totalScore} pontos</h1>
      {taskDone.length > 0 ? (
        <div className="flex justify-center items-center">
          <h2>Sua patente é : </h2>
          <img className="w-[40px]" src={image} alt="Patente" />
          <h2 className="levelName">{rank}</h2>
        </div>
      ) : (
        <span>Nenhuma tarefa concluida ainda</span>
      )}
    </div>
  )
}
