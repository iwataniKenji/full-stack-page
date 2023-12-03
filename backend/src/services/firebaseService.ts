import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import {
  addDoc,
  collection,
  DocumentReference,
  getDocs,
  getFirestore,
  query,
} from "firebase/firestore";
import { Artist } from "../types/Artist";
import { connectedClients } from "../index";

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
    await signInWithEmailAndPassword(auth, email, password);

    return true;
  } catch (e) {
    console.error("Erro ao autenticar usuário no firebase:", e);
    throw e;
  }
};

export const getArtistsData = async (
  listFilter?: string,
): Promise<Artist[]> => {
  try {
    const artistsCollection = collection(db, "artists");

    const artistsQuery = query(artistsCollection);
    const querySnapshot = await getDocs(artistsQuery);

    const artistsData: Artist[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();

      const artist: Artist = {
        id: doc.id,
        name: data.name,
        genre: data.genre,
      };

      artistsData.push(artist);
    });

    if (listFilter) {
      return artistsData.filter((artist) =>
        artist.name.toLowerCase().includes(listFilter?.toLowerCase()),
      );
    }

    return artistsData;
  } catch (e) {
    console.error("Erro ao obter dados dos artistas no Firebase:", e);
    throw e;
  }
};

export const createArtistData = async (
  name: string,
  genre: string,
): Promise<Artist> => {
  try {
    const artistData = { name, genre };

    const artistsCollection = collection(db, "artists");

    const newArtistRef: DocumentReference = await addDoc(
      artistsCollection,
      artistData,
    );

    // Enviar mensagem para o Websocket -> RabbitMQ
    connectedClients.forEach((client) => {
      client.send(`Artista ${name} foi criado`);
    });

    return {
      id: newArtistRef.id,
      name,
      genre,
    };
  } catch (error) {
    console.error("Erro ao criar artista no Firebase:", error);
    throw error;
  }
};
