import './App.css'
import { AppRouter } from './router/AppRouter.jsx'
import { FirebaseContext, db, storage } from './firebase'

function App() {

  return (
    <FirebaseContext.Provider value={{db, storage}}>
        <AppRouter/>
    </FirebaseContext.Provider>
  )
}

export default App
