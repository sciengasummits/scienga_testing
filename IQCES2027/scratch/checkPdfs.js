const { MongoClient } = require('mongodb');
require('dotenv').config();

async function checkPdfs() {
    const client = new MongoClient(process.env.MONGODB_URI);
    try {
        await client.connect();
        const db = client.db();
        const collection = db.collection('sitecontents');
        
        // The dashboard saves with conferenceId as prefix if not using a global key
        // Or it uses context.
        // Let's search for any key matching 'pdfs'
        const docs = await collection.find({ key: 'pdfs' }).toArray();
        console.log("Found PDF docs:", JSON.stringify(docs, null, 2));
        
        const brochureDocs = await collection.find({ key: 'brochure' }).toArray();
        console.log("Found Brochure docs:", JSON.stringify(brochureDocs, null, 2));

    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
}

checkPdfs();
