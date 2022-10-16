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
            imageUrl: {
                type: String,
            },
            size: {
                type: String,
                required: true,
            },
        }
    ],
    frontViewImageUrl: String,
    backViewImageUrl: String,
    detailLook: [
        {
            imageUrl: String,
            description: String,
        }
    ]
}, {
    timestamps: true,
})

module.exports = mongoose.models.ProductTemplate || mongoose.model('ProductTemplate', productTemplateSchema);
