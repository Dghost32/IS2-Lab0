import React, { useState } from "react";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { Autocomplete, Skeleton, TextField, Button } from "@mui/material";
import { deleteMunicipio, getMunicipios } from "../../../fetchers/municipios";
import swal from "sweetalert";

const DeleteMunicipio = () => {
  const municipios = useQuery({
    queryKey: ["municipios"],
    queryFn: getMunicipios,
  });

  const del = useMutation({
    mutationFn: deleteMunicipio,

    onSuccess: async () => {
      await swal({
        title: "Municipio eliminado",
        icon: "success",
      });

      QueryClient.invalidateQueries({
        queryKey: ["municipios"],
      });
    },

    onError: async () => {
      await swal({
        title: "Error al eliminar el municipio",
        icon: "error",
      });
    },
  });

  if (municipios.isLoading) {
    return (
      <>
        <h1 className="text-3xl font-bold mb-2">Eliminar Municipio</h1>
        <Skeleton variant="rectangular" />
        <Skeleton variant="rectangular" />
      </>
    );
  }

  if (municipios.isError) {
    return (
      <>
        <h1 className="text-3xl font-bold mb-2">Eliminar Municipio</h1>
        <p>Error al cargar los municipios</p>
      </>
    );
  }

  return (
    <>
      <h1 className="text-3xl font-bold mb-2">Eliminar Municipio</h1>

      <Autocomplete
        options={municipios.data}
        getOptionLabel={(option) => option?.name}
        value={{ name: "Seleccione un municipio para eliminarlo" }}
        onChange={async (_, value) => {
          if (value) {
            const check = await swal({
              title: "¿Estás seguro?",
              text: `Se eliminará el municipio ${value?.name}`,
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

export default DeleteMunicipio;
