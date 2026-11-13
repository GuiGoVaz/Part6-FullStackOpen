import { useAnecdotes, useAnecdotesActions } from "./store"
import { useNotificationActions } from "./storeNotification"

const AnecdoteList = () => {
    const anecdotes = useAnecdotes()
    const { vote, remove } = useAnecdotesActions()
    const { setNotification } = useNotificationActions();

    const voteHandler = (anecdote) => {
        vote(anecdote.id)
        setNotification(`you voted '${anecdote.content}'`)
        setTimeout(() => {
            setNotification("")
        }, 5000)
    }
    const removeHandler = (anecdote) => {
        remove(anecdote.id)
        setNotification(`You deleted '${anecdote.content}'`)
        setTimeout(() => {
            setNotification("")
        }, 5000)
    }

    return (
        <div>
            {anecdotes.map((anecdote) => (
                <div key={anecdote.id}>
                    <div>{anecdote.content}</div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => voteHandler(anecdote)}>vote</button>
                        {anecdote.votes === 0 && (<button onClick={() => removeHandler(anecdote)}>delete</button>)}

                    </div>
                </div>
            ))}
        </div>
    )
}

export default AnecdoteList
