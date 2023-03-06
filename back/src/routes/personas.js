const express = require("express");
const router = express.Router();
const pool = require("../database");

router.post("/", async (req, res) => {
    const { nombre, edad } = req.body;
    if (!nombre) return res.status(400).json("Falta el apellido de la persona");
    const newPersona = {
        nombre,
        edad,
    };
    await pool.query("INSERT INTO PERSONAS set ?", [newPersona]);
    return res.status(200).json({ message: "Persona saved" });
});

router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { nombre, edad } = req.body;
    if (!nombre) return res.status(400).json("Falta el apellido de la persona");
    const newPersona = {
        nombre,
        edad,
    };
    await pool.query("UPDATE PERSONAS set ? WHERE id = ?", [newPersona, id]);
    return res.status(200).json({ message: "Persona updated" });
});

router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    await pool.query("DELETE FROM PERSONAS WHERE id = ?", [id]);
    return res.status(200).json({ message: "Persona deleted" });
});

router.get("/", (req, res) => {
    //realiza una consulta a la base de datos sql
    pool.query("SELECT * FROM PERSONAS", (err, rows) => {
        if (err) {
            return res.json(err);
        }
        return res.json(rows);
    });
});

module.exports = router;
