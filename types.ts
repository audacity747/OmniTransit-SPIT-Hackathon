
export enum TransitMode {
  METRO = 'METRO',
  TRAIN = 'LOCAL_TRAIN',
  BUS = 'BUS',
  AUTO = 'AUTO',
  CAB = 'CAB',
  WALK = 'WALK',
  SHARE_AUTO = 'SHARE_AUTO'
}

export enum RoutingPriority {
  CHEAPEST = 'CHEAPEST',
  FASTEST = 'FASTEST',
  LESS_WALK = 'LESS_WALK',
  SEAMLESS = 'SEAMLESS'
}

export interface RickshawDetail {
  standName: string;
  type: 'SHARE' | 'PRIVATE';
  queueLength: 'LOW' | 'MEDIUM' | 'HIGH';
  estimatedWait: number; // minutes
  estimatedFare: number;
}

export interface RouteLeg {
  id: string;
  mode: TransitMode;
  from: string;
  to: string;
  duration: number;
  description: string;
  line?: string;
  platform?: string;
  liveStatus?: string;
  progress?: number; 
  rickshawInfo?: RickshawDetail;
  navigationTip?: string; // "How to get to station" instructions
}

export interface RouteOption {
  id: string;
  mode: TransitMode[];
  duration: number; 
  cost: number; 
  distance: number; 
  interchanges: number;
  pulseStatus: 'NORMAL' | 'CROWDED' | 'DELAYED';
  pulseDescription: string;
  legs: RouteLeg[];
  priorityScore: Partial<Record<RoutingPriority, number>>;
}

export interface UserProfile {
  name: string;
  coins: number;
  trustScore: number;
  location: { lat: number; lng: number } | null;
}
