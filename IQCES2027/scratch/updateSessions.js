const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.join(__dirname, '../.env') });

async function update() {
    await mongoose.connect(process.env.MONGODB_URI);
    const SiteContent = mongoose.model('SiteContent', new mongoose.Schema({}, { strict: false }));
    
    const sessions = [
        'Quantum Computing Algorithms',
        'Quantum Cryptography & Security',
        'Quantum Information Theory',
        'Superconducting Quantum Circuits',
        'Trapped Ion Quantum Computing',
        'Photonic Quantum Technologies',
        'Quantum Sensing & Metrology',
        'Topological Quantum Computation',
        'Quantum Error Correction',
        'Industrial Applications of Quantum',
        'Quantum Machine Learning',
        'Quantum Networking & Communication',
        'Ethics in Quantum Computing',
        'Quantum Materials Science'
    ];

    // Get current sessions doc to keep schedule
    let doc = await SiteContent.findOne({ conference: 'iqce2027', key: 'sessions' });
    if (!doc) {
        doc = new SiteContent({ 
            conference: 'iqce2027', 
            key: 'sessions', 
            data: { 
                sessions, 
                days: [
                    { title: 'Day 1', id: 'day1', rows: [
                        { time: '8.30 – 9.00', program: 'Registration' },
                        { time: '9.00 – 9.30', program: 'Conference Inauguration' },
                        { time: '9.30 – 11.00', program: 'Plenary Sessions' },
                        { time: '11.00 – 11.20', program: 'Tea/Coffee Break' },
                        { time: '11:20 – 13.00', program: 'Plenary Sessions' },
                        { time: '13.00 – 13.10', program: 'Group Photograph' },
                        { time: '13.10 – 14.00', program: 'Lunch' },
                        { time: '14.00 – 15.40', program: 'Keynote Sessions' },
                        { time: '15.40 – 16.00', program: 'Tea/Coffee Break' },
                        { time: '16.00 – 17.30', program: 'Keynote Sessions' },
                        { time: '17.30 – 18.30', program: 'Workshop' }
                    ] },
                    { title: 'Day 2', id: 'day2', rows: [
                        { time: '9.00 – 10.30', program: 'Scientific Sessions' },
                        { time: '10.30 – 10.50', program: 'Tea/Coffee Break' },
                        { time: '10.50 – 13.00', program: 'Poster Presentations' },
                        { time: '13.00 – 14.00', program: 'Lunch' },
                        { time: '14.00 – 15.30', program: 'Panel Discussions' },
                        { time: '15.30 – 16.00', program: 'Award Ceremony & Closing' }
                    ] },
                    { title: 'Day 3', id: 'day3', rows: [
                        { time: '9.00 – 10.30', program: 'Networking Session' },
                        { time: '10.30 – 11.00', program: 'Tea/Coffee Break' },
                        { time: '11.00 – 12.30', program: 'Future Trends Workshop' },
                        { time: '12.30 – 13.30', program: 'Lunch' },
                        { time: '13.30 – 15.00', program: 'Final Remarks & Departure' }
                    ] }
                ]
            } 
        });
    } else {
        const newData = { ...doc.toObject().data, sessions };
        doc.data = newData;
        doc.markModified('data');
    }
    
    await doc.save();
    console.log('Sessions updated successfully in MongoDB');
    await mongoose.disconnect();
}
update();
