import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Autocomplete, Skeleton, TextField, Button } from "@mui/material";
import swal from "sweetalert";
import { getPersonas, updatePersona } from "../../../fetchers/personas";

const UpdatePersona = () => {
  const [persona, setPersona] = useState();
  const [newName, setNewName] = useState("");
  const [newEdad, setNewEdad] = useState(0);

  const QueryClient = useQueryClient();

  useEffect(() => {
    if (persona) {
      setNewName(persona.nombre);
      setNewEdad(persona.edad);
    }
  }, [persona]);

  const personas = useQuery({
    queryKey: ["personas"],
    queryFn: getPersonas,
  });

  const update = useMutation({
    mutationFn: updatePersona,

    onSuccess: async () => {
      setPersona(null);
      setNewName("");
      await swal({
        title: "persona actualizada",
        icon: "success",
      });

      QueryClient.invalidateQueries({
        queryKey: ["personas"],
      });
    },

    onError: async () => {
      await swal({
        title: "Error al actualizar a la persona",
        icon: "error",
      });
    },
  });

  if (personas.isLoading) {
    return (
      <>
        <h1 className="text-3xl font-bold mb-2">Actualizar Persona</h1>
        <Skeleton variant="rectangular" />
        <Skeleton variant="rectangular" />
      </>
    );
  }

  if (personas.isError) {
    return (
      <>
        <h1 className="text-3xl font-bold mb-2">Actualizar Persona</h1>
        <p>Error al cargar los personas</p>
      </>
    );
  }

  return (
    <>
      <h1 className="text-3xl font-bold mb-2">Actualizar Persona</h1>

      <Autocomplete
        options={personas.data}
        getOptionLabel={(option) => option?.nombre}
        value={persona}
        onChange={(_, value) => {
          setPersona(value);
          setNewName(value?.nombre);
        }}
        noOptionsText="Sin resultados"
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            size="small"
            style={{
              width: "100%",
              fontFamily: "'Noto Sans JP', sans-serif",
            }}
          />
        )}
      />

      {persona && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            update.mutate({ id: persona?.id, nombre: newName, edad: newEdad });
          }}
          className="mt-5"
        >
          <label htmlFor="id">Id</label>
          <TextField
            name="id"
            disabled={true}
            id="outlined-basic"
            variant="outlined"
            size="small"
            style={{
              margin: "0 0 1rem 0",
              width: "100%",
              fontFamily: "'Noto Sans JP', sans-serif",
            }}
            value={persona?.id}
          />

          <label htmlFor="name">Nombre</label>
          <TextField
            name="name"
            id="outlined-basic"
            variant="outlined"
            size="small"
            style={{
              margin: "0 0 1rem 0",
              width: "100%",
              fontFamily: "'Noto Sans JP', sans-serif",
            }}
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />

          <label htmlFor="edad">Edad</label>
          <TextField
            name="edad"
            id="outlined-basic"
            type="number"
            variant="outlined"
            size="small"
            style={{
              margin: "0 0 1rem 0",
              width: "100%",
              fontFamily: "'Noto Sans JP', sans-serif",
            }}
            value={newEdad}
            onChange={(e) => setNewEdad(e.target.value)}
          />

          <Button
            disabled={!newName || persona?.name === newName}
            variant="contained"
            type="submit"
          >
            Actualizar
          </Button>
        </form>
      )}
    </>
  );
};

export default UpdatePersona;
