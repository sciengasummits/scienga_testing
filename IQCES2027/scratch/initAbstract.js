const { MongoClient } = require('mongodb');
require('dotenv').config();

async function initAbstractInfo() {
    const client = new MongoClient(process.env.MONGODB_URI);
    try {
        await client.connect();
        const db = client.db();
        const collection = db.collection('sitecontents');
        
        const conference = 'iqce2027';
        
        // 1. Initialize Sessions
        const sessionData = {
            sessions: [
                'Quantum Algorithms & Complexity',
                'Quantum Hardware & Error Correction',
                'Quantum Communication & Cryptography',
                'Quantum Machine Learning & AI',
                'Quantum Materials & Devices',
                'Quantum Sensing & Metrology',
                'Hybrid Quantum-Classical Computing',
                'Industrial Applications of Quantum Computing'
            ]
        };

        const sessionResult = await collection.updateOne(
            { conference, key: 'sessions' },
            { $set: { data: sessionData, conference, key: 'sessions' } },
            { upsert: true }
        );
        console.log("Upserted sessions:", sessionResult);

        // 2. Initialize Important Dates
        const datesData = {
            dates: [
                { month: 'JUN', day: '15', year: '2026', event: 'Abstract Submission Opens', icon: 'CalendarDays' },
                { month: 'SEP', day: '25', year: '2026', event: 'Early Bird Deadline', icon: 'CheckCircle' },
                { month: 'OCT', day: '30', year: '2026', event: 'Abstract Submission Deadline', icon: 'Clock' },
                {
                    month: 'MAR', day: '15', year: '2027',
                    event: 'Conference Date',
                    sub: 'March 15–17, 2027, Munich, Germany',
                    icon: 'Star',
                },
            ]
        };

        const datesResult = await collection.updateOne(
            { conference, key: 'importantDates' },
            { $set: { data: datesData, conference, key: 'importantDates' } },
            { upsert: true }
        );
        console.log("Upserted importantDates:", datesResult);

    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
}

initAbstractInfo();
