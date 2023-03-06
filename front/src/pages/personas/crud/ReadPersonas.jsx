import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { MDBDataTable } from "mdbreact";
import { getMunicipios } from "../../../fetchers/municipios";
import { municipios_cols } from "../../../shared/data/columns";
import { Skeleton } from "@mui/material";

const ReadPersonas = () => {
  const [columns, setColumns] = useState([]);
  const municipios = useQuery({
    queryKey: ["municipios"],
    queryFn: getMunicipios,
  });

  useEffect(() => {
    setColumns(municipios_cols);
  }, []);

  if (municipios.isLoading) {
    return (
      <>
        <h1 className="text-3xl font-bold mb-2">Ver Personas</h1>
        <Skeleton variant="rectangular" />
        <Skeleton variant="rectangular" />
        <Skeleton variant="rectangular" />
        <Skeleton variant="rectangular" />
        <Skeleton variant="rectangular" />
      </>
    );
  }

  if (municipios.isError) {
    return (
      <>
        <h1 className="text-3xl font-bold mb-2">Ver Personas</h1>
        <p>Error: {municipios.error.message}</p>
      </>
    );
  }

  return (
    <>
      <h1 className="text-3xl font-bold mb-2">Ver Personas</h1>
      <MDBDataTable
        small
        responsive
        searchtop="true"
        striped
        searchbottom="false"
        barreverse="true"
        pagingtop="true"
        bordered
        data={{
          columns,
          rows: municipios?.data || [],
        }}
        noBottomColumns
        order={["name", "asc"]}
        entriesOptions={[5, 10, 20, 50]}
        entriesLabel="Numero de filas"
        searchLabel="Buscar"
        paginationLabel={["Anterior", "Siguiente"]}
        infoLabel={["Mostrando filas", "a", "de", "filas"]}
      />
    </>
  );
};

export default ReadPersonas;
