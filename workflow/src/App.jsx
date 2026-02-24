import { useState } from 'react';
import Login from './pages/Login';
import { Info } from 'lucide-react';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import StatsGrid from './components/StatsGrid';
import AboutConference from './pages/AboutConference';
import OrganizingCommittee from './pages/OrganizingCommittee';
import PlenarySpeakers from './pages/PlenarySpeakers';
import KeynoteSpeakers from './pages/KeynoteSpeakers';
import InvitedSpeakers from './pages/InvitedSpeakers';
import FeaturedSpeakers from './pages/FeaturedSpeakers';
import Posters from './pages/Posters';
import ImportantDates from './pages/ImportantDates';
import Tracks from './pages/Tracks';
import MetaTags from './pages/MetaTags';
import UploadPdfs from './pages/UploadPdfs';
import DailyUpdate from './pages/DailyUpdate';
import Sponsors from './pages/Sponsors';
import MediaPartners from './pages/MediaPartners';
import VenueHospitality from './pages/VenueHospitality';
import Accommodation from './pages/Accommodation';
import PreviousGlimpses from './pages/PreviousGlimpses';
import ViewRegistrations from './pages/ViewRegistrations';
import ViewAbstracts from './pages/ViewAbstracts';
import GeneratePaymentLink from './pages/GeneratePaymentLink';
import Discount from './pages/Discount';
import Invoices from './pages/Invoices';
import Receipts from './pages/Receipts';
import WorkReports from './pages/WorkReports';
import Positives from './pages/Positives';

/* ── Simple page router ── */
function PageContent({ activeNav, setActiveNav }) {
  switch (activeNav) {
    case 'about-conference':
      return <AboutConference />;
    case 'committee':
      return <OrganizingCommittee />;
    case 'plenary':
      return <PlenarySpeakers />;
    case 'keynote':
      return <KeynoteSpeakers />;
    case 'invited':
      return <InvitedSpeakers />;
    case 'featured':
      return <FeaturedSpeakers />;
    case 'posters':
      return <Posters />;
    case 'important-dates':
      return <ImportantDates />;
    case 'tracks':
      return <Tracks />;
    case 'metatags':
      return <MetaTags />;
    case 'uploadpdf':
      return <UploadPdfs />;
    case 'dailyupdate':
      return <DailyUpdate />;
    case 'sponsors':
      return <Sponsors />;
    case 'mediapartners':
      return <MediaPartners />;
    case 'venue-hospitality':
      return <VenueHospitality />;
    case 'accommodation':
      return <Accommodation />;
    case 'prev-glimpses':
      return <PreviousGlimpses />;
    case 'view-registrations':
      return <ViewRegistrations />;
    case 'view-abstracts':
      return <ViewAbstracts />;
    case 'payment-link':
      return <GeneratePaymentLink />;
    case 'discount':
      return <Discount />;
    case 'invoices':
      return <Invoices />;
    case 'receipts':
      return <Receipts />;
    case 'work-reports':
      return <WorkReports />;
    case 'positives':
      return <Positives />;

    // Dashboard (default)
    default:
      return (
        <>
          <StatsGrid onCardClick={(id) => setActiveNav(id)} />
          <div className="note-banner">
            <Info size={20} className="note-icon" />
            <p>
              <strong>Note:</strong>
              {' **Session will be Logged out automatically after '}
              <strong>30 minutes</strong>
              {' of inactivity'}
            </p>
          </div>
        </>
      );
  }
}

export default function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [activeNav, setActiveNav] = useState('dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="app-layout">
      {/* Sidebar */}
      <Sidebar
        collapsed={collapsed}
        activeNav={activeNav}
        onNavClick={setActiveNav}
      />

      {/* Main */}
      <div className="main-wrapper">
        {/* Topbar */}
        <Topbar
          onToggleSidebar={() => setCollapsed(c => !c)}
          eventName="RENEWABLEMEET2026"
        />

        {/* Page content */}
        <main className="page-content">
          <PageContent activeNav={activeNav} setActiveNav={setActiveNav} />
        </main>

        {/* Footer */}
        <footer className="page-footer">
          <span>© Copyright 2025 <a href="#">Scienga Summits.</a></span>
        </footer>
      </div>
    </div>
  );
}
