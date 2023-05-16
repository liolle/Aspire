const express = require('express');
const router = express.Router();

const modellangage = require('../controllers/modellangage')




// module.exports = router =>{ const todos = require('./controller/events') ;  // Créer une nouvelle tâche
router.post('/', modellangage.create) ;  // Récupérer tous les todos
router.get('/', modellangage.findAll) ;  // Récupérer une seule tâche par identifiant
router.get('/:id', modellangage.findOne) ;  // Mettre à jour un Todo avec id
router.put('/:id', modellangage.update) ;  // Ajouter un Todo par id
router.delete('/:id', modellangage.deletes) ; //Supprimer un id

module.exports = router
