const express = require("express");
const router = express.Router();
const pool = require("../database");

router.get("/", (req, res) => {
    //realiza una consulta a la base de datos sql
<<<<<<< HEAD
    pool.query('SELECT * FROM MUNICIPIOS', (err, rows) => {
=======
    pool.query("SELECT * FROM MUNICIPIOS", (err, rows) => {
>>>>>>> 15b46ce82d1f2f69b3c369c414327e4fc978dd36
        if (err) {
            return res.json(err);
        }
        return res.json(rows);
    });
});

//post MUNICIPIOS database
router.post("/", async (req, res) => {
    const { nombre } = req.body;
    if (!nombre) return res.status(400).json("Falta el nombre del municipio");
    const newMunicipio = {
        nombre,
    };
<<<<<<< HEAD
    await pool.query('INSERT INTO MUNICIPIOS set ?', [newMunicipio]);
    return res.status(200).json({ message: 'Municipio saved' });
=======
    await pool.query("INSERT INTO MUNICIPIOS set ?", [newMunicipio]);
    return res.status(200).json({ message: "Municipio saved" });
>>>>>>> 15b46ce82d1f2f69b3c369c414327e4fc978dd36
});

router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;
    if (!nombre) return res.status(400).json("Falta el nombre del municipio");
    const newMunicipio = {
        nombre,
    };
<<<<<<< HEAD
    await pool.query('UPDATE MUNICIPIOS set ? WHERE id = ?', [newMunicipio, id]);
    return res.status(200).json({ message: 'Municipio updated' });
=======
    await pool.query("UPDATE MUNICIPIOS set ? WHERE id = ?", [
        newMunicipio,
        id,
    ]);
    return res.status(200).json({ message: "Municipio updated" });
>>>>>>> 15b46ce82d1f2f69b3c369c414327e4fc978dd36
});

router.delete("/:id", async (req, res) => {
    const { id } = req.params;
<<<<<<< HEAD
    await pool.query('DELETE FROM MUNICIPIOS WHERE id = ?', [id]);
    return res.status(200).json({ message: 'Municipio deleted' });
=======
    await pool.query("DELETE FROM MUNICIPIOS WHERE id = ?", [id]);
    return res.status(200).json({ message: "Municipio deleted" });
>>>>>>> 15b46ce82d1f2f69b3c369c414327e4fc978dd36
});
router.post('/personas', async (req, res) => {
    const { nombre, edad } = req.body;
    if(!nombre)return res.status(400).json('Falta el apellido de la persona');
    const newPersona= {
        nombre ,
        edad
    };
    await pool.query('INSERT INTO personas set ?', [newPersona]);
    return res.status(200).json({ message: 'Persona saved' });
});
router.put('/personas/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, edad } = req.body;
    if(!nombre)return res.status(400).json('Falta el apellido de la persona');
    const newPersona = {
        nombre,
        edad
    };
    await pool.query('UPDATE personas set ? WHERE id = ?', [newPersona, id]);
    return res.status(200).json({ message: 'Persona updated' });
});
router.delete('/personas/:id', async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM personas WHERE id = ?', [id]);
    return res.status(200).json({ message: 'Persona deleted' });
});
router.get('/personas', (req, res) => {
    //realiza una consulta a la base de datos sql
    pool.query('SELECT * FROM personas', (err, rows) => {
        if (err) {
           return res.json(err);
        }
        return res.json(rows);
    });
});



module.exports = router;
