import { Autocomplete, Button, TextField } from "@mui/material";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import swal from "sweetalert";
import { getMunicipios } from "../../../fetchers/municipios";
import { crearVivienda } from "../../../fetchers/viviendas";

const CreateVivienda = () => {
  const [address, setAddress] = useState("");
  const [municipio, setMunicipio] = useState({});

  const municipios = useQuery({
    queryKey: ["municipios"],
    queryFn: getMunicipios,
  });

  const crear = useMutation({
    mutationFn: crearVivienda,
    onSuccess: async () => {
      await swal({
        title: "Vivienda creada",
        text: "La vivienda se ha creado correctamente",
        icon: "success",
      });

      QueryClient.invalidateQueries({
        queryKey: ["viviendas"],
      });
    },
    onError: async (error) => {
      await swal({
        title: "Error al crear la vivienda",
        text: `${error}`,
        icon: "error",
      });
    },
  });

  function handleSubmit(e) {
    e.preventDefault();
    console.log(`creando vivienda ${address}`);
    crear.mutate({ address, idMunicipio: municipio.id });
  }

  return (
    <>
      <h1 className="text-3xl font-bold mb-2">Crear Vivienda</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="municipio">Municipio</label>
        <Autocomplete
          options={municipios.data}
          className="mb-3"
          name="municipio"
          getOptionLabel={(option) => option?.name}
          value={municipio.name}
          onChange={(_, value) => {
            if (value) setMunicipio(value);
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

        <label htmlFor="address">Dirección</label>
        <TextField
          name="address"
          id="outlined-basic"
          variant="outlined"
          size="small"
          style={{
            margin: "0 0 1rem 0",
            width: "100%",
            fontFamily: "'Noto Sans JP', sans-serif",
          }}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <Button
          disabled={!address}
          className="mt-3"
          variant="contained"
          type="submit"
        >
          Crear
        </Button>
      </form>
    </>
  );
};

export default CreateVivienda;
