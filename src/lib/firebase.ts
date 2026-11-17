import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Firebase configuration for Polyhedrom
const firebaseConfig = {
  apiKey: 'AIzaSyCXVRMuHG6dtNMqp4sruHlUHm6e0QbRXgI',
  authDomain: 'polyhedrom-x81.firebaseapp.com',
  projectId: 'polyhedrom-x81',
  storageBucket: 'polyhedrom-x81.firebasestorage.app',
  messagingSenderId: '2509667756',
  appId: '1:2509667756:web:095bf03b65fa644ccdce09',
  measurementId: 'G-T60DG4DXBD',
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;
