import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import useNotify from './hooks/useNotify'

import { useAnecdotes } from './hooks/useAnecdotes'

const App = () => {
  const { anecdotes, isPending, isError, handleVote: handleVoteInServer } = useAnecdotes()
  const { setNotification } = useNotify()

  const handleVote = (anecdote) => {
    handleVoteInServer(anecdote, {
      onSuccess: () => {
        setNotification(`anecdote '${anecdote.content}' voted`)
        setTimeout(() => {
          setNotification("")
        }, 5000)
      },
      onError: (error) => {
        setNotification("could not complete vote action in server")
        setTimeout(() => {
          setNotification("")
        }, 5000)
      },
    })
  }

  if (isPending) {
    return <div>loading data...</div>
  }
  if (isError) {
    return <div>anecdote service not available due to problems in server</div>
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App