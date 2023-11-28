import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore";
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
  username: string,
  password: string,
): Promise<boolean> => {
  try {
    const userDoc = await getDoc(doc(db, "users", username));

    const userExists = userDoc.exists();
    const passwordMatches = userDoc.data()?.password === password;

    return userExists && passwordMatches;
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
        name: "Teste",
        imageUrl:
          "https://upload.wikimedia.org/wikipedia/pt/2/27/Bliss_%28Windows_XP%29.png",
      },
    ];
  } catch (e) {
    console.error("Erro ao obter dados dos artistas no Firebase:", e);
    throw e;
  }
};
