import React, { useContext, useEffect, useState } from 'react'
import { FirebaseContext } from '../../firebase'
import { doc, updateDoc } from 'firebase/firestore'

export const Orden = ({orden}) => {

    const [tiemporEntrega, setTiemporEntrega] = useState(0)
    const {db} = useContext(FirebaseContext)

    //Formatear hora de la orden
    const hora = new Date(orden.creado).toLocaleTimeString('en-US');


    //Define el tiempo de entrega en tiempo real
    const definirTiempo = async(id) => {
        try {
            const ordenRef = doc(db, 'Ordenes', id)
            await updateDoc(ordenRef, {
                tiempoentrega: tiemporEntrega
            })
        } catch (error) {
            console.log(error)
        }
    }

    //Completar orden
    const completarOrden = async(id) => {
        try {
          const platilloRef = doc(db, "Ordenes", id);
          await updateDoc(platilloRef, {
            completado: true
          });
        } catch (error) {
          console.log(error)
        }
    }

  return (
    <div className='sm:w-1/2 lg:w-1/3 px-2 mb-4'>
        <div className='p-3 shadow-md bg-white'>
            <h1 className='text-yellow-600 text-lg font-bold'>
                {orden.id}
            </h1>
            <p className='text-gray-700 text-sm font-bold'>
                Hora Pedido: {hora}
            </p>
            {orden.orden.map(platillos => (
                <p className='text-gray-600'>{platillos.cantidad} {platillos.nombre}</p>
            ))}

            <p className='text-gray-700 font-bold'>Total a Pagar: ${orden.total}</p>

            {orden.tiempoentrega > 0 && (
                <p className='text-gray-700'> Tiempo Entrega: 
                    <span className='font-bold'> {orden.tiempoentrega} Min</span>
                </p>
            )}
            
            <div className='mb-4'>
                <label className='block text-gray-700 text-sm font-bold mb-2'>
                    {orden.tiempoentrega === 0 ? 'Tiempo de Entrega' : 'Actualizar Tiempo de Entrega'}
                </label>
                <input 
                    type="number" 
                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-0 focus:shadow-2xs'
                    min='1'
                    max='30'
                    placeholder='15'
                    value={tiemporEntrega}
                    onChange={e => setTiemporEntrega(parseInt(e.target.value))}
                />
                <button 
                    type="submit"
                    onClick={() => definirTiempo(orden.id)}
                    className='bg-gray-800 hover:bg-gray-900 w-full mt-5 p-2 text-white uppercase font-bold rounded-2xl'
                >
                    Definir Tiempo
                </button>
            </div>

            {!orden.completado && orden.tiempoentrega > 0 && (
                <button 
                    type="button"
                    className='bg-blue-800 hover:bg-blue-700 w-full mt-2 p-2 text-white uppercase font-bold rounded-2xl'
                    onClick={() => completarOrden(orden.id)}
                >
                    Marcar como Lista
                </button>
            )}
        </div>
    </div>
  )
}
