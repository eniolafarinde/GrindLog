const emptyForm = {
  question: '',
  number: '',
  solution: '',
  intuition: '',
  passRate: '',
  tags: '',
}

export default function EntryForm({
  value,
  onChange,
  onSubmit,
  onCancel,
  titleLookupStatus,
}) {
  const form = value ?? emptyForm

  function updateField(field) {
    return (e) => onChange({ ...form, [field]: e.target.value })
  }

  return (
    <section className="entry-form" aria-label="LeetCode entry">
      <header className="entry-form__header">
        <h2>{form.id ? 'Edit entry' : 'New entry'}</h2>
        <button type="button" className="btn-ghost" onClick={onCancel}>
          Close
        </button>
      </header>

      <form
        className="entry-form__fields"
        onSubmit={(e) => {
          e.preventDefault()
          onSubmit?.(form)
        }}
      >
        <label className="field">
          <span>LeetCode number</span>
          <input
            type="number"
            min="1"
            placeholder="e.g. 1"
            value={form.number}
            onChange={updateField('number')}
          />
          {titleLookupStatus === 'loading' && (
            <span className="field-hint">Looking up title…</span>
          )}
          {titleLookupStatus === 'error' && (
            <span className="field-hint field-hint--error">
              Could not find that problem.
            </span>
          )}
        </label>

        <label className="field">
          <span>Question</span>
          <input
            type="text"
            placeholder="Filled from number lookup"
            value={form.question}
            onChange={updateField('question')}
          />
        </label>

        <label className="field field--full">
          <span>Your solution</span>
          <textarea
            rows={6}
            placeholder="Paste your code"
            value={form.solution}
            onChange={updateField('solution')}
          />
        </label>

        <label className="field field--full">
          <span>Solution intuition / approach</span>
          <textarea
            rows={4}
            placeholder="How did you solve it?"
            value={form.intuition}
            onChange={updateField('intuition')}
          />
        </label>

        <label className="field">
          <span>Pass rate</span>
          <input
            type="text"
            placeholder="e.g. 100%"
            value={form.passRate}
            onChange={updateField('passRate')}
          />
        </label>

        <label className="field">
          <span>Topic tags</span>
          <input
            type="text"
            placeholder="Arrays, Hash Table, etc."
            value={form.tags}
            onChange={updateField('tags')}
          />
        </label>

        <div className="entry-form__actions">
          <button type="button" className="btn-ghost" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="btn-primary">
            Save
          </button>
        </div>
      </form>
    </section>
  )
}
