const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { engine } = require("express-handlebars");
const path = require("path");
//initializations
const app = express();

//settings
app.set("port", process.env.PORT || 4000);
app.set("views", path.join(__dirname, "views"));
app.engine(
    ".hbs",
    engine({
        defaultLayout: "main",
        layoutsDir: path.join(app.get("views"), "layouts"),
        partialsDir: path.join(app.get("views"), "partials"),
        extname: ".hbs",
        helpers: require("./lib/handlebars"),
    })
);
app.set("view engine", ".hbs");
//middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//enable cors for all *
app.use(cors());
//enable cors for specific origin
app.use(cors({ origin: "*" }));

//global variablesrs
app.use((req, res, next) => {
    next();
});
//routes
app.use(require("./routes/index.js"));
app.use(require("./routes/authentication.js"));
app.use("/municipios", require("./routes/municipios.js"));
app.use("/personas", require("./routes/personas.js"));
app.use("/viviendas", require("./routes/viviendas.js"));
//public
app.use(express.static(path.join(__dirname, "public")));
//starting the server
app.listen(app.get("port"), () => {
    console.log(`Server on port ${app.get("port")}`);
});
