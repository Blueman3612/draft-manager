import { 
  mockTeams, 
  mockDraftPicks, 
  getTeamName, 
  getPlayerName, 
  getCurrentPick 
} from '@/lib/mockData';

export default function Home() {
  const currentPick = getCurrentPick();
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Live Draft Board</h1>
          <p className="mt-2 text-sm text-gray-700">
            Real-time updates of all draft picks and current status.
          </p>
        </div>
      </div>
      
      <div className="mt-8 flex flex-col">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle">
            <div className="overflow-hidden shadow-sm ring-1 ring-black ring-opacity-5">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8">
                      Round
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Pick #
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Team
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Player
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {mockDraftPicks.map((pick) => (
                    <tr key={pick.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">
                        {Math.ceil(pick.pick_number / mockTeams.length)}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {pick.pick_number}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {getTeamName(pick.team_id)}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {getPlayerName(pick.player_id)}
                      </td>
                    </tr>
                  ))}
                  {mockDraftPicks.length === 0 && (
                    <tr>
                      <td colSpan={4} className="py-4 text-center text-gray-500">
                        No draft picks yet
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="bg-white shadow-sm ring-1 ring-black ring-opacity-5 px-4 py-5 sm:rounded-lg sm:p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Teams</h2>
          <ul className="space-y-3">
            {mockTeams.map((team) => (
              <li key={team.id} className="text-gray-700">
                {team.name}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="bg-white shadow-sm ring-1 ring-black ring-opacity-5 px-4 py-5 sm:rounded-lg sm:p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Current Pick</h2>
          <dl className="grid grid-cols-1 gap-3">
            <div>
              <dt className="text-sm font-medium text-gray-500">Team</dt>
              <dd className="mt-1 text-sm text-gray-900">{getTeamName(currentPick.teamId)}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Pick #</dt>
              <dd className="mt-1 text-sm text-gray-900">{currentPick.pickNumber}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Time Remaining</dt>
              <dd className="mt-1 text-sm text-gray-900">1:30</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
