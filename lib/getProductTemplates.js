import dbConnect from '../utilities/dbConnect';
import ProductTemplate from '../models/productTemplate';

export async function getProductTemplates() {

    dbConnect();

    // find all meetings
    const productTemplates = await ProductTemplate.find({});
    const data = JSON.parse(JSON.stringify(productTemplates));

    return data;
  }