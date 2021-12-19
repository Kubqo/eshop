import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut as authSignOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import {
  collection,
  CollectionReference,
  doc,
  DocumentReference,
  getFirestore,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { Tree } from "../common/types";

// Initialize Firebase
const firebaseApp = initializeApp({
  apiKey: "AIzaSyCf7911O_8uGwVpChnaobl79Tnuh6DozcA",
  authDomain: "sidikova-eshop.firebaseapp.com",
  projectId: "sidikova-eshop",
  storageBucket: "sidikova-eshop.appspot.com",
  messagingSenderId: "356592056634",
  appId: "1:356592056634:web:9b2d1224b627714e387803",
  measurementId: "G-XS4T1BNRBJ",
});

// Authentication
const auth = getAuth();

// Sign in handler
export const signIn = (email: string, password: string) =>
  signInWithEmailAndPassword(auth, email, password);

// Sign out handler
export const signOut = () => authSignOut(auth);

// Subscribe to auth state changes
export const onAuthChanged = (callback: (u: User | null) => void) =>
  onAuthStateChanged(auth, callback);

// Firestore
const db = getFirestore();

export const storage = getStorage(firebaseApp);

export const productsCollection = collection(
  db,
  "products"
) as CollectionReference<Tree>;

export const productsDocument = (id: string) =>
  doc(db, "products", id) as DocumentReference<Tree>;

export const generateId = () => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let autoId = "";
  for (let i = 0; i < 20; i++) {
    autoId += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return autoId;
};
