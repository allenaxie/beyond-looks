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
            name: {
                type: String,
                required: true,
            },
            height: {
                type: Number,
                required: true,
            },
            weight: {
                type: Number,
                required: true,
            },
            bust: {
                type: Number,
                required: true,
            },
            waist: {
                type: Number,
                required: true,
            },
            hips: {
                type: Number,
                required: true,
            },
            imageURL: {
                type: String,
            },
            size: {
                type: String,
                required: true,
            },
        }
    ],
    frontViewImageURL: String,
    backViewImageURL: String,
    detailedViewImages: []
}, {
    timestamps: true,
})

module.exports = mongoose.models.ProductTemplate || mongoose.model('ProductTemplate', productTemplateSchema);
