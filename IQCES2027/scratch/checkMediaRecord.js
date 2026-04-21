const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.join(__dirname, '../.env') });

async function check() {
    await mongoose.connect(process.env.MONGODB_URI);
    const Media = mongoose.model('Media', new mongoose.Schema({
        data: String,
        mimetype: String,
        filename: String,
        size: Number
    }));
    
    const media = await Media.findById('69e75bd1e7bdb7a25b4174c0');
    if (!media) {
        console.log('Media not found');
    } else {
        console.log('Filename:', media.filename);
        console.log('Mimetype:', media.mimetype);
        console.log('Size:', media.size);
        console.log('Data length:', media.data?.length);
        console.log('Data starts with:', media.data?.substring(0, 50));
    }
    await mongoose.disconnect();
}
check();
