const express = require('express');
const router = express.Router();

const model = require('../controllers/model')




// module.exports = router =>{ const todos = require('./controller/events') ;  // Créer une nouvelle tâche
router.post('/', model.create) ;  // Récupérer tous les todos
router.get('/', model.findAll) ;  // Récupérer une seule tâche par identifiant
router.get('/:id', model.findOne) ;  // Mettre à jour un Todo avec id
router.put('/:id', model.update) ;  // Ajouter un Todo par id
router.delete('/:id', model.deletes) ; //Supprimer un id

module.exports = router
