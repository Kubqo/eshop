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
  Timestamp,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";

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

// Reviews collection
export type Tree = {
  name: string;
  description?: string;
  images: string[];
  price: string;
  time: Timestamp;
};

export const productsCollection = collection(
  db,
  "products"
) as CollectionReference<Tree>;

export const productsDocument = () =>
  doc(db, "products") as DocumentReference<Tree>;
