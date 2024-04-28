var express = require('express');

const ToyModel = require('../models/ToyModel');
const BrandModel = require('../models/BrandModel');
const FigureModel = require('../models/FigureModel');
var router = express.Router();

router.get('/admin', async (req, res) => {
  var toys = await ToyModel.find({}).populate('brand');

  res.render('admin', { toys: toys })
})

router.get('/list', async (req, res) => {
  var toys = await ToyModel.find({});
  res.render('list', { toys: toys });
})

router.post('/search', async (req, res) => {
  var keyword = req.body.keyword;
  var toys = await ToyModel.find({ name: new RegExp(keyword, "i") })
  res.render('admin', { toys: toys })
})

router.get('/delete/:id', async (req, res) => {
  await ToyModel.findByIdAndDelete(req.params.id)
    .then(() => { console.log('Delete toy succeed !') })
    .catch((err) => { console.log('Delete toy failed !') });
  res.redirect('/admin');
})

router.get('/drop', async (req, res) => {
  await ToyModel.deleteMany({})
    .then(() => { console.log('Delete all toys succeed !') });
  res.redirect('/admin');
})

router.post('/order', async (req, res) => {
  var id = req.body.id;
  var toy = await ToyModel.findById(id);

  var order_quantity = req.body.order_quantity;
  var price = req.body.price;
  var total_price = price * order_quantity;
  res.render('order_confirm', { toy: toy, order_quantity: order_quantity, total_price: total_price });
})
router.get('/', async (req, res) => {
  var toys = await ToyModel.find({});
  res.render('homepage', { toys: toys });
})
router.get('/add', async (req, res) => {
  var brands = await BrandModel.find({});
  var toys = await ToyModel.find().populate('brand');

  res.render('add', { toys, brands });
})

router.post('/add', async (req, res) => {
  var toys = req.body;
  
  var select = req.body.category;
  if (select == 1) {
    await ToyModel.create(toys);
  } else if (select == 2) {
    await FigureModel.create(toys);
    
  }
  await ToyModel.create(toys);
  res.redirect('/admin');
})

router.get('/edit/:id', async (req, res) => {
  var toy = await ToyModel.findById(req.params.id).populate('brand');
  var brands = await BrandModel.find({});
  res.render('edit', { toy: toy, brands });
})

router.post('/edit/:id', async (req, res) => {
  var id = req.params.id;
  var updatedData = req.body;
  await ToyModel.findByIdAndUpdate(id, updatedData)

  res.redirect('/admin');
})

router.get('/toy', async (req, res) => {
  var toys = await ToyModel.find({});
  res.render('list', { toys: toys });
})
router.get('/figure', async (req, res) => {
  var toys = await FigureModel.find({});
  res.render('list', { toys: toys });
})


module.exports = router;