const express = require('express');
const router = express.Router();
const pool = require('../database');

router.get('/', (req, res) => {
    //realiza una consulta a la base de datos sql
    pool.query('SELECT * FROM MUNICIPIOS', (err, rows) => {
        if (err) {
           return res.json(err);
        }
        return res.json(rows);
    });
});

//post municipios database
router.post('/', async (req, res) => {
    const { nombre } = req.body;
    if(!nombre)return res.status(400).json('Falta el nombre del municipio');
    const newMunicipio = {
        nombre
    };
    await pool.query('INSERT INTO MUNICIPIOS set ?', [newMunicipio]);
    return res.status(200).json({ message: 'Municipio saved' });
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;
    if(!nombre)return res.status(400).json('Falta el nombre del municipio');
    const newMunicipio = {
        nombre
    };
    await pool.query('UPDATE MUNICIPIOS set ? WHERE id = ?', [newMunicipio, id]);
    return res.status(200).json({ message: 'Municipio updated' });
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM MUNICIPIOS WHERE id = ?', [id]);
    return res.status(200).json({ message: 'Municipio deleted' });
});




module.exports =  router;


