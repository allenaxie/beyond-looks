import dbConnect from '../../../utilities/dbConnect';
import ProductTemplate from '../../../models/productTemplate';

export default async function handler (req,res) {
    const {method} = req;

    dbConnect();

    if (method === 'GET') {
        try {
            // find all meetings
            const productTemplate = await ProductTemplate.find({});
            res.status(200).json({message: 'Success', data: productTemplate})
        } catch(error) {
            console.log(error);
            res.status(400).json({message: 'GET request failed'})
        }
    } else if (method === 'POST') {
        try {
            // create meeting
            const product = await ProductTemplate.create(req.body);
            res.status(201).json({message: 'product has been created', data: product});
        } catch (error) {
            console.log(error);
            res.status(400).json({message: 'POST request failed'})
        }
    }
    else {
        res.status(400).json({message: 'Request failed'})
    }
}