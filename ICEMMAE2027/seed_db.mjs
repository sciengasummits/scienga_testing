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
            paragraph1: 'The International Conference on Energy, Materials, Mechanical, and Aerospace Engineering (ICEMMAE2027) is a premier global platform dedicated to advancing interdisciplinary research and innovations that are reshaping the future of engineering. Held in Munich, Germany — a world-class hub of engineering excellence — ICEMMAE2027 brings together the brightest minds across four critical engineering domains.',
            paragraph2: 'This conference unites leading researchers, academicians, engineers, and industry professionals to explore cutting-edge developments in sustainable energy systems, advanced materials science, precision mechanical engineering, and next-generation aerospace technologies. Participants will benefit from keynote lectures, technical paper presentations, workshops, and extensive networking opportunities.',
            objectives: [
                'Promote interdisciplinary research in energy, materials, mechanical, and aerospace engineering',
                'Showcase innovations in sustainable energy and advanced manufacturing',
                'Foster collaboration between academia, research institutions, and industry leaders',
                'Provide a platform for emerging researchers, postdoctoral fellows, and PhD students',
                'Facilitate publication of high-quality peer-reviewed engineering research'
            ],
            keyThemes: [
                'Thermodynamics & Heat Transfer Engineering',
                'Advanced Composite Materials & Alloys',
                'Aerospace Structures & Aeroelasticity',
                'Mechanical Vibrations & Dynamics',
                'Gas Dynamics & Propulsion Systems',
                'Computational Fluid Dynamics (CFD)',
                'Manufacturing Engineering & CNC Technology',
                'Smart Materials & Structural Health Monitoring',
                'Flight Mechanics & Avionics Systems',
                'Industrial Engineering & Quality Control'
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
                'Thermodynamics & Heat Transfer Engineering',
                'Advanced Composite Materials & Alloys',
                'Aerospace Structures & Aeroelasticity',
                'Mechanical Vibrations, Noise & Dynamics Control',
                'Materials Forming, Casting & Metal Processing',
                'Gas Dynamics & Compressible Flow Analysis',
                'Fracture Mechanics & Fatigue of Materials',
                'Flight Mechanics & Aircraft Control Systems',
                'Polymer Materials & Rubber Processing',
                'Turbomachinery & Gas Turbine Technology',
                'Manufacturing Engineering & CNC Technology',
                'Aerodynamics & Computational Fluid Dynamics',
                'Energy Systems, Boilers & Power Plants',
                'Smart Materials & Piezoelectric Structures',
                'Robotics, Mechatronics & Automation',
                'Finite Element Analysis & Structural Simulation',
                'Nanomaterials, Coatings & Surface Engineering',
                'Aerospace Avionics & Navigation Systems',
                'Engineering Design & Product Development',
                'Precision Engineering & Metrology',
                'Thermal Stress Analysis & Creep Behaviour',
                'Composite Laminate Design & Testing',
                'Aerospace Propulsion & Jet Engine Components',
                'Applied Mechanics & Elasticity Theory',
                'MEMS Devices & Micro-fabrication Technology',
                'Unmanned Aerial Vehicles (UAV) & Drones',
                'Failure Analysis & Non-Destructive Testing',
                'Biomechanics & Bio-inspired Engineering',
                'Industrial Safety Engineering & Risk Assessment',
                'Engineering Education, Innovation & R&D Trends'
            ],
            schedule: {
                day1: [
                    { time: '8.30 – 9.00', program: 'Registration & Welcome Kit Distribution' },
                    { time: '9.00 – 9.30', program: 'Conference Inauguration & Opening Ceremony' },
                    { time: '9.30 – 11.00', program: 'Plenary Sessions – Keynote Addresses' },
                    { time: '11.00 – 11.20', program: 'Tea/Coffee Break & Networking' },
                    { time: '11.20 – 13.00', program: 'Plenary Sessions – Invited Speakers' },
                    { time: '13.00 – 13.10', program: 'Group Photograph' },
                    { time: '13.10 – 14.00', program: 'Lunch Break' },
                    { time: '14.00 – 15.40', program: 'Technical Sessions – Energy & Materials' },
                    { time: '15.40 – 16.00', program: 'Tea/Coffee Break' },
                    { time: '16.00 – 17.30', program: 'Technical Sessions – Mechanical & Aerospace' },
                    { time: '17.30 – 18.30', program: 'Workshop / Panel Discussion' }
                ],
                day2: [
                    { time: '9.00 – 10.30', program: 'Scientific Sessions – Paper Presentations' },
                    { time: '10.30 – 10.50', program: 'Tea/Coffee Break' },
                    { time: '10.50 – 13.00', program: 'Poster Presentations & Exhibition' },
                    { time: '13.00 – 14.00', program: 'Lunch Break' },
                    { time: '14.00 – 15.30', program: 'Panel Discussions & Industry Talks' },
                    { time: '15.30 – 16.00', program: 'Award Ceremony & Closing of Day 2' }
                ],
                day3: [
                    { time: '9.00 – 10.30', program: 'Networking Session & Lab Tours' },
                    { time: '10.30 – 11.00', program: 'Tea/Coffee Break' },
                    { time: '11.00 – 12.30', program: 'Future Trends Workshop – Engineering Innovation' },
                    { time: '12.30 – 13.30', program: 'Lunch Break' },
                    { time: '13.30 – 15.00', program: 'Closing Ceremony, Certificate Distribution & Departure' }
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
            phone: '+91 7842090097',
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
    },
    {
        key: 'meta_tags',
        data: {
            home: {
                title: 'ICEMMAE2027 | International Conference on Energy, Materials, Mechanical, Aerospace Engineering',
                description: 'Join the premier International Conference on Energy, Materials, Mechanical, Aerospace Engineering (ICEMMAE2027) in Munich, Germany. February 2027.',
                keywords: 'ICEMMAE2027, Engineering Conference, Mechanical Engineering, Aerospace Engineering, Mechatronics, Munich Germany'
            },
            speakers: {
                title: 'Global Speakers | ICEMMAE2027',
                description: 'Distinguished keynote and plenary speakers at ICEMMAE2027, sharing innovations in energy, materials, and aerospace engineering.',
                keywords: 'Speakers, Keynote, Engineering Experts, ICEMMAE2027'
            },
            registration: {
                title: 'Registration | ICEMMAE2027',
                description: 'Register now for ICEMMAE2027. Early bird discounts available for speakers, delegates, and students.',
                keywords: 'Registration, Conference Fees, Early Bird, ICEMMAE2027'
            },
            venue: {
                title: 'Venue & Location | ICEMMAE2027',
                description: 'Explore the conference venue in Munich, Germany. Travel and accommodation details for ICEMMAE2027 participants.',
                keywords: 'Venue, Munich Germany, Travel, Accommodation'
            }
        }
    },
    {
        key: 'faq',
        data: {
            faqs: [
                {
                    question: 'What is ICEMMAE2027?',
                    answer: 'ICEMMAE2027 is the International Conference on Energy, Materials, Mechanical, and Aerospace Engineering, scheduled to be held in Munich, Germany from February 11–13, 2027. It is a premier global platform for researchers, engineers, and industry professionals.'
                },
                {
                    question: 'Who can attend ICEMMAE2027?',
                    answer: 'ICEMMAE2027 welcomes researchers, academicians, engineers, postdoctoral fellows, PhD students, and industry professionals from all over the world working in the fields of energy, materials, mechanical, and aerospace engineering.'
                },
                {
                    question: 'How do I submit an abstract?',
                    answer: 'You can submit your abstract through the official website by navigating to the Abstract Submission page. Abstracts should be within 300 words and clearly state the objectives, methodology, results, and conclusions of your research.'
                },
                {
                    question: 'What is the abstract submission deadline?',
                    answer: 'The abstract submission deadline is October 30, 2026. Early submissions are encouraged to allow time for review and revision.'
                },
                {
                    question: 'Will my paper be published?',
                    answer: 'Accepted papers will be published in peer-reviewed conference proceedings and considered for publication in reputed indexed international journals affiliated with ICEMMAE2027.'
                },
                {
                    question: 'What presentation modes are available?',
                    answer: 'Participants may present their work as oral presentations, poster presentations, or virtual presentations. The mode of presentation will be confirmed upon abstract acceptance.'
                },
                {
                    question: 'Is there a registration fee?',
                    answer: 'Yes, registration fees vary by category (Speaker, Delegate, Student, Virtual). Early bird discounts are available. Please refer to the Registration page for the full fee structure.'
                },
                {
                    question: 'Where is the conference venue?',
                    answer: 'ICEMMAE2027 will be held in Munich, Germany. Munich is well-connected by international flights and is one of Europe\'s leading cities for science, technology, and engineering.'
                },
                {
                    question: 'Do I need a visa to attend?',
                    answer: 'Depending on your country, you may require a Schengen Visa to attend the conference in Germany. An official invitation letter can be provided to registered participants to support your visa application.'
                },
                {
                    question: 'How do I contact the organizing committee?',
                    answer: 'You can reach the organizing committee at icmmae@sciengasummits.com or call +91 7842090097. Our team is happy to assist with any queries regarding registration, abstract submission, or travel.'
                }
            ]
        }
    },
    {
        key: 'venueContent',
        data: {
            title: 'Conference Venue',
            city: 'Munich',
            country: 'Germany',
            name: 'Munich International Conference Centre',
            address: 'Munich, Bavaria, Germany',
            description: 'ICEMMAE2027 will be held in Munich, Germany — one of Europe\'s leading cities for science, technology, and engineering. Munich is home to world-renowned institutions including the Technical University of Munich (TUM) and Ludwig Maximilian University, making it an ideal host city for this international engineering conference.',
            highlights: [
                'World-class conference facilities with modern lecture halls',
                'Advanced audio-visual and presentation equipment',
                'Dedicated networking lounges and exhibition halls',
                'Easy access by public transport, S-Bahn, and U-Bahn',
                'Surrounded by hotels in all budget categories',
                'Walking distance to Munich city centre attractions'
            ],
            gettingThere: {
                byAir: 'Munich Airport (MUC) is Germany\'s second-largest international airport, served by all major airlines with direct flights from Asia, Americas, Africa, and Europe.',
                byTrain: 'Munich Hauptbahnhof (Central Station) is connected to all major European cities via high-speed rail services.',
                byMetro: 'The venue is easily accessible by Munich S-Bahn (suburban rail) and U-Bahn (metro) networks. Multiple bus routes also serve the area.'
            },
            images: [
                'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=1200&q=80',
                'https://images.unsplash.com/photo-1540575861501-7ad05823c93e?w=1200&q=80',
                'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=1200&q=80'
            ]
        }
    },
    {
        key: 'visa-info',
        data: {
            title: 'Visa Information for ICEMMAE2027',
            country: 'Germany',
            visaType: 'Schengen Visa (Type C – Short Stay)',
            overview: 'To attend ICEMMAE2027 in Munich, Germany, most international participants will require a Schengen Visa. Germany is a member of the Schengen Area, so a valid Schengen Visa grants entry to all Schengen member states.',
            invitationLetter: 'Registered participants may request an official invitation letter from the organizing committee to support their visa application. Please contact us at icmmae@sciengasummits.com after completing your registration.',
            requirements: [
                'Valid passport with at least 6 months validity beyond your stay',
                'Completed Schengen Visa application form',
                'Passport-size photographs (as per specifications)',
                'Conference registration confirmation and invitation letter',
                'Proof of accommodation booking in Munich',
                'Return flight tickets or travel itinerary',
                'Proof of sufficient financial means (bank statements)',
                'Travel health insurance covering at least €30,000'
            ],
            process: [
                'Register for ICEMMAE2027 and receive your confirmation',
                'Request an official invitation letter from the organizers',
                'Book your accommodation in Munich',
                'Apply for a Schengen Visa at the German Embassy/Consulate in your country',
                'Submit all required documents at least 6–8 weeks before the conference',
                'Receive your visa and prepare for travel'
            ],
            note: 'Citizens of several countries may be eligible for visa-free entry into the Schengen Area. Please verify with your nearest German Embassy or Consulate whether you require a visa. The organizing committee does not bear responsibility for visa decisions made by immigration authorities.',
            contact: 'For invitation letters or further assistance, email icmmae@sciengasummits.com'
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
