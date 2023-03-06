import axios from "axios";

export async function crearPersona({ nombre }) {
  return await axios.post("http://localhost:3001/personas", {
    nombre,
  });
}

export async function getPersonas() {
  const data = await axios.get("https://jsonplaceholder.typicode.com/users");
  return data.data;
}

export async function updatePersona({ id, nombre }) {
  return await axios.put(`http://localhost:3001/personas/${id}`, {
    nombre,
  });
}

export async function deletePersona({ id }) {
  return await axios.delete(`http://localhost:3001/personas/${id}`);
}
