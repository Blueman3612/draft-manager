'use client';

import { useState } from 'react';
import { Player } from '@/lib/types';

type PlayerSelectionProps = {
  players: Player[];
  onSelectPlayer: (player: Player) => void;
};

export default function PlayerSelection({ players, onSelectPlayer }: PlayerSelectionProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [positionFilter, setPositionFilter] = useState('');
  
  const positions = Array.from(new Set(players.map(p => p.position)));
  
  const filteredPlayers = players.filter(player => {
    const matchesSearch = player.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPosition = !positionFilter || player.position === positionFilter;
    return matchesSearch && matchesPosition && player.available;
  });
  
  return (
    <div className="border rounded-md">
      <div className="p-4 border-b border-gray-200">
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
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left">Position</th>
              <th className="py-2 px-4 text-left">Stats</th>
              <th className="py-2 px-4 text-left"></th>
            </tr>
          </thead>
          <tbody>
            {filteredPlayers.map((player) => (
              <tr key={player.id} className="border-b border-gray-100">
                <td className="py-2 px-4">{player.name}</td>
                <td className="py-2 px-4">{player.position}</td>
                <td className="py-2 px-4">
                  {Object.entries(player.stats).map(([key, value]) => (
                    <span key={key} className="mr-2">
                      {key}: {value}
                    </span>
                  ))}
                </td>
                <td className="py-2 px-4">
                  <button
                    onClick={() => onSelectPlayer(player)}
                    className="p-1 rounded-full border border-gray-300 hover:bg-gray-100"
                  >
                    +
                  </button>
                </td>
              </tr>
            ))}
            {filteredPlayers.length === 0 && (
              <tr>
                <td colSpan={4} className="py-4 text-center text-gray-500">
                  No players found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
} 