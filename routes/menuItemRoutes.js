const express = require('express');
const router = express.Router();
const MenuItem = require('../models/menu');

router.post('/', async (req, res) => {
    try {
        const data = req.body;

        const newMenu = new MenuItem(data);
        const response = await newMenu.save();

        console.log('menu saved');
        res.status(200).json(response);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

router.get('/', async (req, res) => {
    try {
        const data = await MenuItem.find();

        console.log("data found");
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
})

router.get('/:tasteType', async (req, res) => {
    try {
        const tasteType = req.params.tasteType;

        if (tasteType == 'sweet' || tasteType == 'spicy' || tasteType == 'sour') {
            const data = await MenuItem.find({ taste: tasteType });
            res.status(200).json(data);
        }
        else {
            res.status(404).json({ error: 'Invalid tasteType' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

router.put('/:id', async (req, res) => {
    try {
        const menuId = req.params.id;
        const updatedMenuItems = req.body;
        const response = await MenuItem.findByIdAndUpdate(menuId, updatedMenuItems, {
            new: true,
            runValidators: true
        })

        if (!response) {
            //HERE WE ARE EXPLICITLY USING RETURN BECAUSE
            //REQUEST RESPONSE CYCLE IS COMPLETED
            //WHEN REQ, RES CYCLE COMPLETED THEN ANYOTHER RESPONSE W/O REQ WILL CREATE ERROR
            return res.status(404).json({ error: "MenuItem not found" });
        }
        res.status(200).json(response);
        console.log("Update Successfull");

    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
})

module.exports = router;