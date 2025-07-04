import { Link } from 'react-router'
import { useEffect, useState, useContext } from 'react'
import { FirebaseContext } from '../../firebase'
import { collection, getDocs, onSnapshot } from 'firebase/firestore'
import { Platillo } from '../ui/Platillo'

export const Menu = () => {
  const {db, storage} = useContext(FirebaseContext)
  const [ platillos, setPlatillos ] = useState([])
  
  //consultar la BD al cargar
  useEffect(() => {
    const ObtenerPlatillos = () => {
      const querySnapshot =  collection(db, "productos")
      onSnapshot(querySnapshot, manejarSnapshot)
    }
    ObtenerPlatillos()
  }, [])
  
  //snapshot nos permite escuchar los cambios en tiempo real
  function manejarSnapshot(snapshot) {
    const platillos = snapshot.docs.map(doc => {
      return {
        id: doc.id,
        ...doc.data()
      }
    })
    setPlatillos(platillos)
  }

  return (
    <>
      <h1 className="text-3xl font-light mb-4">Menu</h1>

      <Link 
        to='/nuevo-platillo'
        className='bg-blue-800 hover:bg-blue-700, inline-block mb-5 py-1.5 px-1.5 text-white uppercase font-bold rounded-2xl shadow-2xl shadow-blue-300'
      >
        Agregar Platillo
      </Link>

      {platillos.map(platillo => (
        <Platillo
          key={platillo.id}
          platillo={platillo}
        />
      ))}
    </>
  )
}
