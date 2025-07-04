import { useContext, useRef } from "react"
import { FirebaseContext } from '../../firebase'
import { doc, updateDoc } from "firebase/firestore"


export const Platillo = ({platillo}) => {

  //Existencia ref para acceder al valor directamente
  const existenciaRef = useRef(platillo.existencia)

  //Context con las operaciones de firebase
  const { db } = useContext(FirebaseContext)

  const { id, nombre, categoria, imagen, precio, descripcion, existencia } = platillo 

  //Modificar el estado del platillo en firebase
  const actualizarDisponibilidad = async() => {
    const existencia = (existenciaRef.current.value === 'true') 

    try {
      const platilloRef = doc(db, "productos", id);
      await updateDoc(platilloRef, {
        existencia: existencia
      });
    } catch (error) {
      console.log(error)
    }

  }

  return (
    <div className="w-full px-3 mb-4">
      <div className="p-5 shadow-md bg-white rounded-lg">
        <div className="md:flex">
          <div className="md:w-5/12 lg:w-5/12 xl:w-3/12">
            {imagen==='' ? 
              <img src={imagen} alt="imagen platillo" />
            : <img src='https://firebasestorage.googleapis.com/v0/b/restaurantapp-927d8.firebasestorage.app/o/productos%2Fcompletoo423cmt0ny9kwm96d?alt=media&token=6c9af516-0385-4bbe-9e44-37b9b60b2c90' 
                  alt="imagen platillo" />
            }

            <div className="sm:flex sm:-mx-2 pl-2">
              <label className="block mt-5 sm:w-2/4">
                <span className="block text-gray-800 mb-2">Existencia: {' '}</span>

                <select 
                  className="shadow appearance-none border rounded text-center w-full leading-tight focus:outline-none focus:shadow-current py-0.5"
                  value={existencia}
                  ref={existenciaRef}
                  onChange={() => actualizarDisponibilidad()}
                >
                  <option value="true">Disponible</option>
                  <option value="false">No Disponible</option>
                </select>
              </label>
            </div>
          </div>
          <div className="md:w-7/12 lg:w-7/12 xl:w-9/12 md:pl-5">
            <p className="font-bold text-2xl text-yellow-600 mb-3">
              {nombre}
            </p>
            <p className="text-gray-600 mb-2 ">
              Categoria:{' '} 
              <span className="text-gray-700 font-bold">
                {categoria.toUpperCase()}
              </span>
            </p>
             <p className="text-gray-600 mb-2">
              {descripcion}
             </p>
             <p className="text-gray-600 mb-2">
              Precio:{' '} 
              <span className="text-gray-700 font-bold">
                $ {precio}
              </span>
            </p>

          </div>
        </div>
      </div>
    </div>
  )
}
