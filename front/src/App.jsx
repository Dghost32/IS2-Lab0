//MDB IMPORTS
import "mdbreact/dist/css/mdb.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
// REACT IMPORTS
import { useState } from "react";
// MUI IMPORTS
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Box from "@mui/material/Box";
// COMPONENTS IMPORTS
import TabPanel from "./components/TabPanel";
import Municipios from "./pages/municipios";
import Personas from "./pages/personas";
import Viviendas from "./pages/viviendas";

function App() {
  const [value, setValue] = useState(0);

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          position: "fixed",
          background: "white",
          width: "100%",
        }}
      >
        <Tabs value={value} onChange={handleChange} aria-label="Page Tabs">
          <Tab label="Municipios" />
          <Tab label="Viviendas" />
          <Tab label="Personas" />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Municipios />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Viviendas />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Personas />
      </TabPanel>
    </div>
  );
}

export default App;
