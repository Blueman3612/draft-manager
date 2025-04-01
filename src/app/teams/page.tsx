'use client';

import { useState } from 'react';
import { mockTeams, mockDraftPicks } from '@/lib/mockData';
import { Button } from '@/components/ui/Button';
import { TextInput } from '@/components/ui/TextInput';

export default function TeamsPage() {
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
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Teams</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage teams and draft order for the league.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <Button>
            Add Team
          </Button>
        </div>
      </div>
      
      <div className="mt-8">
        <div className="mb-6">
          <TextInput
            placeholder="Search teams..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={
              <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            }
          />
        </div>

        <div className="mt-8 flex flex-col">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle">
              <div className="overflow-hidden shadow-sm ring-1 ring-black ring-opacity-5">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8">
                        Team Name
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Manager
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Players
                      </th>
                      <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6 lg:pr-8">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {filteredTeams.map((team) => (
                      <tr key={team.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">
                          {team.name}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {getManagerName(team.manager_id)}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {getTeamPlayerCount(team.id)}
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 lg:pr-8">
                          <Button variant="ghost" size="sm" className="mr-4">
                            Edit
                          </Button>
                          <Button variant="destructive" size="sm">
                            Delete
                          </Button>
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
          </div>
        </div>
      </div>
      
      <div className="mt-12">
        <div className="sm:flex sm:items-center mb-6">
          <div className="sm:flex-auto">
            <h2 className="text-xl font-semibold text-gray-900">Draft Order</h2>
            <p className="mt-2 text-sm text-gray-700">
              Current draft order for the league.
            </p>
          </div>
        </div>
        
        <div className="bg-white shadow-sm ring-1 ring-black ring-opacity-5 px-4 py-5 sm:rounded-lg sm:p-6">
          <ol className="list-decimal list-inside space-y-2">
            {mockTeams.map(team => (
              <li key={team.id} className="text-gray-900">{team.name}</li>
            ))}
          </ol>
          <div className="mt-6 flex space-x-3">
            <Button variant="outline">
              Randomize Order
            </Button>
            <Button>
              Save Order
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 