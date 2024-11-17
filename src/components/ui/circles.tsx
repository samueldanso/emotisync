export default function Circles() {
  return (
    <div
      className="-top-32 pointer-events-none absolute inset-0"
      style={{
        backgroundColor: "#f4e6f7",
        opacity: 0.05,
        backgroundImage:
          "radial-gradient(circle at center center, #5845f7, #f4e6f7), repeating-radial-gradient(circle at center center, #5845f7, #5845f7, 76px, transparent 152px, transparent 76px)",
        backgroundBlendMode: "multiply",
      }}
    />
  )
}
