import ContributionGraph from './ContributionGraph'
import SavedList from './SavedList'
import StreakCounter from './StreakCounter'

export default function Dashboard({
  entries,
  streak,
  activityCounts,
  onAdd,
  onEditEntry,
  onDeleteEntry,
}) {
  return (
    <section className="dashboard">
      <div className="dashboard__left">
        <button type="button" className="btn-add" onClick={onAdd}>
          <span className="btn-add__icon" aria-hidden="true">
            +
          </span>
          Add LeetCode
        </button>
        <SavedList
          entries={entries}
          onEdit={onEditEntry}
          onDelete={onDeleteEntry}
        />
      </div>
      <aside className="dashboard__right">
        <div className="streak-panel">
          <ContributionGraph activityCounts={activityCounts} />
          <StreakCounter streak={streak} />
        </div>
      </aside>
    </section>
  )
}
