import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC3Nj38FEmJwi33QwiA7k8I9sJcZJ0C4Ko",
  authDomain: "crw-clothing-db-4c8c2.firebaseapp.com",
  projectId: "crw-clothing-db-4c8c2",
  storageBucket: "crw-clothing-db-4c8c2.appspot.com",
  messagingSenderId: "224033694246",
  appId: "1:224033694246:web:485c991c6f66d3b9effce7",
};

export const createUserProfileDocument = async (userAuth, addData) => {
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
            ...addData
        })
    } catch (error) {
        console.log('error creating user', error.message)
    }
  }

  return userRef
};

export const addCollectionAndDocuments = async (collectionKey, objects) => {
  const collectionRef = firestore.collection(collectionKey);

  const batch = firestore.batch();
  objects.forEach((obj) => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
};

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollections = collections.docs.map(doc => {
    const { title, items } = doc.data()

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    }
  })
  return transformedCollections.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection
    return accumulator
  }, {})
}

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();


const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
