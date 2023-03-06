import axios from "axios";

export async function crearPersona({ nombre, edad, isCabeza, personaACargo }) {
  return await axios.post("http://localhost:4000/personas", {
    nombre,
    edad,
    isCabeza,
    personaACargo,
  });
}

export async function getPersonas() {
  const data = await axios.get("http://localhost:4000/personas");
  return data.data;
}

export async function updatePersona({ id, nombre, edad }) {
  return await axios.put(`http://localhost:4000/personas/${id}`, {
    nombre,
    edad,
  });
}

export async function deletePersona({ id }) {
  return await axios.delete(`http://localhost:4000/personas/${id}`);
}
