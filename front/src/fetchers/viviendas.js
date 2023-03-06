import axios from "axios";

export async function crearVivienda({ direccion, idMunicipio }) {
  return await axios.post("http://localhost:4000/viviendas", {
    direccion,
    idMunicipio,
  });
}

export async function getViviendas() {
  const data = await axios.get("http://localhost:4000/viviendas");
  return data.data;
}

export async function updateVivienda({ id, nombre }) {
  return await axios.put(`http://localhost:4000/viviendas/${id}`, {
    nombre,
  });
}

export async function deleteVivienda({ id }) {
  return await axios.delete(`http://localhost:4000/viviendas/${id}`);
}
