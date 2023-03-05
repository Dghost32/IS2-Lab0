import React, { useState } from "react";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { Autocomplete, Skeleton, TextField, Button } from "@mui/material";
import { getMunicipios, updateMunicipio } from "../../../fetchers/municipios";
import swal from "sweetalert";

const UpdateMunicipio = () => {
  const [newName, setNewName] = useState("");
  const [municipio, setMunicipio] = useState();

  const municipios = useQuery({
    queryKey: ["municipios"],
    queryFn: getMunicipios,
  });

  const update = useMutation({
    mutationFn: updateMunicipio,

    onSuccess: async () => {
      setMunicipio(null);
      setNewName("");
      await swal({
        title: "Municipio actualizado",
        icon: "success",
      });

      QueryClient.invalidateQueries({
        queryKey: ["municipios"],
      });
    },

    onError: async () => {
      await swal({
        title: "Error al actualizar el municipio",
        icon: "error",
      });
    },
  });

  if (municipios.isLoading) {
    return (
      <>
        <h1 className="text-3xl font-bold mb-2">Actualizar Municipio</h1>
        <Skeleton variant="rectangular" />
        <Skeleton variant="rectangular" />
      </>
    );
  }

  if (municipios.isError) {
    return (
      <>
        <h1 className="text-3xl font-bold mb-2">Actualizar Municipio</h1>
        <p>Error al cargar los municipios</p>
      </>
    );
  }

  return (
    <>
      <h1 className="text-3xl font-bold mb-2">Actualizar Municipio</h1>

      <Autocomplete
        options={municipios.data}
        getOptionLabel={(option) => option?.name}
        value={municipio}
        onChange={(_, value) => {
          setMunicipio(value);
          setNewName(value?.name);
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

      {municipio && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            update.mutate({ id: municipio?.id, nombre: newName });
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
            value={municipio?.id}
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
          <Button disabled={!newName || municipio?.name === newName} variant="contained" type="submit">
            Actualizar
          </Button>
        </form>
      )}
    </>
  );
};

export default UpdateMunicipio;
