import { Grid } from "@mui/material";
import React from "react";
import Section from "../../components/Section";
import CreateMunicipio from "./crud/CreateMunicipio";
import DeleteMunicipio from "./crud/DeleteMunicipio";
import ReadMunicipios from "./crud/ReadMunicipios";
import UpdateMunicipio from "./crud/UpdateMunicipio";

const Municipios = () => {
  return (
    <Grid>
      <Section className="mt-5">
        <CreateMunicipio />
      </Section>

      <Section>
        <ReadMunicipios />
      </Section>

      <Section>
        <UpdateMunicipio />
      </Section>

      <Section>
        <DeleteMunicipio/>
      </Section>
 
    </Grid>
  );
};

export default Municipios;
