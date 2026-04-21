const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.join(__dirname, '../.env') });

async function check() {
    await mongoose.connect(process.env.MONGODB_URI);
    const Media = mongoose.model('Media', new mongoose.Schema({ data: String }));
    const media = await Media.findById('69e75bd1e7bdb7a25b4174c0');
    const b64 = media.data.split(',')[1];
    console.log(Buffer.from(b64, 'base64').toString());
    await mongoose.disconnect();
}
check();
