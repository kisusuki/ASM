const express = require('express');
const router = express.Router();
const BrandModel = require('../models/BrandModel');

router.get('/add', async (req, res) => {
   let brands = await BrandModel.find({});
   res.render('', { brands });
})

router.get('/delete/:id', async (req, res) => {
   await ClassModel.findByIdAndDelete(req.params.id);
   res.redirect('/class');
})


module.exports = router;