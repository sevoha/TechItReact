const express = require("express");
const auth = require("../middlewares/auth")
const Cart = require("../models/Cart")
const joi = require("joi")

const router = express.Router();


const productSchema = joi.object({
    name: joi.string().required().min(2),
    price: joi.number().required(),
    category: joi.string().required().min(2),
    description: joi.string().required().min(2),
    image: joi.string().required().min(2),
    _id: joi.string(),
    // quantity: joi.number().required(),
});

// add product to cart - product details in body
router.post("/", auth, async (req, res) => {
    try {
    // 1. joi validation
    const { error } = productSchema.validate(req.body);
    if (error) return res.status(400).send(error);
    // 2. find user cart
    let cart = await Cart.findOne({userId: req.payload._id, active: true})
    if(!cart)
        return res.status(404).send("No active cart avialable");
    //3.1 check if the product exist in the cart 
    let productToFind = cart.products.find((product) => product._id == req.body._id);
    if (productToFind) {
        // inc the quantity
        let indexToUpdate = cart.products.findIndex((product)  => product._id == req.body._id)
        cart.products[indexToUpdate].quantity++;
        cart.markModified("products");
    }
    else {
      // 3. add product to products array
    cart.products.push({... req.body, quantity : 1})
}

    await cart.save()

    // 4 . return a response
    res.status(201).send("Product added successfuly to cart")
    } catch (error) {
    res.status(400).send(error);
    }
});

router.get("/", auth, async (req,res) => {
    try {
        let cart = await Cart.findOne({userId: req.payload._id,active: true,});
            if (!cart) return res.status(404).send("No active cart avialable");
        res.status(200).send(cart.products)
    } catch (error) {
        res.status(400).send(error);

    }
})

module.exports = router;

// add product to cart - product details in body//

// router.post("/", auth, async (req, res) => {
//   try {
//     // 1. joi validation
//     const { error } = productSchema.validate(req.body);
//     if (error) return res.status(400).send(error);

//     // 2. find user cart
//     let cart = await Cart.findOne({ userId: req.payload._id, active: true });

//     if (!cart)
//       return res.status(404).send("No active cart available for this user");

//     // 3. check if the product already exist in user cart
//     let productToFind = cart.products.find((p) => p._id == req.body._id);
//     if (productToFind) {
//       // inc the quantity
//       let indexToUpdate = cart.products.findIndex((p) => p._id == req.body._id);
//       cart.products[indexToUpdate].quantity++;
//       cart.markModified("products");
//     } else {
//       cart.products.push({ ...req.body, quantity: 1 });
//     }

//     await cart.save();

//     // 4 . return a response
//     res.status(201).send("Product added successfully to cart!");
//   } catch (error) {
//     res.status(400).send(error);
//   }
// });