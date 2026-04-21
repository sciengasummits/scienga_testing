const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.join(__dirname, '../.env') });

async function check() {
    await mongoose.connect(process.env.MONGODB_URI);
    const SiteContent = mongoose.model('SiteContent', new mongoose.Schema({}, { strict: false }));
    
    const docs = await SiteContent.find({ key: 'hero' });
    console.log(JSON.stringify(docs, null, 2));
    await mongoose.disconnect();
}
check();
