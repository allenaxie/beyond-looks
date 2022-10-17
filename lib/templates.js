import axios from 'axios';

export async function loadTemplates() {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/productTemplates`);
    const templates = res.data.data;

    return templates;
}