import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { generarId } from "./generarId";


export const uploadImage = (imagen, storage ) => {
  const { name } = imagen;
  const nombre = name.split(".")[0] + generarId();
  const storageRef = ref(storage, `productos/${nombre}`) 
  const uploadTask = uploadBytesResumable(storageRef);
  
  uploadTask.on('state_changed',
    (snapshot) => {
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
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
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
       getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log('File available at', downloadURL)
       });
    })
};
 