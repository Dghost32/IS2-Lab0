import axios from "axios";

export async function crearVivienda({ address, idMunicipio }) {
  return await axios.post("http://localhost:3001/viviendas", {
    address,
    idMunicipio,
  });
}

export async function getViviendas() {
  const data = await axios.get("https://jsonplaceholder.typicode.com/users");
  return data.data;
}

export async function updateVivienda({ id, nombre }) {
  return await axios.put(`http://localhost:3001/viviendas/${id}`, {
    nombre,
  });
}

export async function deleteVivienda({ id }) {
  return await axios.delete(`http://localhost:3001/viviendas/${id}`);
}
