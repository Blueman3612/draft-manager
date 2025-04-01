'use client';

import { useState } from 'react';
import { 
  mockTeams, 
  mockDraftPicks,
  getTeamName,
  getPlayerName,
  getCurrentPick
} from '@/lib/mockData';

export default function AdminDashboard() {
  const [draftStatus, setDraftStatus] = useState('active');
  const [timeRemaining, setTimeRemaining] = useState(105); // 1:45 in seconds
  const currentPick = getCurrentPick();
  
  // Recent activity - using draft picks but could be any activity
  const recentActivity = [...mockDraftPicks]
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 5)
    .map(pick => ({
      time: new Date(pick.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      action: `Draft: ${getPlayerName(pick.player_id)}`,
      user: getTeamName(pick.team_id)
    }));
  
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">ADMIN DASHBOARD</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-3">DRAFT CONTROLS</h2>
        <div className="border rounded-md p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm mb-1 font-medium">Status</label>
              <select 
                value={draftStatus}
                onChange={(e) => setDraftStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="pending">Pending</option>
                <option value="active">Active</option>
                <option value="paused">Paused</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm mb-1 font-medium">Current Team</label>
              <div className="px-3 py-2 border border-gray-300 rounded-md bg-gray-50">
                {getTeamName(currentPick.teamId)}
              </div>
            </div>
            
            <div>
              <label className="block text-sm mb-1 font-medium">Time Remaining</label>
              <div className="flex items-center gap-2">
                <div className="px-3 py-2 border border-gray-300 rounded-md bg-gray-50 w-24">
                  {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}
                </div>
                <button className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-100">
                  Reset
                </button>
                <button className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-100">
                  Skip
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-8">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-semibold">TEAMS</h2>
          <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-100">
            + Add Team
          </button>
        </div>
        
        <div className="border rounded-md overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-2 px-4 text-left">Team Name</th>
                <th className="py-2 px-4 text-left">Manager</th>
                <th className="py-2 px-4 text-left">Players</th>
                <th className="py-2 px-4 text-left"></th>
              </tr>
            </thead>
            <tbody>
              {mockTeams.map((team) => {
                const teamPlayers = mockDraftPicks.filter(p => p.team_id === team.id).length;
                
                return (
                  <tr key={team.id} className="border-b border-gray-100">
                    <td className="py-2 px-4">{team.name}</td>
                    <td className="py-2 px-4">
                      {team.manager_id === 'user1' ? 'John Doe' : 
                       team.manager_id === 'user2' ? 'Jane Smith' : 
                       team.manager_id === 'user3' ? 'Mike Johnson' : 
                       team.manager_id === 'user4' ? 'Sarah Williams' : 'Unknown'}
                    </td>
                    <td className="py-2 px-4">{teamPlayers}</td>
                    <td className="py-2 px-4">
                      <button className="text-blue-600 hover:underline">
                        Edit
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      
      <div>
        <h2 className="text-xl font-semibold mb-3">RECENT ACTIVITY</h2>
        <div className="border rounded-md overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-2 px-4 text-left">Time</th>
                <th className="py-2 px-4 text-left">Action</th>
                <th className="py-2 px-4 text-left">User</th>
              </tr>
            </thead>
            <tbody>
              {recentActivity.map((activity, index) => (
                <tr key={index} className="border-b border-gray-100">
                  <td className="py-2 px-4">{activity.time}</td>
                  <td className="py-2 px-4">{activity.action}</td>
                  <td className="py-2 px-4">{activity.user}</td>
                </tr>
              ))}
              {recentActivity.length === 0 && (
                <tr>
                  <td colSpan={3} className="py-4 text-center text-gray-500">
                    No recent activity
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 