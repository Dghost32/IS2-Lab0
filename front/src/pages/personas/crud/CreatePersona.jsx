import { Button, TextField } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import swal from "sweetalert";
import { crearMunicipio } from "../../../fetchers/municipios";

const CreatePersona = () => {
  const [nombre, setNombre] = useState("");

  const mutation = useMutation({
    mutationFn: crearMunicipio,
    onSuccess: async () => {
      await swal({
        title: "Municipio creado",
        text: "El municipio se ha creado correctamente",
        icon: "success",
      });
    },
    onError: async (error) => {
      await swal({
        title: "Error al crear el municipio",
        text: `${error}`,
        icon: "error",
      });
    },
  });

  function handleSubmit(e) {
    e.preventDefault();
    console.log(`creando municipio ${nombre}`);
    mutation.mutate({ nombre });
  }

  return (
    <>
      <h1 className="text-3xl font-bold mb-2">Crear Persona</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="nombre">Nombre</label>
        <TextField
          name="nombre"
          id="outlined-basic"
          variant="outlined"
          size="small"
          style={{
            margin: "0 0 1rem 0",
            width: "100%",
            fontFamily: "'Noto Sans JP', sans-serif",
          }}
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <Button disabled={!nombre} variant="contained" type="submit">
          Crear
        </Button>
      </form>
    </>
  );
};

export default CreatePersona;
