const express = require("express");
const router = express.Router();
const pool = require("../database");

router.get("/", (req, res) => {
    pool.query(
        "SELECT V.id AS id_vivienda, V.direccion, M.id AS id_municipio, M.nombre AS nombre_municipio FROM VIVIENDAS V INNER JOIN MUNICIPIOS M ON V.id_municipio = M.id",
        (err, rows) => {
            if (err) {
                return res.json(err);
            }
            const viviendas = rows.map((row) => {
                return {
                    id: row.id_vivienda,
                    direccion: row.direccion,
                    idMunicipio: row.id_municipio,
                    municipio: row.nombre_municipio,
                };
            });
            return res.json(viviendas);
        }
    );
});

router.post("/", async (req, res) => {
    const { direccion, idMunicipio } = req.body;
    if (!direccion || !idMunicipio) {
        return res
            .status(400)
            .json("Falta la dirección o el municipio de la vivienda");
    }

    const newVivienda = {
        direccion,
        id_municipio: idMunicipio,
    };

    await pool.query("INSERT INTO VIVIENDAS SET ?", [newVivienda]);
    return res.status(200).json({ message: "Vivienda saved" });
});

router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { direccion, idMunicipio } = req.body;
    if (!direccion || !idMunicipio) {
        return res
            .status(400)
            .json("Falta la dirección o el municipio de la vivienda");
    }
    const newVivienda = {
        direccion,
        id_municipio: idMunicipio,
    };
    await pool.query("UPDATE VIVIENDAS SET ? WHERE id = ?", [newVivienda, id]);
    return res.status(200).json({ message: "Vivienda updated" });
});

router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    await pool.query("DELETE FROM VIVIENDAS WHERE id = ?", [id]);
    return res.status(200).json({ message: "Vivienda deleted" });
});

module.exports = router;
