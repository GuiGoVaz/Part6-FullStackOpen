import { create } from 'zustand'
import { useShallow } from "zustand/react/shallow"

const useCounterStore = create(set => ({

    //const increaseByOne = (set, obj) => () => set(obj + 1)
    good: 0,
    neutral: 0,
    bad: 0,
    actions: {
        incrementG: () => set(state => ({ good: state.good + 1 })),
        incrementN: () => set(state => ({ neutral: state.neutral + 1 })),
        incrementB: () => set(state => ({ bad: state.bad + 1 })),
    }
}))

// the hook functions that are used elsewhere in app
export const useValues = () => useCounterStore(
    useShallow((state) => ({
        good: state.good,
        neutral: state.neutral,
        bad: state.bad
    })));

export const useIncrementControls = () => useCounterStore(state => state.actions)