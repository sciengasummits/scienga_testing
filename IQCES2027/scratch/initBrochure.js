const { MongoClient } = require('mongodb');
require('dotenv').config();

async function fixBrochure() {
    const client = new MongoClient(process.env.MONGODB_URI);
    try {
        await client.connect();
        const db = client.db();
        const collection = db.collection('sitecontents');
        
        const conference = 'iqce2027';
        
        // Initial data matching the Quantum summit
        const initialData = {
            title: 'International Conference on Quantum Computing & Engineering (IQCE-2027)',
            description: 'Download the official conference brochure to get comprehensive information about the Quantum Computing & Engineering Summit. It serves as your complete guide to the event, featuring detailed schedules, speaker profiles, and venue information.',
            note: '* PDF will be available soon. Format: PDF',
            features: [
                'Complete 3-Day Program Schedule',
                'Keynote Speaker Biographies & Topics',
                'Workshop & Breakout Session Details',
                'Venue Maps & Accommodation Guide',
                'Sponsorship & Exhibition Opportunities',
            ]
        };

        const result = await collection.updateOne(
            { conference, key: 'brochure' },
            { 
                $setOnInsert: { data: initialData, conference, key: 'brochure' },
                // If it exists, we don't want to overwrite if they have changes,
                // but if it's missing, we want it there.
            },
            { upsert: true }
        );
        
        console.log("Upserted brochure record:", result);

        // Also ensure the pdfs key exists
        const pdfsResult = await collection.updateOne(
            { conference, key: 'pdfs' },
            { 
                $setOnInsert: { data: { brochure: "" }, conference, key: 'pdfs' }
            },
            { upsert: true }
        );
        console.log("Upserted pdfs record:", pdfsResult);

    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
}

fixBrochure();
