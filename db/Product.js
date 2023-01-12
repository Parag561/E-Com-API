const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    name: String,
    price: String,
    description: String
},
{
    timestamps: true,
    versionKey : false
} 
);

productSchema.set("toJSON", { virtuals: true });
productSchema.set("toObject", { virtuals: true });

module.exports = mongoose.model('products', productSchema);