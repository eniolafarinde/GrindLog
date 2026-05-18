import { useEffect, useState } from 'react'
import Dashboard from './components/Dashboard'
import EntryForm from './components/EntryForm'
import { toDateKey } from './utils/date'
import './App.css'

const emptyEntry = {
  question: '',
  number: '',
  solution: '',
  intuition: '',
  passRate: '',
  tags: '',
}

function buildActivityCounts(entries) {
  const counts = {}
  for (const entry of entries) {
    if (!entry.solvedAt) continue
    const key = toDateKey(entry.solvedAt)
    counts[key] = (counts[key] || 0) + 1
  }
  return counts
}

function App() {
  const [apiStatus, setApiStatus] = useState('checking')
  const [entries, setEntries] = useState([])
  const [streak] = useState(0)
  const [showForm, setShowForm] = useState(false)
  const [draft, setDraft] = useState(emptyEntry)

  useEffect(() => {
    fetch('/api/health')
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then(() => setApiStatus('connected'))
      .catch(() => setApiStatus('offline'))
  }, [])

  function openNewEntry() {
    setDraft(emptyEntry)
    setShowForm(true)
  }

  function openEntry(entry) {
    setDraft(entry)
    setShowForm(true)
  }

  function closeForm() {
    setShowForm(false)
    setDraft(emptyEntry)
  }

  function handleDelete(entry) {
    const confirmed = window.confirm(
      `Delete #${entry.number} ${entry.question || 'Untitled'}?`,
    )
    if (!confirmed) return

    setEntries((prev) => prev.filter((e) => e.id !== entry.id))
    if (draft.id === entry.id) closeForm()
  }

  function handleSave(form) {
    if (form.id) {
      setEntries((prev) =>
        prev.map((e) => (e.id === form.id ? { ...form } : e)),
      )
    } else {
      setEntries((prev) => [
        ...prev,
        { ...form, id: crypto.randomUUID(), solvedAt: new Date().toISOString() },
      ])
    }
    closeForm()
  }

  const activityCounts = buildActivityCounts(entries)

  return (
    <div className="app">
      <header className="app-header">
        <h1>GrindLog</h1>
        <p className="app-header__tagline">LeetCode streak tracker</p>
        {apiStatus === 'offline' && (
          <p className="app-header__status" role="status">
            API offline — start the backend with <code>npm run dev</code> in{' '}
            <code>backend/</code>
          </p>
        )}
      </header>

      <Dashboard
        entries={entries}
        streak={streak}
        onAdd={openNewEntry}
        onEditEntry={openEntry}
        onDeleteEntry={handleDelete}
        activityCounts={activityCounts}
      />

      {showForm && (
        <EntryForm
          value={draft}
          onChange={setDraft}
          onSubmit={handleSave}
          onCancel={closeForm}
        />
      )}
    </div>
  )
}

export default App
