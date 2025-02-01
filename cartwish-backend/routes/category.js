const express = require("express");
const router = express.Router();
const Category = require("../models/category");

// Get all categories
router.get("/", async (req, res) => {
    try {
        const categories = await Category.find().sort("name");
        res.json(categories);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Server error" });
    }
});

//Adding new category
router.post("/", async (req, res) => {
    try {
        const category = new Category({
            name: req.body.name,
            image: req.body.image,
        });

        await category.save();
        res.status(201).json(category);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
