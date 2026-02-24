import { useState } from 'react';
import {
  LayoutDashboard,
  Home,
  Info,
  Calendar,
  Layers,
  Tag,
  Users,
  Mic,
  Megaphone,
  Mail,
  Star,
  Presentation,
  Upload,
  ClipboardList,
  Briefcase,
  Radio,
  Mailbox,
  MapPin,
  Building,
  BedDouble,
  Image as ImageIcon,
  FileEdit,
  Clipboard,
  FileText,
  Link,
  Ban,
  FileDown,
  CreditCard,
  Receipt,
  ScrollText,
  RefreshCw,
  BarChart2,
  CheckCircle,
  ChevronRight
} from 'lucide-react';

const iconSize = 20;
const childIconSize = 16;

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={iconSize} />, active: true },
  {
    id: 'homepage', label: 'Home Page', icon: <Home size={iconSize} />,
    children: [
      { id: 'about-conference', label: 'About Conference', icon: <Info size={childIconSize} /> },
      { id: 'important-dates', label: 'Important Dates', icon: <Calendar size={childIconSize} /> },
      { id: 'tracks', label: 'Tracks', icon: <Layers size={childIconSize} /> },
    ]
  },
  { id: 'metatags', label: 'Meta Tags', icon: <Tag size={iconSize} /> },
  { id: 'committee', label: 'Organizing Committee', icon: <Users size={iconSize} /> },
  {
    id: 'speakers', label: 'Speakers', icon: <Mic size={iconSize} />,
    children: [
      { id: 'plenary', label: 'Plenary Speakers', icon: <Mic size={childIconSize} /> },
      { id: 'keynote', label: 'Keynote Speakers', icon: <Megaphone size={childIconSize} /> },
      { id: 'invited', label: 'Invited Speakers', icon: <Mail size={childIconSize} /> },
      { id: 'featured', label: 'Featured Speakers', icon: <Star size={childIconSize} /> },
      { id: 'posters', label: 'Posters', icon: <Presentation size={childIconSize} /> },
    ]
  },
  { id: 'uploadpdf', label: 'Upload PDFs', icon: <Upload size={iconSize} /> },
  { id: 'dailyupdate', label: 'Daily Update', icon: <ClipboardList size={iconSize} /> },
  {
    id: 'partners', label: 'Partners', icon: <Briefcase size={iconSize} />,
    children: [
      { id: 'sponsors', label: 'Sponsors', icon: <Briefcase size={childIconSize} /> },
      { id: 'mediapartners', label: 'Media Partners', icon: <Radio size={childIconSize} /> },
    ]
  },
  { id: 'mailbox', label: 'Mail Box', icon: <Mailbox size={iconSize} /> },
  {
    id: 'location', label: 'Location', icon: <MapPin size={iconSize} />,
    children: [
      { id: 'venue-hospitality', label: 'Venue Hospitality', icon: <Building size={childIconSize} /> },
      { id: 'accommodation', label: 'Accommodation', icon: <BedDouble size={childIconSize} /> },
    ]
  },
  {
    id: 'glimpses', label: 'Previous Glimpses', icon: <ImageIcon size={iconSize} />,
    children: [
      { id: 'prev-glimpses', label: 'Previous Glimpses', icon: <ImageIcon size={childIconSize} /> },
    ]
  },
  {
    id: 'registrations', label: 'Registrations & Abstracts', icon: <FileEdit size={iconSize} />,
    children: [
      { id: 'view-registrations', label: 'View Registrations', icon: <Clipboard size={childIconSize} /> },
      { id: 'view-abstracts', label: 'View Abstracts', icon: <FileText size={childIconSize} /> },
      { id: 'payment-link', label: 'Generate Payment Link', icon: <Link size={childIconSize} /> },
      { id: 'export-conf-unsubscribes', label: 'Export Conference Unsubscribes', icon: <Ban size={childIconSize} /> },
      { id: 'export-unsubscribes', label: 'Export Global Unsubscribes', icon: <FileDown size={childIconSize} /> },
    ]
  },
  { id: 'discount', label: 'Discount', icon: <CreditCard size={iconSize} /> },
  { id: 'invoices', label: 'Invoices', icon: <Receipt size={iconSize} /> },
  { id: 'receipts', label: 'Receipts', icon: <ScrollText size={iconSize} /> },
  {
    id: 'workupdates', label: 'Work Updates', icon: <RefreshCw size={iconSize} />,
    children: [
      { id: 'work-reports', label: 'Work Reports', icon: <BarChart2 size={childIconSize} /> },
      { id: 'positives', label: 'Positives', icon: <CheckCircle size={childIconSize} /> },
    ]
  },
];

export default function Sidebar({ collapsed, activeNav, onNavClick }) {
  const [openMenus, setOpenMenus] = useState({});

  const toggleMenu = (id) => {
    setOpenMenus(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <aside className={`sidebar${collapsed ? ' collapsed' : ''}`}>
      {/* Logo */}
      <div className="sidebar-logo">
        <div className="logo-icon">SC<br />Summit</div>
        <div className="logo-text">
          <span className="brand">Scienga</span>
          <span className="sub">Summits</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        {NAV_ITEMS.map(item => (
          <div className="nav-item" key={item.id}>
            <div
              className={`nav-link${activeNav === item.id ? ' active' : ''}${item.children && openMenus[item.id] ? ' open' : ''}`}
              onClick={() => {
                if (item.children) {
                  toggleMenu(item.id);
                } else {
                  onNavClick(item.id);
                }
              }}
              title={collapsed ? item.label : ''}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
              {item.children && <span className="chevron"><ChevronRight size={14} /></span>}
            </div>

            {item.children && (
              <div className={`submenu${openMenus[item.id] && !collapsed ? ' open' : ''}`}>
                {item.children.map(child => (
                  <div
                    key={child.id}
                    className={`nav-link${activeNav === child.id ? ' active' : ''}`}
                    onClick={() => onNavClick(child.id)}
                  >
                    <span className="nav-icon">{child.icon}</span>
                    <span className="nav-label">{child.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
}
