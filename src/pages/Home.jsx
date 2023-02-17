import React from 'react'
import { useDispatch } from 'react-redux'
import { setNameTrainerGlobal } from '../store/slices/nameTrainer.slice'

const Home = () => {

    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()
        const nameTrainer = e.target.nameTrainer.value
        dispatch(setNameTrainerGlobal(nameTrainer))

    }
    return (
        <main>
            <section>
                <div>
                    <img src="/images/pokedex.png" alt="Pokedex" />
                </div>
                <h2>Hello trainer!</h2>
                <p>Give me your name to start!</p>
                <form onSubmit={handleSubmit}>
                    <input required id='nameTrainer' placeholder='your name...' type="text" />
                    <button>Start</button>
                </form>
            </section>
        </main>
    )
}

export default Home