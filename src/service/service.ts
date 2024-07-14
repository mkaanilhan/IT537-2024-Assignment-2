import type { GetPokemons, GetPokemon } from "@/types/service";
import { app } from "@/config/firebase";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { message } from "ant-design-vue";
import _ from "lodash";
import router from "@/router";

//----------------------------------------------------------------

const API_URL_POKEMONS = "https://pokeapi.co/api/v2/pokemon?limit=100&offset=";

export const getPokemons: GetPokemons = async (url = "100", options) => {
  const response = await fetch(API_URL_POKEMONS + url, options);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};

//----------------------------------------------------------------

const API_URL_POKEMON = "https://pokeapi.co/api/v2/pokemon/";

export const getPokemon: GetPokemon = async (url) => {
  const response = await fetch(API_URL_POKEMON + url);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};
//----------------------------------------------------------------

export const registerUser = async (email: string, password: string) => {
  try {
    const auth = getAuth(app);
    const db = getFirestore(app);
    await createUserWithEmailAndPassword(auth, email, password);

    router.push("/login");
    message.success("User registered successfully ! Please login");
  } catch (error) {
    message.error("There was an error registering the user ! Please try again");
  }
};

//----------------------------------------------------------------

export const loginUser = async (email: string, password: string) => {
  const auth = getAuth(app);

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log(userCredential);
    const timestamp = new Date().getTime();
    const result = { user: userCredential.user, timestamp };
    const setLocalStorage = () => {
      localStorage.setItem("user_pokedox", JSON.stringify(userCredential.user));
      localStorage.setItem("timestamp_pokedox", JSON.stringify(timestamp));
    };

    setLocalStorage();

    message.success("Login successful ! Redirecting to home page...");
    _.delay(() => (window.location.href = "/"), 3000);

    return result;
  } catch (error) {
    message.error("Invalid email or password");
  }
};

//----------------------------------------------------------------

export const logOutUser = async () => {
  await signOut(getAuth(app));
  localStorage.removeItem("user_pokedox");
  localStorage.removeItem("timestamp_pokedox");
  window.location.href = "/";
};
