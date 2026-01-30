
import { TransitMode, RouteOption, RouteLeg, RoutingPriority } from '../types';

export interface Station {
  name: string;
  line: 'WESTERN' | 'CENTRAL' | 'HARBOUR' | 'METRO_1' | 'BUS' | 'ROAD';
  isHub: boolean;
}

export const MUMBAI_STATIONS: Station[] = [
  { name: 'Churchgate', line: 'WESTERN', isHub: true },
  { name: 'Dadar', line: 'WESTERN', isHub: true },
  { name: 'Andheri', line: 'WESTERN', isHub: true },
  { name: 'Borivali', line: 'WESTERN', isHub: true },
  { name: 'CSMT', line: 'CENTRAL', isHub: true },
  { name: 'Kurla', line: 'CENTRAL', isHub: true },
  { name: 'Ghatkopar', line: 'CENTRAL', isHub: true },
  { name: 'Thane', line: 'CENTRAL', isHub: true },
  { name: 'Vashi', line: 'HARBOUR', isHub: true },
  { name: 'BKC', line: 'ROAD', isHub: true },
  { name: 'Powai', line: 'ROAD', isHub: true },
];

export function calculateMumbaiRoute(source: string, destination: string, priority: RoutingPriority = RoutingPriority.FASTEST): RouteOption[] {
  const routes: RouteOption[] = [];

  // --- OPTION 1: FASTEST (Metro + Train) ---
  routes.push({
    id: 'fastest-1',
    mode: [TransitMode.AUTO, TransitMode.TRAIN, TransitMode.METRO],
    duration: 52,
    cost: 85,
    distance: 36,
    interchanges: 2,
    pulseStatus: 'NORMAL',
    pulseDescription: 'Optimized for speed. Uses Metro Line 1 to bypass Dadar traffic.',
    legs: [
      {
        id: 'f-l1',
        mode: TransitMode.AUTO,
        from: source,
        to: `${source} Station`,
        duration: 12,
        description: 'Auto-rickshaw from current location.',
        rickshawInfo: {
          standName: `${source} West Stand`,
          type: 'PRIVATE',
          queueLength: 'LOW',
          estimatedWait: 2,
          estimatedFare: 35
        },
        navigationTip: 'Walk 100m to the main gate for the private auto stand.'
      },
      {
        id: 'f-l2',
        mode: TransitMode.TRAIN,
        from: source,
        to: 'Ghatkopar',
        line: 'Central Fast',
        duration: 15,
        description: 'Board Fast Local towards CSMT.',
        platform: 'PF 4',
        progress: 100,
        liveStatus: 'Arrived'
      },
      {
        id: 'f-l3',
        mode: TransitMode.METRO,
        from: 'Ghatkopar',
        to: 'Andheri',
        line: 'Metro 1',
        duration: 25,
        description: 'Take Metro towards Versova. Get off at Andheri.',
        navigationTip: 'Follow the Blue markings for direct bridge access from Train PF 1.'
      }
    ],
    priorityScore: { [RoutingPriority.FASTEST]: 10, [RoutingPriority.LESS_WALK]: 7 }
  });

  // --- OPTION 2: CHEAPEST (Bus + Share Auto) ---
  routes.push({
    id: 'cheapest-1',
    mode: [TransitMode.SHARE_AUTO, TransitMode.BUS],
    duration: 95,
    cost: 45,
    distance: 34,
    interchanges: 1,
    pulseStatus: 'CROWDED',
    pulseDescription: 'Budget friendly. Expect crowds in BEST Route 440.',
    legs: [
      {
        id: 'c-l1',
        mode: TransitMode.SHARE_AUTO,
        from: source,
        to: 'Bus Depot',
        duration: 10,
        description: 'Share Auto to the nearest Depot.',
        rickshawInfo: {
          standName: 'Market Junction Share Stand',
          type: 'SHARE',
          queueLength: 'MEDIUM',
          estimatedWait: 8,
          estimatedFare: 20
        }
      },
      {
        id: 'c-l2',
        mode: TransitMode.BUS,
        from: 'Depot',
        to: destination,
        line: 'BEST 440 LTD',
        duration: 85,
        description: 'Bus towards target hub. Get off at Landmark Circle.',
        navigationTip: 'Board from the front door (LTD service). Sit on left for better breeze.',
        progress: 45,
        liveStatus: 'Delayed 5m'
      }
    ],
    priorityScore: { [RoutingPriority.CHEAPEST]: 10, [RoutingPriority.SEAMLESS]: 6 }
  });

  // --- OPTION 3: LEAST WALKING (Direct Road/Rickshaw) ---
  routes.push({
    id: 'road-direct',
    mode: [TransitMode.AUTO],
    duration: 75,
    cost: 320,
    distance: 30,
    interchanges: 0,
    pulseStatus: 'DELAYED',
    pulseDescription: 'Heavy congestion on Eastern Express Highway.',
    legs: [
      {
        id: 'r-l1',
        mode: TransitMode.AUTO,
        from: source,
        to: destination,
        duration: 75,
        description: 'Point-to-point Auto rickshaw journey.',
        rickshawInfo: {
          standName: 'Doorstep Pickup',
          type: 'PRIVATE',
          queueLength: 'LOW',
          estimatedWait: 5,
          estimatedFare: 320
        },
        liveStatus: 'Traffic: Red at Mulund'
      }
    ],
    priorityScore: { [RoutingPriority.LESS_WALK]: 10, [RoutingPriority.SEAMLESS]: 10 }
  });

  // Filter based on priority or return sorted
  return routes.sort((a, b) => (b.priorityScore[priority] || 0) - (a.priorityScore[priority] || 0));
}
