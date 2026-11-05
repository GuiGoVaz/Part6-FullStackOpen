import { useIncrementControls } from './store'

const Buttons = () => {
  const { incrementG, incrementN, incrementB } = useIncrementControls()
  return (
    <div>
      <h2>give feedback</h2>
      <button onClick={incrementG}>good</button>
      <button onClick={incrementN}>neutral</button>
      <button onClick={incrementB}>bad</button>
    </div>
  )
}

export default Buttons
