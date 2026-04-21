const { MongoClient } = require('mongodb');
require('dotenv').config();

async function updateAboutSection() {
    const client = new MongoClient(process.env.MONGODB_URI);
    try {
        await client.connect();
        const db = client.db();
        const collection = db.collection('sitecontents');
        
        const conference = 'iqce2027';
        
        const aboutData = {
            title: 'About The Conference',
            subtitle: 'International Conference on Quantum Computing & Engineering (IQCES-2027)',
            paragraph1: 'We are thrilled to welcome you to the International Conference on Quantum Computing & Engineering (IQCES-2027), scheduled to take place from March 15-17, 2027, in the historic city of Munich Germany. This premier scientific gathering brings together global experts from academia and industry to discuss groundbreaking advancements in quantum science. Our mission is to foster a collaborative environment where researchers can share innovative findings, explore the next generation of quantum platforms, and discuss the practical applications of quantum information science. Through interdisciplinary dialogue, we aim to accelerate the transition from quantum theory to industrial reality.',
            paragraph2: 'Our mission is to foster a collaborative environment where researchers can share innovative findings, explore the next generation of quantum platforms, and discuss the practical applications of quantum information science. Through interdisciplinary dialogue, we aim to accelerate the transition from quantum theory to industrial reality.',
            objectives: [
                'Foster Collaborative Networks: To connect leading scientists with emerging researchers to build lasting international partnerships.',
                'Accelerate Innovation: To provide a global stage for showcasing breakthrough research in quantum computing, communication, and metrology.',
                'Bridge Research and Industry: To facilitate knowledge transfer between theoretical research and real-world industrial implementation.',
                'Discuss Ethical and Future Implications: To address the societal and security impacts of emerging quantum technologies.',
                'Empower the Next Generation: To support students and early-career researchers through specialized workshops and poster sessions.'
            ],
            keyThemes: [
                'Quantum Algorithms and Complexity',
                'Quantum Hardware and Error Correction',
                'Quantum Communication and Cryptography',
                'Quantum Machine Learning and AI',
                'Quantum Materials and Devices'
            ]
        };

        const result = await collection.updateOne(
            { conference, key: 'about' },
            { $set: { data: aboutData, conference, key: 'about' } },
            { upsert: true }
        );
        console.log("Updated about section:", result);

    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
}

updateAboutSection();
