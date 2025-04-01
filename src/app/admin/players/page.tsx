'use client';

import { useState } from 'react';
import { mockPlayers, mockDraftPicks, getTeamName } from '@/lib/mockData';
import { Player } from '@/lib/types';

export default function PlayerManagementPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [positionFilter, setPositionFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  
  const positions = Array.from(new Set(mockPlayers.map(p => p.position)));
  
  const filteredPlayers = mockPlayers.filter(player => {
    const matchesSearch = player.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPosition = !positionFilter || player.position === positionFilter;
    const matchesStatus = !statusFilter || 
      (statusFilter === 'available' && player.available) || 
      (statusFilter === 'drafted' && !player.available);
    return matchesSearch && matchesPosition && matchesStatus;
  });
  
  // Find team for drafted players
  const getPlayerTeam = (playerId: string) => {
    const draftPick = mockDraftPicks.find(pick => pick.player_id === playerId);
    return draftPick ? getTeamName(draftPick.team_id) : '-';
  };
  
  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">PLAYER MANAGEMENT</h1>
        <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100">
          + Add Player
        </button>
      </div>
      
      <div className="mb-6">
        <div className="p-4 border rounded-md">
          <div className="flex flex-wrap gap-4">
            <input
              type="text"
              placeholder="Search players..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md flex-1"
            />
            
            <select
              value={positionFilter}
              onChange={(e) => setPositionFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="">All Positions</option>
              {positions.map(position => (
                <option key={position} value={position}>{position}</option>
              ))}
            </select>
            
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="">All Status</option>
              <option value="available">Available</option>
              <option value="drafted">Drafted</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="mb-8">
        <div className="border rounded-md overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-2 px-4 text-left">Name</th>
                <th className="py-2 px-4 text-left">Position</th>
                <th className="py-2 px-4 text-left">Status</th>
                <th className="py-2 px-4 text-left">Team</th>
                <th className="py-2 px-4 text-left"></th>
              </tr>
            </thead>
            <tbody>
              {filteredPlayers.map((player) => (
                <tr key={player.id} className="border-b border-gray-100">
                  <td className="py-2 px-4">{player.name}</td>
                  <td className="py-2 px-4">{player.position}</td>
                  <td className="py-2 px-4">
                    <span 
                      className={`px-2 py-1 rounded-full text-xs ${
                        player.available 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {player.available ? 'Available' : 'Drafted'}
                    </span>
                  </td>
                  <td className="py-2 px-4">{getPlayerTeam(player.id)}</td>
                  <td className="py-2 px-4">
                    <button className="text-gray-600 hover:text-gray-900">⋮</button>
                  </td>
                </tr>
              ))}
              {filteredPlayers.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-4 text-center text-gray-500">
                    No players found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      <div>
        <h2 className="text-xl font-semibold mb-3">IMPORT/EXPORT</h2>
        <div className="border rounded-md p-4">
          <div className="flex gap-4">
            <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100">
              Import CSV
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100">
              Export CSV
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}