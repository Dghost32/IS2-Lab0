import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { MDBDataTable } from "mdbreact";
import { personas_cols } from "../../../shared/data/columns";
import { Skeleton } from "@mui/material";
import { getPersonas } from "../../../fetchers/personas";

const ReadPersonas = () => {
  const [columns, setColumns] = useState([]);
  const personas = useQuery({
    queryKey: ["personas"],
    queryFn: getPersonas,
  });

  useEffect(() => {
    setColumns(personas_cols);
  }, []);

  if (personas.isLoading) {
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

  if (personas.isError) {
    return (
      <>
        <h1 className="text-3xl font-bold mb-2">Ver Personas</h1>
        <p>Error: {personas.error.message}</p>
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
          rows: personas?.data || [],
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
