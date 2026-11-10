import { useAnecdotesActions } from "./store"
import { useNotificationActions } from "./storeNotification"

const AnecdoteForm = () => {

    const { add } = useAnecdotesActions()
    const { setNotification } = useNotificationActions()

    const addAnecdote = (e) => {
        e.preventDefault()
        const content = e.target.anecdote.value
        add(content)
        setNotification(`A new anecdote was created: ${content}`)
        setTimeout(() => {
            setNotification("")
        }, 5000)
        e.target.reset()
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div>
                    <input name="anecdote" />
                </div>
                <button>create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm