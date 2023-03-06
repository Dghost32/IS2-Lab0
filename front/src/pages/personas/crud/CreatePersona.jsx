import { Button, TextField } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import swal from "sweetalert";
import { crearPersona } from "../../../fetchers/personas";

const CreatePersona = () => {
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState(0);

  let QueryClient = useQueryClient();

  const create = useMutation({
    mutationFn: crearPersona,
    onSuccess: async () => {
      await swal({
        title: "Persona creada",
        text: "La persona se ha creado correctamente",
        icon: "success",
      });

      QueryClient.invalidateQueries({
        queryKey: ["personas"],
      });
    },
    onError: async (error) => {
      await swal({
        title: "Error al crear la persona",
        text: `${error}`,
        icon: "error",
      });
    },
  });

  function handleSubmit(e) {
    e.preventDefault();
    console.log(`creando municipio ${nombre}`);
    create.mutate({ nombre, edad });
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

        <label htmlFor="edad">Edad</label>
        <TextField
          name="edad"
          id="outlined-basic"
          variant="outlined"
          size="small"
          type="number"
          style={{
            margin: "0 0 1rem 0",
            width: "100%",
            fontFamily: "'Noto Sans JP', sans-serif",
          }}
          value={edad}
          onChange={(e) => setEdad(e.target.value)}
        />

        <Button disabled={!nombre} variant="contained" type="submit">
          Crear
        </Button>
      </form>
    </>
  );
};

export default CreatePersona;
