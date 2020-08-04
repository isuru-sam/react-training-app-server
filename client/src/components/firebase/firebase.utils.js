import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'



var firebaseConfig = {
  apiKey: "AIzaSyBzqdMQtbEYPHN6-Q1HjWBY7yr2p1c4PfI",
  authDomain: "a2ztechacademy-63ad8.firebaseapp.com",
  databaseURL: "https://a2ztechacademy-63ad8.firebaseio.com",
  projectId: "a2ztechacademy-63ad8",
  storageBucket: "a2ztechacademy-63ad8.appspot.com",
  messagingSenderId: "558078967609",
  appId: "1:558078967609:web:6365740c23e4d0560732e8",
  measurementId: "G-FRS1B5W0DS"
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