export default function MiniSparkline({ up }) {
  const pts = up
    ? "0,30 10,25 20,28 30,18 40,15 50,10 60,12 70,5 80,8 90,2 100,0"
    : "0,0 10,5 20,2 30,10 40,8 50,18 60,15 70,22 80,28 90,25 100,30";
  return (
    <svg viewBox="0 0 100 30" className="w-16 h-8" preserveAspectRatio="none">
      <polyline
        points={pts}
        fill="none"
        stroke={up ? "#34d399" : "#f87171"}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}