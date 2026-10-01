/** Live AppCrates projects — screenshots in /public/Web-Projects/
 *  Tile chrome matches appcrates-website.html (sticky scroll portfolio).
 */
export const PROJECTS = [
  {
    n: 'Booli',
    c: 'Web',
    ind: 'Real estate',
    h: "Sweden's largest selection of housing for sale",
    ac: '#e2442f',
    img: '/Web-Projects/Booli.jpeg',
    d: "Sweden's largest property search service, with listings, price history, neighbourhood analytics and agent connections.",
  },
  {
    n: 'Doktor24',
    c: 'Web',
    ind: 'Healthcare',
    h: 'Online doctor, 24/7, across Sweden',
    ac: '#0a0404',
    img: '/Web-Projects/doktor24.jpeg',
    d: 'Lifelong digital healthcare platform: online consultations, prescription renewals and medical history management.',
  },
  {
    n: 'Rezo Systems',
    c: 'Web',
    ind: 'Enterprise SaaS',
    h: 'Workflow automation that scales',
    ac: '#0f766e',
    img: '/Web-Projects/RezoSystem.jpeg',
    d: 'Enterprise workflow automation and business intelligence: scalable, cloud-native and integration-ready.',
  },
  {
    n: 'MyHolidayParks',
    c: 'Web',
    ind: 'Travel',
    h: 'Find your perfect holiday home',
    ac: '#1e7b3c',
    img: '/Web-Projects/MyHolidayParks.jpeg',
    d: 'Booking platform for holiday parks and vacation rentals across Europe, with real-time availability and secure payments.',
  },
  {
    n: 'Dormoa',
    c: 'Web',
    ind: 'Real estate',
    h: 'We select the best in London',
    ac: '#e2442f',
    img: '/Web-Projects/Dormoa.jpeg',
    d: "London's curated apartment search and rental platform, with handpicked listings, flexible dates and city-wide search.",
  },
  {
    n: 'Kind Laundry',
    c: 'Web',
    ind: 'On-demand services',
    h: 'Laundry & dry cleaning, on demand',
    ac: '#2f6fed',
    img: '/Web-Projects/KindLaundry.jpeg',
    d: 'On-demand laundry and dry-cleaning platform with scheduling, pickup tracking and customer accounts.',
  },
]

export const TILE_STYLE = {
  Booli: {
    bg: 'linear-gradient(150deg,#d9d2c8,#a99d8f)',
    ink: '#0a0404',
    img: 'linear-gradient(135deg,#c9b8a3,#6f5e4d)',
    dev: 'lap',
    tech: ['Re', 'No'],
  },
  Doktor24: {
    bg: 'linear-gradient(160deg,#0b0f14,#113d3b)',
    img: 'linear-gradient(135deg,#f6c0c6,#e57b8a)',
    dev: 'lap',
    tech: ['Nx', 'TS'],
  },
  'Rezo Systems': {
    bg: 'linear-gradient(145deg,#7d6cf2,#b38cf7 60%,#6246d8)',
    img: 'linear-gradient(135deg,#d7f0ee,#0f766e)',
    dev: 'lap',
    tech: ['No', 'Re', 'Aw', 'Tw'],
  },
  MyHolidayParks: {
    bg: 'linear-gradient(160deg,#e9f1e1,#b6cfa1)',
    ink: '#0a0404',
    img: 'linear-gradient(135deg,#bcd8a7,#3d7a2c)',
    dev: 'lap',
    tech: ['Re', 'Ph'],
  },
  Dormoa: {
    bg: 'linear-gradient(160deg,#20232b,#4a5566)',
    img: 'linear-gradient(180deg,#8fa3b8,#34404f)',
    dev: 'lap',
    tech: ['Re', 'No'],
  },
  'Kind Laundry': {
    bg: 'linear-gradient(160deg,#0f1b3d,#1e3a8a)',
    img: 'linear-gradient(135deg,#93c5fd,#1d4ed8)',
    dev: 'lap',
    tech: ['Re', 'No'],
  },
}
