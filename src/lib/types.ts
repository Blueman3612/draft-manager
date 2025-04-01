export type User = {
  id: string;
  email: string;
  role: 'admin' | 'manager' | 'viewer';
};

export type Team = {
  id: string;
  name: string;
  manager_id: string;
};

export type Player = {
  id: string;
  name: string;
  position: string;
  stats: Record<string, any>;
  available: boolean;
};

export type DraftPick = {
  id: string;
  team_id: string;
  player_id: string;
  pick_number: number;
  timestamp: string;
}; 