const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql2"); 


const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"Aspire",
    port: 8889


});

const create = (req, res) => {
    // Validate request
    if (!req.body.model_id) {
        return res.status(400).send({
            message: "model id can not be empty"
        });
    }

    var params = req.body;
    console.log(params);

    db.query("INSERT INTO  ma_modellangages SET ? ", params,
        function (error, results, fields) {
            if (error) throw error;
            return res.send({
                data: results,
                message: ' has been created successfully.'
            });
        });
};

const findAll = (req, res) => {
    db.query('select * from ma_modellangeges',
        function (error, results, fields) {
            if (error) throw error;
            res.end(JSON.stringify(results));
        });
};


const findOne = (req, res) => {

    db.query('select * from ma_modellangages where Id=?',
        [req.params.id],
        function (error, results, fields) {
            if (error) throw error;
            res.end(JSON.stringify(results));
        });
};
const update = (req, res) => {
    const modelId = req.body.model_id;
    const level = req.body.level;
    const query = 'UPDATE `ma_modellangages` SET `level` = ? WHERE `model_id` = ?';
    db.query(query, [level, modelId], (error, results, fields) => {
      if (error) throw error;

      res.end(JSON.stringify(results));
    });
  };
  



const deletes = (req, res) => {
    console.log(req.params);
    const id = req.params.id;

    db.query('SELECT * FROM `ma_models` WHERE `id` = ?', [id], function (error, results, fields) {
        if (error) throw error;

        // Vérifier si l'enregistrement existe
        if (results.length === 0) {
            res.status(404).send('L\'ID spécifié n\'existe pas.');
        } else {
            // Supprimer l'enregistrement
            db.query('DELETE FROM `ma_models` WHERE `id`  = ?', [id], function (error, results, fields) {
                if (error) throw error;
                res.end('L\'a suppression à été faite  succès!');
            });
        }
    });
};



module.exports = {
    create,
    findAll,
    findOne,
    update,
    deletes
}
