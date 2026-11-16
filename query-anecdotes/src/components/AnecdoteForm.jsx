import { useAnecdotes } from '../hooks/useAnecdotes'
import useNotify from '../hooks/useNotify'

const AnecdoteForm = () => {
  const { addAnecdote } = useAnecdotes()
  const { setNotification } = useNotify()


  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.reset()
    addAnecdote(content, {
      onSuccess: () => {
        setNotification(`A new anecdote was created: ${content}`)
        setTimeout(() => {
          setNotification("")
        }, 5000)
      },
      onError: (error) => {
        setNotification("too short anecdote, must have length 5 or more")
        setTimeout(() => {
          setNotification("")
        }, 5000)
      },
    })

  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm