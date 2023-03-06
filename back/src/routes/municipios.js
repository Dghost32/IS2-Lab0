const express = require('express');
const router = express.Router();
const pool = require('../database');

router.get('/municipios', (req, res) => {
    //realiza una consulta a la base de datos sql
    pool.query('SELECT * FROM municipios', (err, rows) => {
        if (err) {
           return res.json(err);
        }
        return res.json(rows);
    });
});

//post municipios database
router.post('/municipios', async (req, res) => {
    const { nombre } = req.body;
    if(!nombre)return res.status(400).json('Falta el nombre del municipio');
    const newMunicipio = {
        nombre
    };
    await pool.query('INSERT INTO municipios set ?', [newMunicipio]);
    return res.status(200).json({ message: 'Municipio saved' });
});

router.put('/municipios/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;
    if(!nombre)return res.status(400).json('Falta el nombre del municipio');
    const newMunicipio = {
        nombre
    };
    await pool.query('UPDATE municipios set ? WHERE id = ?', [newMunicipio, id]);
    return res.status(200).json({ message: 'Municipio updated' });
});

router.delete('/municipios/:id', async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM municipios WHERE id = ?', [id]);
    return res.status(200).json({ message: 'Municipio deleted' });
});


module.exports =  router;


