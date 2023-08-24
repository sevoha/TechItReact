const mongoose = require("mongoose")

const cartSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    products :{
        type: Array,
        required: true,
    },
    active: {
        type: Boolean,
        required: true,
    },             
})


const Cart = mongoose.model("carts", cartSchema);
module.exports = Cart;





// productId: String, name: String,
// price: Number, category: String,
// description: String, image: String,
// quantity: Number