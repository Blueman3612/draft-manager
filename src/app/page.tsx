import Header from '@/components/layout/Header';
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
    <main className="min-h-screen">
      <Header />
      
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">LIVE DRAFT BOARD</h1>
        
        <div className="mb-8 overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-2 px-4 text-left">Round</th>
                <th className="py-2 px-4 text-left">Pick #</th>
                <th className="py-2 px-4 text-left">Team</th>
                <th className="py-2 px-4 text-left">Player</th>
              </tr>
            </thead>
            <tbody>
              {mockDraftPicks.map((pick) => (
                <tr key={pick.id} className="border-b border-gray-100">
                  <td className="py-2 px-4">{Math.ceil(pick.pick_number / mockTeams.length)}</td>
                  <td className="py-2 px-4">{pick.pick_number}</td>
                  <td className="py-2 px-4">{getTeamName(pick.team_id)}</td>
                  <td className="py-2 px-4">{getPlayerName(pick.player_id)}</td>
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-3">TEAMS</h2>
            <div className="border rounded-md p-4">
              <ul className="divide-y divide-gray-100">
                {mockTeams.map((team) => (
                  <li key={team.id} className="py-2">
                    {team.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-3">CURRENT PICK</h2>
            <div className="border rounded-md p-4">
              <div className="mb-2">
                <span className="font-semibold">Team: </span>
                {getTeamName(currentPick.teamId)}
              </div>
              <div className="mb-2">
                <span className="font-semibold">Pick #: </span>
                {currentPick.pickNumber}
              </div>
              <div>
                <span className="font-semibold">Time: </span>
                1:30
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
