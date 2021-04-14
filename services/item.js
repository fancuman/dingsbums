const express = require('express');
const auth = require('../middleware/auth')
const Item = require('../models/item');

const router = express.Router();

router.post('/', auth, async (req, res) => {
  try {
    const instance = new Item({
      name: req.body.name,
      description: req.body.description || '',
      coordinates: [req.body.coordinates.log, req.body.coordinates.lat],
      ownership: req.user._id
    })
    const item = await instance.save();
    res.send({ message: 'Item added.', item });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post('/search', async (req, res) => {
  let { centerLog, centerLat, maxDistance = 5000, limitNum = 100 } = res.body;

  try {
    const items = await Item.find({
      coordinates: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: coords
          },
          $maxDistance: maxDistance
        }
      }
    }).limit(100);
    res.send({ ok: 1, items });
  } catch (error) {
    res.status(400).send(error);
  }
});

//?keywords=xxx
router.get('/search', async (req, res) => {
  const keywords = req.query.keywords;
  console.log("keywords:", keywords)
  try {
    const items = await Item.fuzzySearch(keywords).exec();
    res.send(items);
  } catch (error) {
    res.status(402).send(error);
  }
});

router.get('/:id', async (req, res) => {
  const _id = req.params.id;
  try {
    const item = await Item.findOne({ _id });
    res.send(item);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/', async (req, res) => {
  try {
    const items = await Item.find({});
    res.send(items);
  } catch (error) {
    res.status(400).send(error);
  }
});
module.exports = router;
