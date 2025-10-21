
export function InfoBox({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="bg-[#1E1E1E]/80 p-3 rounded-lg text-center backdrop-blur-md shadow-md">
      <p className="text-gray-400 text-xs">{label}</p>
      <p className="text-white text-sm font-semibold">{value}</p>
    </div>
  );
}
