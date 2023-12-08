import './index.scss'
import { useEffect, useRef, useState } from 'react'

const Flashcard = ({ flashcard }) => {


  const [flip, setFlip] = useState(false);
  const [height, setHeight] = useState('initial');

  const frontElement = useRef();
  const backElement = useRef();

  const setMaxHeight = () => {
    const frontHeight = frontElement.current.getBoundingClientRect().height
    const backHeight = backElement.current.getBoundingClientRect().height 
    setHeight(Math.max(frontHeight, backHeight, 100))
  }

  useEffect(() => {
      setMaxHeight()
  }, [flashcard.spanishWord, flashcard.englishTranslation])


  useEffect(() => {
    window.addEventListener('resize', setMaxHeight)
    return () => window.removeEventListener('resize', setMaxHeight)
  }, [])

  return (
    <div
      className={`card ${flip ? 'flip' : ''}`}
      style={{height: height}}
      onClick={() => setFlip(!flip)}
    >
      <div className="front" ref={frontElement}>
        {flashcard.spanishWord}
      </div>
      <div className="back" ref={backElement}>{flashcard.englishTranslation}</div>
    </div>
  )
}

export default Flashcard