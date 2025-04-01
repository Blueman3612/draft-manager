import { Team, Player, DraftPick } from './types';

export const mockTeams: Team[] = [
  { id: '1', name: 'Red Sox', manager_id: 'user1' },
  { id: '2', name: 'Yankees', manager_id: 'user2' },
  { id: '3', name: 'Dodgers', manager_id: 'user3' },
  { id: '4', name: 'Cubs', manager_id: 'user4' },
];

export const mockPlayers: Player[] = [
  { 
    id: '1', 
    name: 'John Smith', 
    position: 'Pitcher', 
    stats: { ERA: 2.1, 'K/9': 9.5 }, 
    available: false 
  },
  { 
    id: '2', 
    name: 'Sarah Johnson', 
    position: 'Catcher', 
    stats: { AVG: .315, HR: 8 }, 
    available: false 
  },
  { 
    id: '3', 
    name: 'Mike Williams', 
    position: 'First Base', 
    stats: { AVG: .287, HR: 15 }, 
    available: false 
  },
  { 
    id: '4', 
    name: 'Jessica Brown', 
    position: 'Second Base', 
    stats: { AVG: .301, SB: 22 }, 
    available: false 
  },
  { 
    id: '5', 
    name: 'David Lee', 
    position: 'Third Base', 
    stats: { AVG: .275, HR: 12 }, 
    available: true 
  },
  { 
    id: '6', 
    name: 'Lisa Garcia', 
    position: 'Shortstop', 
    stats: { AVG: .291, SB: 18 }, 
    available: true 
  },
  { 
    id: '7', 
    name: 'Michael Taylor', 
    position: 'Outfield', 
    stats: { AVG: .265, HR: 20 }, 
    available: true 
  },
  { 
    id: '8', 
    name: 'James Wilson', 
    position: 'Outfield', 
    stats: { AVG: .305, SB: 25 }, 
    available: true 
  },
  { 
    id: '9', 
    name: 'Robert Miller', 
    position: 'Pitcher', 
    stats: { ERA: 3.2, 'K/9': 8.7 }, 
    available: true 
  },
  { 
    id: '10', 
    name: 'Emily Davis', 
    position: 'Catcher', 
    stats: { AVG: .280, HR: 5 }, 
    available: true 
  },
];

export const mockDraftPicks: DraftPick[] = [
  { 
    id: '1', 
    team_id: '1', 
    player_id: '1', 
    pick_number: 1, 
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString() 
  },
  { 
    id: '2', 
    team_id: '2', 
    player_id: '2', 
    pick_number: 2, 
    timestamp: new Date(Date.now() - 1000 * 60 * 25).toISOString() 
  },
  { 
    id: '3', 
    team_id: '3', 
    player_id: '3', 
    pick_number: 3, 
    timestamp: new Date(Date.now() - 1000 * 60 * 20).toISOString() 
  },
  { 
    id: '4', 
    team_id: '4', 
    player_id: '4', 
    pick_number: 4, 
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString() 
  },
];

// Helper function to get team name by ID
export function getTeamName(teamId: string): string {
  const team = mockTeams.find(t => t.id === teamId);
  return team ? team.name : 'Unknown Team';
}

// Helper function to get player name by ID
export function getPlayerName(playerId: string): string {
  const player = mockPlayers.find(p => p.id === playerId);
  return player ? player.name : 'Unknown Player';
}

// Helper function to get available players
export function getAvailablePlayers(): Player[] {
  return mockPlayers.filter(p => p.available);
}

// Helper function to get current pick and team
export function getCurrentPick(): { pickNumber: number, teamId: string } {
  const lastPick = mockDraftPicks[mockDraftPicks.length - 1];
  return {
    pickNumber: lastPick ? lastPick.pick_number + 1 : 1,
    teamId: lastPick ? mockTeams[lastPick.pick_number % mockTeams.length].id : '1'
  };
}

// Helpers to format draft picks with names
export function getFormattedDraftPicks(): Array<DraftPick & { teamName: string, playerName: string }> {
  return mockDraftPicks.map(pick => ({
    ...pick,
    teamName: getTeamName(pick.team_id),
    playerName: getPlayerName(pick.player_id)
  }));
} 