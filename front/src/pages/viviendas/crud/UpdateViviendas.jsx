import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Autocomplete, Skeleton, TextField, Button } from "@mui/material";
import { getViviendas, updateVivienda } from "../../../fetchers/viviendas";
import swal from "sweetalert";
import { getMunicipios } from "../../../fetchers/municipios";

const UpdateVivienda = () => {
  const [newAddress, setNewAddress] = useState("");
  const [municipio, setMunicipio] = useState({});
  const [vivienda, setVivienda] = useState();

  const QueryClient = useQueryClient();

  const viviendas = useQuery({
    queryKey: ["viviendas"],
    queryFn: getViviendas,
  });

  const municipios = useQuery({
    queryKey: ["municipios"],
    queryFn: getMunicipios,
  });

  const update = useMutation({
    mutationFn: updateVivienda,

    onSuccess: async () => {
      setVivienda(null);
      setNewAddress("");
      await swal({
        title: "vivienda actualizada",
        icon: "success",
      });

      QueryClient.invalidateQueries({
        queryKey: ["viviendas"],
      });
    },

    onError: async () => {
      await swal({
        title: "Error al actualizar la vivienda",
        icon: "error",
      });
    },
  });

  useEffect(() => {
    setNewAddress(vivienda?.direccion);
  }, [vivienda]);

  if (viviendas.isLoading) {
    return (
      <>
        <h1 className="text-3xl font-bold mb-2">Actualizar Viviendas</h1>
        <Skeleton variant="rectangular" />
        <Skeleton variant="rectangular" />
      </>
    );
  }

  if (viviendas.isError) {
    return (
      <>
        <h1 className="text-3xl font-bold mb-2">Actualizar Viviendas</h1>
        <p>Error al cargar las viviendas</p>
      </>
    );
  }

  return (
    <>
      <h1 className="text-3xl font-bold mb-2">Actualizar Viviendas</h1>

      <Autocomplete
        options={viviendas.data}
        getOptionLabel={(option) =>
          `${option?.direccion} - ${option.municipio}`
        }
        value={vivienda}
        onChange={(_, value) => {
          setVivienda(value);
          setNewAddress(value?.nombre);
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

      {vivienda && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            update.mutate({
              id: vivienda?.id,
              direccion: newAddress,
              idMunicipio: municipio?.id,
            });
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
            className="mb-2"
            style={{
              width: "100%",
              fontFamily: "'Noto Sans JP', sans-serif",
            }}
            value={vivienda?.id}
          />

          <label htmlFor="municipio">Municipio</label>
          <Autocomplete
            name="municipio"
            options={municipios.data}
            className="mb-2"
            getOptionLabel={(option) => option?.nombre || ""}
            value={municipio}
            onChange={(_, value) => {
              setMunicipio(value);
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
            defaultValue={vivienda?.name}
            className="mb-2"
            size="small"
            style={{
              margin: "0 0 1rem 0",
              width: "100%",
              fontFamily: "'Noto Sans JP', sans-serif",
            }}
            value={newAddress}
            onChange={(e) => setNewAddress(e.target.value)}
          />
          <Button
            disabled={!newAddress || vivienda?.name === newAddress}
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

export default UpdateVivienda;
