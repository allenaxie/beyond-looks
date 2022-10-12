const mongoose = require('mongoose');

const productTemplateSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    models: [
        {
            name: String,
            height: Number,
            weight: Number,
            bust: Number,
            waist: Number,
            hips: Number,
            imageURL: String,
            size: String,
        }
    ],
    frontViewImageURL: String,
    backViewImageURL: String,
    detailedViewImages: []
}, {
    timestamps: true,
})

module.exports = mongoose.models.ProductTemplate || mongoose.model('ProductTemplate', productTemplateSchema);