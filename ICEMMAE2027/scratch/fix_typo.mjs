import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const siteContentSchema = new mongoose.Schema({
    conference: String,
    key: String,
    data: mongoose.Schema.Types.Mixed,
    updatedAt: Date
});

const SiteContent = mongoose.models.SiteContent || mongoose.model('SiteContent', siteContentSchema);

async function run() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to DB');
        
        const result = await SiteContent.updateOne(
            { conference: 'icemmae2027', key: 'stats' },
            { $set: { 'data.title': 'ICEMMAE 2027 CONFERENCES APPROACH' } }
        );
        
        console.log('Update result:', result);
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

run();
