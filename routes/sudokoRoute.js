const express=require('express');
const {sudokoController}=require('../controllers/sudokoController')
const router=express.Router();



router.post('/solve',sudokoController);
module.exports = router;