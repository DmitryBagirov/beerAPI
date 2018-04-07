const router = require('express').Router();
const request = require('sync-request');
const Beer = require('../../models/beer');

router.get('/', (req, res) => {
  Beer.find({})
    .then((items) => {
      res.json(items);
    })
    .catch((err) => {
      res.status(404).json({ status: err });
    });
});

router.get('/download', (req, res) => {
  let page = 1;
  let exist = true;
  do {
    const query = request('GET', `https://api.punkapi.com/v2/beers?page=${page}`);
    if (query.statusCode === 200) {
      const beers = JSON.parse(query.getBody());
      exist = beers.length > 0;
      beers.forEach((item) => {
        new Beer({
          id: item.id,
          name: item.name,
          description: item.description,
          brewers_tips: item.brewers_tips,
        }).save();
      });
    } else {
      exist = false;
    }
    page++;
  } while (exist);
  res.json({ status: 'ok' });
});

router.get('/:id', (req, res) => {
  Beer.findOne({ id: req.params.id })
    .then((item) => {
      res.json(item);
    })
    .catch((err) => {
      res.status(404).json({ status: err });
    });
});

router.delete('/:id', (req, res) => {
  Beer.remove({ id: req.params.id }).then((result) => {
    if (result.n > 0) {
      res.json({ status: 'clear' });
    } else {
      res.status(410).json({ status: 'not found' });
    }
  });
});

router.delete('/', (req, res) => {
  Beer.remove({})
    .then(() => {
      res.json({ status: 'clear' });
    })
    .catch((err) => {
      res.status(410).json({ status: err });
    });
});

router.patch('/:id', (req, res) => {
  const {name, description, brewers_tips} = req.body;
  Beer.findOneAndUpdate(
    {
      id: req.params.id},
    {
      $set:{
        name,
        description,
        brewers_tips
      }
    }, {new: true})
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      res.status(202).json({ status: err });
    });
});
module.exports = router;
