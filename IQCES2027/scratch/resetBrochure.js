const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.join(__dirname, '../.env') });

async function reset() {
    await mongoose.connect(process.env.MONGODB_URI);
    const SiteContent = mongoose.model('SiteContent', new mongoose.Schema({}, { strict: false }));
    
    // Clear the broken brochure URL from all keys
    await SiteContent.updateOne({ conference: 'iqce2027', key: 'hero' }, { $set: { 'data.brochureUrl': '' } });
    await SiteContent.updateOne({ conference: 'iqce2027', key: 'pdfs' }, { $set: { 'data.brochure': '' } });
    await SiteContent.updateOne({ conference: 'iqce2027', key: 'brochure' }, { $set: { 'data.pdfUrl': '' } });
    
    console.log('Broken brochure links cleared from database');
    await mongoose.disconnect();
}
reset();
