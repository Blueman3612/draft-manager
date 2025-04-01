'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';
import DraftTable from '@/components/draft/DraftTable';
import PlayerSelection from '@/components/draft/PlayerSelection';
import { 
  mockTeams, 
  mockDraftPicks,
  mockPlayers,
  getAvailablePlayers,
  getFormattedDraftPicks,
  getTeamName,
  getCurrentPick
} from '@/lib/mockData';
import { Player } from '@/lib/types';

export default function TeamDraftPage({ params }: { params: { teamId: string } }) {
  const { teamId } = params;
  const [draftPicks, setDraftPicks] = useState(mockDraftPicks);
  const [availablePlayers, setAvailablePlayers] = useState(getAvailablePlayers());
  
  const teamName = getTeamName(teamId);
  const currentPick = getCurrentPick();
  const isTeamsTurn = currentPick.teamId === teamId;
  
  const handleSelectPlayer = (player: Player) => {
    if (!isTeamsTurn) {
      alert("It's not your team's turn to draft");
      return;
    }
    
    // This is just a wireframe simulation
    alert(`Drafted ${player.name} for ${teamName}`);
  };
  
  // Get drafted players for this team
  const teamRoster = draftPicks
    .filter(pick => pick.team_id === teamId)
    .map(pick => {
      const player = mockPlayers.find(p => p.id === pick.player_id);
      return {
        ...pick,
        playerName: player ? player.name : 'Unknown',
        position: player ? player.position : 'Unknown'
      };
    });
  
  return (
    <main className="min-h-screen">
      <Header userRole="manager" teamName={teamName} />
      
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">DRAFT BOARD</h1>
          
          {isTeamsTurn ? (
            <div className="bg-green-100 text-green-800 px-4 py-2 rounded-md">
              YOUR PICK: #{currentPick.pickNumber}
            </div>
          ) : (
            <div className="text-gray-500">
              Waiting for pick #{currentPick.pickNumber} ({getTeamName(currentPick.teamId)})
            </div>
          )}
        </div>
        
        <div className="mb-8">
          <DraftTable draftPicks={draftPicks} />
        </div>
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3">AVAILABLE PLAYERS</h2>
          <PlayerSelection 
            players={availablePlayers} 
            onSelectPlayer={handleSelectPlayer} 
          />
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-3">YOUR TEAM</h2>
          <div className="border rounded-md overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-2 px-4 text-left">Name</th>
                  <th className="py-2 px-4 text-left">Position</th>
                  <th className="py-2 px-4 text-left">Pick #</th>
                </tr>
              </thead>
              <tbody>
                {teamRoster.map((pick) => (
                  <tr key={pick.id} className="border-b border-gray-100">
                    <td className="py-2 px-4">{pick.playerName}</td>
                    <td className="py-2 px-4">{pick.position}</td>
                    <td className="py-2 px-4">#{pick.pick_number}</td>
                  </tr>
                ))}
                {teamRoster.length === 0 && (
                  <tr>
                    <td colSpan={3} className="py-4 text-center text-gray-500">
                      No players drafted yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
} 