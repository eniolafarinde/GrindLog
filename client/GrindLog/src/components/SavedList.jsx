export default function SavedList({ entries, onEdit, onDelete }) {
  return (
    <div className="saved-list">
      <h2 className="saved-list__title">Saved LeetCode</h2>
      {entries.length === 0 ? (
        <p className="saved-list__empty">No problems logged yet.</p>
      ) : (
        <ul className="saved-list__items">
          {entries.map((entry) => (
            <li key={entry.id} className="saved-list__row">
              <span className="saved-list__label">
                <span className="saved-list__arrow" aria-hidden="true">
                  →
                </span>
                #{entry.number} {entry.question || 'Untitled'}
              </span>
              <div className="saved-list__actions">
                <button
                  type="button"
                  className="saved-list__btn saved-list__btn--edit"
                  onClick={() => onEdit(entry)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="saved-list__btn saved-list__btn--delete"
                  onClick={() => onDelete(entry)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
