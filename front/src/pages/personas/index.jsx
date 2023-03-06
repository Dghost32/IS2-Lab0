import { Grid } from "@mui/material";
import React from "react";
import Section from "../../components/Section";
import CreatePersona from "./crud/CreatePersona";
import DeletePersona from "./crud/DeletePersona";
import ReadPersonas from "./crud/ReadPersonas";
import UpdatePersona from "./crud/UpdatePersonas";

const Personas = () => {
  return (
    <Grid>
      <Section className="mt-5">
        <CreatePersona />
      </Section>

      <Section>
        <ReadPersonas />
      </Section>

      <Section>
        <UpdatePersona />
      </Section>

      <Section>
        <DeletePersona />
      </Section>
    </Grid>
  );
};

export default Personas;
