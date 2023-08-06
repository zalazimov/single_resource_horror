import axios from "axios";
const API = process.env.REACT_APP_API_URL2;
const API2 = process.env.REACT_APP_API_URL;

export async function fetchMoviesData() {
  try {
    const result = await axios.get(API);
    return result;
  } catch (e) {
    console.log(e);
  }
}

export async function fetchMovieById(id) {
  try {
    const result = await axios.get(`${API2}/movies/card/${id}`);
    return result;
  } catch (e) {
    console.log(e);
  }
}

export async function fetchMovieByTitle(title) {
  try {
    const result = await axios.get(`${API2}/movies`, {
      params: { title: title },
    });
    return result;
  } catch (e) {
    console.log(e);
  }
}

export async function fetchBySubstring(title) {
  try {
    const result = await axios.get(`${API2}/movies/search`, {
      params: { title: title },
    });
    return result;
  } catch (e) {
    console.log(e);
  }
}

export async function newEntry(entry) {
  try {
    const result = await axios.post(`${API2}/movies`, entry);
    return result;
  } catch (e) {
    console.log(e);
  }
}
