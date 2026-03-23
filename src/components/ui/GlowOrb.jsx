export default function GlowOrb({ color, style }) {
  return (
    <div
      className="absolute rounded-full blur-3xl opacity-10 pointer-events-none"
      style={{ background: color, ...style }}
    />
  );
}