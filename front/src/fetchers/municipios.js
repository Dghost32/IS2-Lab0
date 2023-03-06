import axios from "axios";

export async function crearMunicipio({ nombre }) {
  return await axios.post("http://localhost:4000/municipios", {
    nombre,
  });
}

export async function getMunicipios() {
  const data = await axios.get("http://localhost:4000/municipios");
  return data.data;
}

export async function updateMunicipio({ id, nombre }) {
  return await axios.put(`http://localhost:4000/municipios/${id}`, {
    nombre,
  });
}

export async function deleteMunicipio({ id }) {
  return await axios.delete(`http://localhost:4000/municipios/${id}`);
}
