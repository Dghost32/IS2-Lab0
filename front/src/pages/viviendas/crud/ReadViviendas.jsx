import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { MDBDataTable } from "mdbreact";
import { viviendas_cols } from "../../../shared/data/columns";
import { Skeleton } from "@mui/material";
import { getViviendas } from "../../../fetchers/viviendas";

const ReadViviendas = () => {
  const [columns, setColumns] = useState([]);
  const viviendas = useQuery({
    queryKey: ["viviendas"],
    queryFn: getViviendas,
  });

  useEffect(() => {
    setColumns(viviendas_cols);
  }, []);

  if (viviendas.isLoading) {
    return (
      <>
        <h1 className="text-3xl font-bold mb-2">Ver Viviendas</h1>
        <Skeleton variant="rectangular" />
        <Skeleton variant="rectangular" />
        <Skeleton variant="rectangular" />
        <Skeleton variant="rectangular" />
        <Skeleton variant="rectangular" />
      </>
    );
  }

  if (viviendas.isError) {
    return (
      <>
        <h1 className="text-3xl font-bold mb-2">Ver Viviendas</h1>
        <p>Error: {viviendas.error.message}</p>
      </>
    );
  }

  return (
    <>
      <h1 className="text-3xl font-bold mb-2">Ver Viviendas</h1>
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
          rows: viviendas?.data || [],
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

export default ReadViviendas;
