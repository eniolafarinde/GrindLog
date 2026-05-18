export default function StreakCounter({ streak }) {
  return (
    <p className="streak-counter" aria-live="polite">
      <span className="streak-counter__value">{streak}</span>
      <span className="streak-counter__label">Streak!</span>
    </p>
  )
}
