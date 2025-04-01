import { DraftPick } from '@/lib/types';

type DraftTableProps = {
  draftPicks: DraftPick[];
};

export default function DraftTable({ draftPicks }: DraftTableProps) {
  return (
    <div className="overflow-x-auto">
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
          {draftPicks.map((pick) => (
            <tr key={pick.id} className="border-b border-gray-100">
              <td className="py-2 px-4">{Math.ceil(pick.pick_number / 10)}</td>
              <td className="py-2 px-4">{pick.pick_number}</td>
              <td className="py-2 px-4">{pick.team_id}</td>
              <td className="py-2 px-4">{pick.player_id}</td>
            </tr>
          ))}
          {draftPicks.length === 0 && (
            <tr>
              <td colSpan={4} className="py-4 text-center text-gray-500">
                No draft picks yet
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
} 