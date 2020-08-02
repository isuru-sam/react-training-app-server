import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'



var firebaseConfig = {
    apiKey: "AIzaSyBqL53LDG7iqkBJ5XCOQzPM-Buk_elfFJk",
    authDomain: "training-app-ca560.firebaseapp.com",
    databaseURL: "https://training-app-ca560.firebaseio.com",
    projectId: "training-app-ca560",
    storageBucket: "training-app-ca560.appspot.com",
    messagingSenderId: "653515251570",
    appId: "1:653515251570:web:a2f880209d27764911c7eb"
  };
  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;
  
    const userRef = firestore.doc(`users/${userAuth.uid}`);
  
    const snapShot = await userRef.get();
  
    if (!snapShot.exists) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();
      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        });
      } catch (error) {
        console.log('error creating user', error.message);
      }
    }
  
    return userRef;
  };

export const addCollectionData=async (collectionKey,documentsToAdd)=>{
  const collectionRef=firestore.collection(collectionKey);
  const batch =firestore.batch()
  documentsToAdd.forEach(o=>{
    const newdocref = collectionRef.doc();
    batch.set(newdocref,o)
  })
 return await batch.commit()
 // console.log(collectionRef)

}
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  export const auth = firebase.auth()
  export const firestore=firebase.firestore();
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt:'select_account'})
  export const signInWithGoogle=()=>auth.signInWithPopup(provider)
  export default firebase;