import { useContext, useEffect, useState } from "react"
import { FirebaseContext } from '../../firebase'
import { collection, onSnapshot, query, where } from "firebase/firestore"
import { Orden } from "../ui/Orden"


export const Ordenes = () => {

  //context de firebase
  const {db} = useContext(FirebaseContext)
  const [ ordenes, setOrdenes ] = useState([])
  //consultar la BD al cargar
  useEffect(() => {
    const ObtenerOrdenes = () => {
      const querySnapshot =  query(collection(db, "Ordenes"), where('completado', '==', false) )
      onSnapshot(querySnapshot, manejarSnapshot)
    }
    ObtenerOrdenes()
  }, [])

  //snapshot nos permite escuchar los cambios en tiempo real
  function manejarSnapshot(snapshot) {
    const ordenes = snapshot.docs.map(doc => {
      return {
        id: doc.id,
        ...doc.data()
      }
    })
    setOrdenes(ordenes)
  }

  return (
    <div>
      <h1 className="text-3xl font-light mb-4">Ordenes</h1>

      <div className="sm:flex sm:flex-wrap -mx-3">
        {ordenes.map(orden => (
          <Orden
            key={orden.id}
            orden={orden}
          />
        ))} 
      </div>
      
    </div>
  )
}
