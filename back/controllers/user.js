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
    if (!req.body.fullname) {
        return res.status(400).send({
            message: "fullname can not be empty"  
        });
    }

    var params = req.body;
    console.log(params);

    db.query("INSERT INTO `ma_users` SET ? ", params,
        function (error, results, fields) {
            if (error) throw error;
            return res.send({
                data: results,
                message: 'New todo has been created successfully.'
            });
        });
};

const findAll = (req, res) => {
    db.query('select * from ma_users',
        function (error, results, fields) {
            if (error) throw error;
            res.end(JSON.stringify(results));
        });
};


const findOne = (req, res) => {

    db.query('select * from ma_users where Id=?',
        [req.params.id],
        function (error, results, fields) {
            if (error) throw error;
            res.end(JSON.stringify(results));
        });
};
const update = (req, res) => {
    // Validate Request
    if (!req.body.fullname) {
      return res.status(400).send({
        message: "Todo description can not be empty"
      });
    }
  
    console.log(req.body.fullname);
    db.query(
      'UPDATE `ma_users` SET `avatar`=?, `email`=?, `c_type`=?, `created_at`=? WHERE `fullname`=?',
      [req.body.avatar, req.body.email, req.body.c_type, req.body.created_at, req.body.fullname],
      function (error, results, fields) {
        if (error) throw error;
        res.end(JSON.stringify(results));
      }
    );
  };
  
const deletes = (req, res) => {
    console.log(req.body);
    db.query('DELETE FROM `ma_users` WHERE `Id`=?', 
        [req.body.id], function (error, results, fields) {
            if (error) throw error;
            res.end('Record has been deleted!');
    });
};


module.exports = {
    create,
    findAll,
    findOne,
    update,
    deletes
}
