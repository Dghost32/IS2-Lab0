import { Grid } from "@mui/material";
import React from "react";
import Section from "../../components/Section";
import CreateVivienda from "./crud/CreateVivienda";
import DeleteVivienda from "./crud/DeleteVivienda";
import ReadViviendas from "./crud/ReadViviendas";
import UpdateVivienda from "./crud/UpdateViviendas";

const Viviendas = () => {
  return (
    <Grid>
      <Section className="mt-5">
        <CreateVivienda />
      </Section>

      <Section>
        <ReadViviendas />
      </Section>

      <Section>
        <UpdateVivienda />
      </Section>

      <Section>
        <DeleteVivienda />
      </Section>
    </Grid>
  );
};

export default Viviendas;
