//utils
import type { GetImageUrl } from "@/types/utils";

export const getImageUrl: GetImageUrl = (id) => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
};

export const checkUser = () => {
  let isSessionExist = false;

  if (
    localStorage.getItem("user_pokedox") &&
    localStorage.getItem("timestamp_pokedox")
  ) {
    const timestamp = localStorage.getItem("timestamp_pokedox");
    const now = new Date().getTime();
    const diff = now - parseInt(timestamp as string);
    const diffMinutes = Math.floor(diff / 60000);
    if (diffMinutes > 60) {
      isSessionExist = false;
    } else {
      isSessionExist = true;
    }
  } else {
    isSessionExist = false;
  }

  if (!isSessionExist) {
    localStorage.removeItem("user_pokedox");
    localStorage.removeItem("timestamp_pokedox");
  }

  return isSessionExist;
};
