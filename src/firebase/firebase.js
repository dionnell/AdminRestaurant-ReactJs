import { initializeApp } from "firebase/app"
import { getFirestore } from 'firebase/firestore'
import { getStorage } from "firebase/storage"
import {firebaseConfig} from './config'

const firebase = initializeApp(firebaseConfig)
export const db = getFirestore(firebase)
export const storage = getStorage(firebase)