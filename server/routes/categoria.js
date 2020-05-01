const express = require('express');
const bcrypt = require('bcrypt');

const { verificaToken, verificaAdmin_Role } = require('../middlewares/autenticacion');
let Categoria = require('../models/categoria');

const saltRounds = 10;
let app = express();

// *************************************
//  Mostrar todas las categorías
// *************************************
app.get('/categoria', verificaToken, (req, res) => {

    Categoria.find({})
        .sort('descripcion')
        .populate('usuario', 'nombre email')
        .exec((err, categorias) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err: {
                        message: 'Categories are not found'
                    }
                });
            }

            res.json({
                ok: true,
                categorias
            });
        });
});


// *************************************
//  Mostrar una categoría por ID
// *************************************
app.get('/categoria/:id', verificaToken, (req, res) => {

    let id = req.params.id;

    Categoria.findById(id, (err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Category is not found'
                }
            });
        }

        res.json({
            ok: true,
            categoriaDB
        });
    });
});


// *************************************
//  Crear una nueva categorÍa
// *************************************
app.post('/categoria', verificaToken, (req, res) => {

    let body = req.body;

    console.log(body);

    let categoria = new Categoria({
        descripcion: body.descripcion,
        usuario: req.usuario._id
    });

    categoria.save((err, categoriaDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err: {
                    message: 'This category is not admin'
                }
            });
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'This category is not exist'
                }
            });
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        });
    });
});


// *************************************
//  Modifica una categoría
// *************************************
app.put('/categoria/:id', verificaToken, (req, res) => {
    let id = req.params.id;
    let body = req.body;

    let descCategoria = {
        descripcion: body.descripcion
    };

    Categoria.findByIdAndUpdate(id, descCategoria, { new: true, runValidators: true }, (err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err: {
                    message: 'This category is not admin'
                }
            });
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'This category is not exist'
                }
            });
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        });
    });
});


// *************************************
//  Elimina una categoría
// *************************************
app.delete('/categoria/:id', [verificaToken, verificaAdmin_Role], (req, res) => {

    let id = req.params.id;

    Categoria.findByIdAndUpdate(id, { new: true }, (err, categoriaBorrado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err: {
                    message: 'Category not found'
                }
            });
        }

        if (!categoriaBorrado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'The id does not exist'
                }
            });
        }

        res.json({
            ok: true,
            message: 'Category deleted',
            categoria: categoriaBorrado
        });
    });
});

module.exports = app;