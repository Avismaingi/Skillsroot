import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import { firebaseConfig } from "./firebaseConfig";

const app = firebase.initializeApp(firebaseConfig);

const firestore = app.firestore();
export const database = {
  formatDocument: (doc) => ({ id: doc.id, ...doc.data() }),
  getCurrentTimestamp: firebase.firestore.FieldValue.serverTimestamp,
  // files: (userId) => firestore.collection("gd").doc(userId).collection("files"),
  // materials: () => firestore.collection("gc-materials"),
  todos: () => firestore.collection("todos"),
  users: () => firestore.collection("users"),
  ideas: () => firestore.collection("ideas"),
  resources: () => firestore.collection("resources"),
  workshop: () => firestore.collection("workshop"),
  loans: () => firestore.collection("loans"),
  register: () => firestore.collection("register"),
};

export const auth = app.auth();
export const storage = app.storage();
export default app;
