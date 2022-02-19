import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: `${process.env.NEXT_PUBLIC_FIREBASE_API}`,
    authDomain: "fireship-course-dd341.firebaseapp.com",
    projectId: "fireship-course-dd341",
    storageBucket: "fireship-course-dd341.appspot.com",
    messagingSenderId: "716769751142",
    appId: "1:716769751142:web:8185bfb363e5b036e3bda7",
}
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}
console.log(process.env.FIREBASE_API)
export const fromMillis = firebase.firestore.Timestamp.fromMillis;
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp
export const STATE_CHANGED = firebase.storage.TaskEvent.STATE_CHANGED
export const increment = firebase.firestore.FieldValue.increment
//@param {string} username
export async function getUserWithUsername(username) {
    const usersRef = firestore.collection('users')
    const query = usersRef.where('username','==',username).limit(1);
    const userDoc = (await query.get()).docs[0]
    return userDoc;
}
export function postToJSON(doc) {
    const data = doc.data();
    return {
        ...data,
        createdAt: data.createdAt.toMillis(),
        updatedAt: data.updatedAt.toMillis(),
    }
}