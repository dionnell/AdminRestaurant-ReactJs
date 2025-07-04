import { useContext, useEffect, useState } from 'react'
import { collection, addDoc } from 'firebase/firestore'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { FirebaseContext } from '../../firebase'
import { useNavigate } from 'react-router'
import { generarId } from '../helper/generarId'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'


export const NuevoPlatillo = () => {

  //Context con las operaciones de firebase
  const { db, storage } = useContext(FirebaseContext)

  //state para almacenar la url de la imagen
  const [imagen, setImagen] = useState(null)

  //hook para redireccionar
  const navigate = useNavigate()

  const handleChangeImage = (e) => {
    if(e.target.files){
      //const selectedFile = e.target.files[0]
      setImagen(e.target.files[0])      
    } 
  } 

  useEffect(() => {
    setTimeout(console.log(imagen),1000)
  }, [imagen])


  //validacion y leer los datos del formulario
  const formik = useFormik({
    initialValues:{
      nombre: '',
      precio: '',
      categoria: '',
      imagen: '',
      descripcion: ''
    },
    validationSchema: Yup.object({
      nombre: Yup.string()
                  .min(3, 'El Nombre debe tener al menos 3 caracteres')
                  .required('El monbre debe ser obligatorio'),
      precio: Yup.number()
                  .min(3, 'El Precio debe tener al menos 3 caracteres')
                  .required('El Precio debe ser obligatorio')
                  .positive('El precio no puedes ser negativo')
                  .typeError('El precio debe ser un numero'),
      categoria: Yup.string()
                  .required('la categoria es obligatoria')
                  .oneOf(['desayuno', 'comida', 'cena', 'bebidas', 'postre', 'ensalada'], 'Categoria no valida'),
      descripcion: Yup.string()
              .min(10, 'la descripcion debe ser mas larga')
              .required('la descripcion es obligatoria'),
    }),
    onSubmit: async (platillo) => {
      try {
        //subir la imagen a fireStorage
        const storageRef = ref(storage, 'productos/' + platillo.nombre + generarId() );
        const uploadTask  = uploadBytesResumable(storageRef, imagen);
        
        uploadTask.on('state_changed', 
          (snapshot) => {
    
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused');
                break;
              case 'running':
                console.log('Upload is running');
                break;
            }
          }, 
          (error) => {
            // Handle unsuccessful uploads
          }, 
          () => {
            //conseguir la url de la imagen
            getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
              //Guardar datos en Firebase
              platillo.imagen = downloadURL
              platillo.existencia = true
              const docRef = await addDoc(collection(db, 'productos'), platillo)
              console.log("Documento escrito con ID: ", docRef.id)
              navigate('/menu')
            });
          }
        );

      } catch (error) {
        console.log(error)
      }
    }
  })

  return (
    <>
      <h1 className="text-3xl font-light mb-4">
        Agregar Platillo
      </h1>

      <div className="flex justify-center mt-10">
        <div className="w-full max-w-2xl">
          
          <form onSubmit={formik.handleSubmit}>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
                Nombre: 
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                type="text" 
                id="nombre"
                placeholder="Nombre del platillo"
                value={formik.values.nombre}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            { formik.touched.nombre && formik.errors.nombre ? (
              <div className='text-xs bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5' role='alert'>
                <p className='font-bold'>Hubo un error:</p>
                <p>{formik.errors.nombre}</p>
              </div>
            ): null}

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="precio">
                Precio: 
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                type="number" 
                id="precio"
                placeholder="$20"
                min='0'
                value={formik.values.precio}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            { formik.touched.precio && formik.errors.precio ? (
              <div className='text-xs bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5' role='alert'>
                <p className='font-bold'>Hubo un error:</p>
                <p>{formik.errors.precio}</p>
              </div>
            ): null}

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="categoria">
                Categoria: 
              </label>
              <select
                className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                id="categoria"
                name="categoria"
                value={formik.values.categoria}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="">-- Seleccione --</option>
                <option value="desayuno">Desayuno</option>
                <option value="comida">Comida</option>
                <option value="cena">Cena</option>
                <option value="bebidas">Bebidas</option>
                <option value="postre">Postre</option>
                <option value="ensalada">Ensalada</option>
              </select>
            </div>
            { formik.touched.categoria && formik.errors.categoria ? (
              <div className='text-xs bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5' role='alert'>
                <p className='font-bold'>Hubo un error:</p>
                <p>{formik.errors.categoria}</p>
              </div>
            ): null}

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="imagen">
                Imagen: 
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                type="file" 
                id="imagen"
                name='imagen'
                accept='image/webp,image/png,image/jpg,image/avif,image/jpeg'
                onChange={handleChangeImage}
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="descripcion">
                Descripcion: 
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-40" 
                id="descripcion"
                placeholder="Descripcion del platillo"
                value={formik.values.descripcion}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              ></textarea>
            </div>
            { formik.touched.descripcion && formik.errors.descripcion ? (
              <div className='text-xs bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5' role='alert'>
                <p className='font-bold'>Hubo un error:</p>
                <p>{formik.errors.descripcion}</p>
              </div>
            ): null}

            <input 
              type="submit" 
              className="bg-gray-800 hover:bg-gray-900 w-full mt-5 p-2 text-white uppercase font-bold rounded-2xl"
              value="Agregar Platillo" 
            />

          </form>

        </div>
      </div>
    </>
  )
}
