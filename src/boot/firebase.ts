import { defineBoot } from "#q-app/wrappers";
import { FirebaseApp, initializeApp } from "firebase/app";

declare module "vue" {
  interface ComponentCustomProperties {
    $firebase: FirebaseApp;
  }
}

export default defineBoot(({ app }) => {
  const firebaseConfig = {
    apiKey: "AIzaSyDyzniys5CJeomXksryliCQThjBvhKtANg",
    authDomain: "polyhedrom.firebaseapp.com",
    databaseURL: "https://polyhedrom-default-rtdb.firebaseio.com",
    projectId: "polyhedrom",
    storageBucket: "polyhedrom.firebasestorage.app",
    messagingSenderId: "968289266867",
    appId: "1:968289266867:web:03ca28dd58b8254da554c6",
  };

  const firebase = initializeApp(firebaseConfig);
  app.config.globalProperties.$firebase = firebase;
});
