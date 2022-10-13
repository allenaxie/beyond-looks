import dbConnect from '../../../../utilities/dbConnect';
import ProductTemplate from '../../../../models/productTemplate';

export default async function handler (req,res) {
    console.log(req.body);

    const {
        query: {id},
        method,
    } = req;

    dbConnect();

    if (method === 'PUT') {
        try {
            // find template
            const productTemplate = await ProductTemplate.updateOne(
                {_id: id},
                {
                    $set: {
                        "models": req.body.models[0]
                    }
                }
            )
            res.status(200).json({message: 'Successfully updated models info.', data: productTemplate});
        } catch(err) {
            console.log(err);
            res.status(400).json({message:'Update models info request failed.'})
        }
    }
}