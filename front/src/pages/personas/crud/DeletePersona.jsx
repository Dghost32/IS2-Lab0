import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Autocomplete, Skeleton, TextField, Button } from "@mui/material";
import { deletePersona, getPersonas } from "../../../fetchers/personas";
import swal from "sweetalert";

const DeletePersona = () => {
  const QueryClient = useQueryClient();

  const personas = useQuery({
    queryKey: ["personas"],
    queryFn: getPersonas,
  });

  const del = useMutation({
    mutationFn: deletePersona,

    onSuccess: async () => {
      await swal({
        title: "Personas eliminada",
        icon: "success",
      });

      QueryClient.invalidateQueries({
        queryKey: ["personas"],
      });
    },

    onError: async () => {
      await swal({
        title: "Error al eliminar la persona",
        icon: "error",
      });
    },
  });

  if (personas.isLoading) {
    return (
      <>
        <h1 className="text-3xl font-bold mb-2">Eliminar Persona</h1>
        <Skeleton variant="rectangular" />
        <Skeleton variant="rectangular" />
      </>
    );
  }

  if (personas.isError) {
    return (
      <>
        <h1 className="text-3xl font-bold mb-2">Eliminar Persona</h1>
        <p>Error al cargar los personas</p>
      </>
    );
  }

  return (
    <>
      <h1 className="text-3xl font-bold mb-2">Eliminar Persona</h1>

      <Autocomplete
        options={personas.data}
        getOptionLabel={(option) => option?.nombre}
        value={{ nombre: "Seleccione una persona para eliminarlo" }}
        onChange={async (_, value) => {
          if (value) {
            const check = await swal({
              title: "¿Estás seguro?",
              text: `Se eliminará la persona ${value?.nombre}`,
              icon: "warning",
              buttons: true,
              dangerMode: true,
            });
            if (check) {
              del.mutate({ id: value?.id });
            }
          }
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
    </>
  );
};

export default DeletePersona;
