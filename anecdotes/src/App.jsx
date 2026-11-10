import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import { useAnecdotesActions } from "./components/store.js"
import { useEffect } from 'react'
import Notification from './components/Notification.jsx'

const App = () => {
  const { initialize } = useAnecdotesActions()
  useEffect(() => {
    initialize()
  }, [initialize])
  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App