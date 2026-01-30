
import { TransitMode } from '../types';

export const CITIES = [
  { id: 'mumbai', name: 'Mumbai', hubs: ['Dadar', 'Churchgate', 'Andheri', 'CST', 'Thane', 'Borivali', 'Kurla', 'Kalyan'] }
];

export const MOCK_REPORTS = [
  {
    id: 'rep1',
    type: 'CROWD',
    location: 'Dadar Platform 1',
    description: 'Extreme crush load for the 9:15 Borivali Fast. Better take the 9:22 Slow.',
    timestamp: new Date(),
    verified: true,
    consensusCount: 154,
    lat: 19.0178,
    lng: 72.8478
  },
  {
    id: 'rep2',
    type: 'DELAY',
    location: 'Kurla Station (Harbour Side)',
    description: 'Signal failure at Vadala. Harbour line trains running 15-20 mins late.',
    timestamp: new Date(),
    verified: true,
    consensusCount: 82,
    lat: 19.0652,
    lng: 72.8793
  }
];
