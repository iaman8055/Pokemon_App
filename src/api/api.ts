import axios from "axios";

const url = "https://pokeapi.co/api/v2/pokemon?limit=124";


export const fetchpokemon = async () => {
  const res = await axios.get(url);
  const data = res.data;
  console.log(data);
  const detailedData = data.results.map(async (pokedata: { url: string }) => {
    const res = await axios.get(pokedata.url);
    const data = res.data;
    return data;
  });
  const response = await Promise.all(detailedData);
  return response;
};