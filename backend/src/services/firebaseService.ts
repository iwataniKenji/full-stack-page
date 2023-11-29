import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Artist } from "../types/Artist";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

export const authenticateUser = async (
  email: string,
  password: string,
): Promise<boolean> => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );

    return true;
  } catch (e) {
    console.error("Erro ao autenticar usuário no firebase:", e);
    throw e;
  }
};

export const getArtistsData = async (): Promise<Artist[]> => {
  try {
    return [
      {
        id: "123",
        name: "BB King",
        genre: "Blues",
      },
    ];
  } catch (e) {
    console.error("Erro ao obter dados dos artistas no Firebase:", e);
    throw e;
  }
};

export const createArtistData = async (
  name: string,
  genre: string,
): Promise<void> => {
  try {
    const artistData = {
      name,
      genre,
    };

    const newArtistRef = doc(db, "artists");

    await setDoc(newArtistRef, artistData);
  } catch (error) {
    console.error("Erro ao criar artista no Firebase:", error);
    throw error;
  }
};
