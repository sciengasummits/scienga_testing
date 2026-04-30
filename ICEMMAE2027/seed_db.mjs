import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('❌ MONGODB_URI not found in .env');
    process.exit(1);
}

// Define Schema
const siteContentSchema = new mongoose.Schema({
    conference: { type: String, required: true, index: true },
    key: { type: String, required: true, index: true },
    data: { type: mongoose.Schema.Types.Mixed, required: true },
    updatedAt: { type: Date, default: Date.now }
});

const SiteContent = mongoose.models.SiteContent || mongoose.model('SiteContent', siteContentSchema);

const icemmae2027Defaults = [
    {
        key: 'hero',
        data: {
            subtitle: 'INTERNATIONAL CONFERENCE ON',
            title: 'ENERGY, MATERIALS, MECHANICAL,\nAEROSPACE ENGINEERING',
            description: 'International Conference on Energy, Materials, Mechanical, Aerospace Engineering, where global experts unite to shape the future of engineering. Discover ground-breaking technologies, connect with top researchers, and explore solutions transforming our world.',
            conferenceDate: 'February 2027',
            venue: 'Munich, Germany',
            countdownTarget: '2027-02-15T09:00:00+01:00',
            showRegister: true,
            showAbstract: true,
            showBrochure: true
        }
    },
    {
        key: 'about',
        data: {
            subtitle: 'Energy, Materials, Mechanical, Aerospace Engineering',
            title: 'About The Conference',
            paragraph1: 'The International Conference on Energy, Materials, Mechanical, Aerospace Engineering is a premier international platform dedicated to advancing the understanding of engineering innovations and their transformative applications across multiple disciplines.',
            paragraph2: 'This conference brings together leading researchers, academicians, engineers, and industry professionals to explore recent developments, theoretical foundations, and real-world applications in energy systems, materials science, mechanical engineering, and aerospace technology.',
            objectives: [
                'Promote advancements in engineering research',
                'Explore innovations in energy and materials technology',
                'Discuss computational and experimental approaches',
                'Bridge academia and industry in engineering research',
                'Encourage collaboration across aerospace, mechanical, and energy engineering domains'
            ],
            keyThemes: [
                'Renewable Energy Systems',
                'Advanced Materials and Composites',
                'Aerospace Engineering and Propulsion',
                'Mechanical Systems Design',
                'Energy Storage and Conversion',
                'Computational Engineering and AI Applications'
            ]
        }
    },
    {
        key: 'importantDates',
        data: {
            dates: [
                { month: 'JUN', day: '15', year: '2026', event: 'Abstract Submission Opens', icon: 'CalendarDays' },
                { month: 'SEP', day: '25', year: '2026', event: 'Early Bird Deadline', icon: 'CheckCircle' },
                { month: 'OCT', day: '30', year: '2026', event: 'Submission Deadline', icon: 'Clock' },
                { month: 'DEC', day: '14', year: '2026', event: 'Conference Date', icon: 'Star', sub: 'December 14-16, 2026, Singapore' }
            ]
        }
    },
    {
        key: 'stats',
        data: {
            title: 'ICEMMAE2027 CONFERENCES APPROACH',
            items: [
                { number: '15+', label: 'Years Experience' },
                { number: '100+', label: 'Events' },
                { number: '200+', label: 'Onsite Approach' },
                { number: '2000+', label: 'Speakers' },
                { number: '5000+', label: 'Attendees' },
                { number: '20+', label: 'Exhibitors' },
                { number: '150+', label: 'Countries' },
                { number: '2000+', label: 'Publications' }
            ]
        }
    },
    {
        key: 'pricing',
        data: {
            title: 'REGISTRATION PRICING',
            packages: [
                {
                    title: 'Speaker',
                    price: '799',
                    currency: 'USD',
                    features: ['Oral Presentation', 'Networking with Fellow Speakers', 'E-Abstract Book', 'Certificate of Attendance', 'Conference Schedule Handout', 'Access to All Sessions and Workshops', 'Lunch and Coffee Breaks']
                },
                {
                    title: 'Delegate',
                    price: '899',
                    currency: 'USD',
                    features: ['Delegate Opportunities', 'Connect with Fellow Delegates', 'E-Abstract Book', 'Certificate of Attendance', 'Conference Schedule Handout', 'Access to All Sessions and Workshops', 'Lunch and Coffee Breaks']
                },
                {
                    title: 'Student',
                    price: '499',
                    currency: 'USD',
                    features: ['Student Presentation', 'Meet Our Experts', 'E-Abstract Book', 'Certificate of Attendance', 'Conference Schedule Handout', 'Access to All Sessions and Workshops', 'Lunch and Coffee Breaks']
                }
            ]
        }
    },
    {
        key: 'sessions',
        data: {
            sessions: [
                'Renewable Energy Systems',
                'Advanced Materials and Composites',
                'Aerospace Propulsion Systems',
                'Mechanical Systems Design',
                'Energy Storage Technologies',
                'Computational Engineering',
                'Sustainable Manufacturing',
                'Aerospace Structures',
                'Materials Characterization',
                'Thermal Management Systems',
                'Energy Conversion Systems',
                'Experimental Methods in Engineering',
                'Ocean Engineering Applications',
                'DNS and LES of Turbulent Flows',
                'Instability and Transition in Fluid Flows',
                'Boundary Layer Vortex Structures',
                'Coherent Structures in Turbulence',
                'Multi-Scale Vortex Interactions',
                'Particle Tracking in Vortical Flows',
                'Wake Dynamics and Control',
                'Biofluid Mechanics and Vortex Patterns',
                'Vortex-Induced Vibrations',
                'Flow Visualization Techniques',
                'Machine Learning for Fluid Mechanics',
                'Green Energy & Vortex Dynamics'
            ],
            schedule: {
                day1: [
                    { time: '8.30 ? 9.00', program: 'Registration' },
                    { time: '9.00 ? 9.30', program: 'Conference Inauguration' },
                    { time: '9.30 ? 11.00', program: 'Plenary Sessions' },
                    { time: '11.00 ? 11.20', program: 'Tea/Coffee Break' },
                    { time: '11.20 ? 13.00', program: 'Plenary Sessions' },
                    { time: '13.00 ? 13.10', program: 'Group Photograph' },
                    { time: '13.10 ? 14.00', program: 'Lunch' },
                    { time: '14.00 ? 15.40', program: 'Keynote Sessions' },
                    { time: '15.40 ? 16.00', program: 'Tea/Coffee Break' },
                    { time: '16.00 ? 17.30', program: 'Keynote Sessions' },
                    { time: '17.30 ? 18.30', program: 'Workshop' }
                ],
                day2: [
                    { time: '9.00 ? 10.30', program: 'Scientific Sessions' },
                    { time: '10.30 ? 10.50', program: 'Tea/Coffee Break' },
                    { time: '10.50 ? 13.00', program: 'Poster Presentations' },
                    { time: '13.00 ? 14.00', program: 'Lunch' },
                    { time: '14.00 ? 15.30', program: 'Panel Discussions' },
                    { time: '15.30 ? 16.00', program: 'Award Ceremony & Closing' }
                ],
                day3: [
                    { time: '9.00 ? 10.30', program: 'Networking Session' },
                    { time: '10.30 ? 11.00', program: 'Tea/Coffee Break' },
                    { time: '11.00 ? 12.30', program: 'Future Trends Workshop' },
                    { time: '12.30 ? 13.30', program: 'Lunch' },
                    { time: '13.30 ? 15.00', program: 'Final Remarks & Departure' }
                ]
            }
        }
    },
    {
        key: 'venue',
        data: {
            title: 'Conference Venue',
            name: 'Munich, Germany',
            address: 'Munich, Germany',
            description: 'A world-class conference venue in Munich, Germany, offering state-of-the-art facilities for an international engineering conference.',
            images: [
                'https://images.unsplash.com/photo-1540575861501-7ad05823c93e?w=1920&q=80',
                'https://images.unsplash.com/photo-1512470876302-972fad2aa9dd?w=1920&q=80',
                'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1920&q=80'
            ]
        }
    },
    {
        key: 'marquee',
        data: {
            title: 'Supporting Universities & Institutions',
            items: [
                'University of Texas at Arlington',
                'Peking University',
                'Tsinghua University',
                'National University of  Munich, Germany',
                'MIT',
                'Stanford University',
                'ETH Zurich',
                'Imperial College London',
                'Caltech',
                'University of Cambridge'
            ]
        }
    },
    {
        key: 'contact',
        data: {
            email: 'icmmae@sciengasummits.com',
            phone: '+49 0000 0000',
            address: 'Munich, Germany',
            socialLinks: {
                facebook: '',
                twitter: '',
                linkedin: '',
                instagram: ''
            }
        }
    },
    {
        key: 'heroChairs',
        data: [
            { id: 1, name: 'Dr. John Smith', affiliation: 'Technical University of Munich', country: 'Germany', title: 'Conference Chairman' },
            { id: 2, name: 'Dr. Maria Schmidt', affiliation: 'RWTH Aachen University', country: 'Germany', title: 'Conference Co-chairman' },
            { id: 3, name: 'Dr. Robert Johnson', affiliation: 'University of Stuttgart', country: 'Germany', title: 'Conference Co-chairman' }
        ]
    },
    {
        key: 'brochure',
        data: {
            title: 'International Conference on Energy, Materials, Mechanical, Aerospace Engineering',
            description: 'Download the official conference brochure to get comprehensive information about the International Conference on Energy, Materials, Mechanical, Aerospace Engineering. It serves as your complete guide to the event, featuring detailed schedules, speaker profiles, and venue information.',
            note: '* PDF will be available soon. Format: PDF',
            features: [
                'Complete 3-Day Program Schedule',
                'Keynote Speaker Biographies & Topics',
                'Workshop & Breakout Session Details',
                'Venue Maps & Accommodation Guide',
                'Sponsorship & Exhibition Opportunities'
            ]
        }
    },
    {
        key: 'partners_logos',
        data: {
            title: 'Promoting & Media Partners',
            items: []
        }
    },
    {
        key: 'registration-prices',
        data: {
            earlyBirdEndDate: '2026-11-25',
            standardEndDate: '2026-12-30',
            onspotEndDate: '2027-02-11',
            categories: [
                { id: 'speaker', label: 'Speaker Registration', early: 599, standard: 699, onspot: 799 },
                { id: 'delegate', label: 'Delegate Registration', early: 699, standard: 799, onspot: 899 },
                { id: 'poster', label: 'Poster Registration', early: 399, standard: 499, onspot: 599 },
                { id: 'student', label: 'Student', early: 299, standard: 399, onspot: 499 },
                { id: 'virtual', label: 'Virtual (Online)', early: 200, standard: 300, onspot: 400 }
            ],
            accommodation: [
                { nights: 2, single: 360, double: 400, triple: 440 },
                { nights: 3, single: 540, double: 600, triple: 660 },
                { nights: 4, single: 720, double: 800, triple: 880 },
                { nights: 5, single: 900, double: 1000, triple: 1100 }
            ],
            sponsorships: [
                { id: 'platinum', label: 'Platinum Sponsor', price: 4999 },
                { id: 'diamond', label: 'Diamond Sponsor', price: 3999 },
                { id: 'gold', label: 'Gold Sponsor', price: 2999 },
                { id: 'exhibitor', label: 'Exhibitor', price: 1999 }
            ],
            accompanyingPersonPrice: 249,
            processingFeePercent: 5
        }
    }
];

async function seed() {
    try {
        console.log('⏳ Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected');

        for (const item of icemmae2027Defaults) {
            console.log(`📦 Seeding ${item.key}...`);
            await SiteContent.findOneAndUpdate(
                { conference: 'icemmae2027', key: item.key },
                { $set: { data: item.data, updatedAt: new Date() } },
                { upsert: true, new: true }
            );
        }

        console.log('✨ Seeding complete!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Seeding failed:', error);
        process.exit(1);
    }
}

seed();
