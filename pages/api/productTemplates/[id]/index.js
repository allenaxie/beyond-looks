import dbConnect from '../../../../utilities/dbConnect';
import ProductTemplate from '../../../../models/productTemplate';

export default async function handler(req, res) {
    const {
        query: { id },
        method
    } = req;

    dbConnect();

    if (method === 'GET') {
        try {
            const productTemplate = await ProductTemplate.findById(id);
            res.status(200).json({ message: 'GET request success', data: productTemplate});
        } catch (error) {
            console.log(error);
            res.status(400).json({message: 'GET by id failed'})
        }
    } else if (method === 'PUT') {
        try {
            console.log('req body:', req.body);
            // find and update the meeting topic
            const productTemplate = await ProductTemplate.findByIdAndUpdate(id, req.body, {
                new: true,
                runValidators: true,
            })
            // if topic not found
            if (!productTemplate) {
                res.status(400).json({ message: 'Product does not exist.' });
            }
            // if successful
            res.status(200).json({ message: 'Product updated', data: productTemplate })
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: 'PUT request failed' })
        }
    } else if (method === 'DELETE') {
        try {
            // find topic
            const deletedProductTemplate = await ProductTemplate.findOneAndDelete({ _id: id });
            // if no topic
            if (!deletedProductTemplate) {
                res.status(400).json({ message: 'No product template found.' })
            }
            // if successful
            res.status(200).json({ message: `Product ${id} deleted`, data: deletedProductTemplate })
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: 'DELETE request failed' })
        }
    } else {
        res.status(400).json({ message: 'Request failed' });
    }
}
