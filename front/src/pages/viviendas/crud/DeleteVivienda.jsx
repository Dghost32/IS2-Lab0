import React from "react";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { Autocomplete, Skeleton, TextField, Button } from "@mui/material";
import swal from "sweetalert";
import { deleteVivienda, getViviendas } from "../../../fetchers/viviendas";

const DeleteVivienda = () => {
  const viviendas = useQuery({
    queryKey: ["viviendas"],
    queryFn: getViviendas,
  });

  const del = useMutation({
    mutationFn: deleteVivienda,

    onSuccess: async () => {
      await swal({
        title: "Municipio eliminado",
        icon: "success",
      });

      QueryClient.invalidateQueries({
        queryKey: ["viviendas"],
      });
    },

    onError: async () => {
      await swal({
        title: "Error al eliminar la vivienda",
        icon: "error",
      });
    },
  });

  if (viviendas.isLoading) {
    return (
      <>
        <h1 className="text-3xl font-bold mb-2">Eliminar Vivienda</h1>
        <Skeleton variant="rectangular" />
        <Skeleton variant="rectangular" />
      </>
    );
  }

  if (viviendas.isError) {
    return (
      <>
        <h1 className="text-3xl font-bold mb-2">Eliminar Vivienda</h1>
        <p>Error al cargar las viviendas</p>
      </>
    );
  }

  return (
    <>
      <h1 className="text-3xl font-bold mb-2">Eliminar Vivienda</h1>

      <Autocomplete
        options={viviendas.data}
        getOptionLabel={(option) => option?.name}
        value={{ name: "Seleccione una vivienda para eliminarlo" }}
        onChange={async (_, value) => {
          if (value) {
            const check = await swal({
              title: "¿Estás seguro?",
              text: `Se eliminará la vivienda ${value?.name}`,
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

export default DeleteVivienda;
