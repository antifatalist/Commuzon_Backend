const express = require('express');
const Item = require('../models/Item');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (err) {
        res.json( { message: err });
    }
});

router.post('/', async (req, res) => {
    const item = new Item({
        name: req.body.name,
        provider: req.body.provider,
        producer: req.body.producer
    });

    try {
        const savedItem = await item.save();
        res.json(savedItem);
    } catch (err) {
        res.json({ message: err});
    }
});

router.get('/:id', async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        res.json(item);
    } catch (err) {
        res.json({ message: err });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const removedItem = await Item.remove({ _id: req.params.id });
        res.json(removedItem);
    } catch (err) {
        res.json({ message: err });
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const updatedItem = await Item.updateOne(
            { _id: req.params.id },
            { $set: { name: req.params.name } }
        );
        res.json(updatedItem);
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;