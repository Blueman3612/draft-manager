'use client';

import { useState } from 'react';
import { mockTeams, mockDraftPicks } from '@/lib/mockData';

export default function TeamsManagementPage() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredTeams = mockTeams.filter(team => 
    team.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Get player count for each team
  const getTeamPlayerCount = (teamId: string) => {
    return mockDraftPicks.filter(pick => pick.team_id === teamId).length;
  };
  
  // Mock manager data - in a real app, this would come from a users table
  const getManagerName = (managerId: string) => {
    const managers = {
      'user1': 'John Doe',
      'user2': 'Jane Smith',
      'user3': 'Mike Johnson',
      'user4': 'Sarah Williams'
    };
    return managers[managerId as keyof typeof managers] || 'Unknown';
  };
  
  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">TEAM MANAGEMENT</h1>
        <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100">
          + Add Team
        </button>
      </div>
      
      <div className="mb-6">
        <div className="p-4 border rounded-md">
          <input
            type="text"
            placeholder="Search teams..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>
      
      <div className="mb-8">
        <div className="border rounded-md overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-2 px-4 text-left">Team Name</th>
                <th className="py-2 px-4 text-left">Manager</th>
                <th className="py-2 px-4 text-left">Players</th>
                <th className="py-2 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTeams.map((team) => (
                <tr key={team.id} className="border-b border-gray-100">
                  <td className="py-2 px-4">{team.name}</td>
                  <td className="py-2 px-4">{getManagerName(team.manager_id)}</td>
                  <td className="py-2 px-4">{getTeamPlayerCount(team.id)}</td>
                  <td className="py-2 px-4">
                    <div className="flex gap-2">
                      <button className="text-blue-600 hover:underline">
                        Edit
                      </button>
                      <button className="text-red-600 hover:underline">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredTeams.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-4 text-center text-gray-500">
                    No teams found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      <div>
        <h2 className="text-xl font-semibold mb-3">DRAFT ORDER</h2>
        <div className="border rounded-md p-4">
          <p className="mb-4">Current draft order:</p>
          <ol className="list-decimal list-inside">
            {mockTeams.map(team => (
              <li key={team.id} className="mb-2">{team.name}</li>
            ))}
          </ol>
          <div className="mt-4">
            <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 mr-2">
              Randomize Order
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100">
              Save Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 