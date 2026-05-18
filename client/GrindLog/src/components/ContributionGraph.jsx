import { toDateKey } from '../utils/date'

const WEEKS = 53
const WEEKDAY_LABELS = ['', 'Mon', '', 'Wed', '', 'Fri', '']

function startOfWeekSunday(date) {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  d.setDate(d.getDate() - d.getDay())
  return d
}

function buildWeeks(endDate = new Date()) {
  const end = new Date(endDate)
  end.setHours(0, 0, 0, 0)
  const endSunday = startOfWeekSunday(end)
  const startSunday = new Date(endSunday)
  startSunday.setDate(startSunday.getDate() - (WEEKS - 1) * 7)

  const weeks = []
  for (let w = 0; w < WEEKS; w++) {
    const week = []
    for (let d = 0; d < 7; d++) {
      const day = new Date(startSunday)
      day.setDate(startSunday.getDate() + w * 7 + d)
      week.push(day)
    }
    weeks.push(week)
  }
  return { weeks, end }
}

function countToLevel(count) {
  if (!count) return 0
  if (count === 1) return 1
  if (count === 2) return 2
  if (count === 3) return 3
  return 4
}

function buildMonthLabels(weeks) {
  const labels = []
  let lastMonth = -1
  weeks.forEach((week, index) => {
    const month = week[0].getMonth()
    if (month !== lastMonth) {
      labels.push({
        index,
        label: week[0].toLocaleString('en-US', { month: 'short' }),
      })
      lastMonth = month
    }
  })
  return labels
}

function formatTooltip(date, count) {
  const formatted = date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
  if (!count) return `No problems on ${formatted}`
  const noun = count === 1 ? 'problem' : 'problems'
  return `${count} ${noun} on ${formatted}`
}

export default function ContributionGraph({ activityCounts = {} }) {
  const { weeks, end } = buildWeeks()
  const monthLabels = buildMonthLabels(weeks)

  return (
    <div className="contrib-graph">
      <div className="contrib-graph__months" aria-hidden="true">
        {monthLabels.map(({ index, label }) => (
          <span
            key={`${label}-${index}`}
            className="contrib-graph__month"
            style={{ gridColumn: index + 1 }}
          >
            {label}
          </span>
        ))}
      </div>

      <div className="contrib-graph__body">
        <div className="contrib-graph__weekdays" aria-hidden="true">
          {WEEKDAY_LABELS.map((label, i) => (
            <span key={i}>{label}</span>
          ))}
        </div>

        <div
          className="contrib-graph__grid"
          role="img"
          aria-label="LeetCode activity in the last year"
        >
          {weeks.map((week, weekIndex) =>
            week.map((day) => {
              const key = toDateKey(day)
              const isFuture = day > end
              const count = isFuture ? 0 : activityCounts[key] || 0
              const level = isFuture ? 0 : countToLevel(count)

              return (
                <div
                  key={`${weekIndex}-${key}`}
                  className={[
                    'contrib-cell',
                    `contrib-cell--${level}`,
                    isFuture && 'contrib-cell--future',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  title={isFuture ? undefined : formatTooltip(day, count)}
                />
              )
            }),
          )}
        </div>
      </div>

      <div className="contrib-graph__legend">
        <span className="contrib-graph__legend-label">Less</span>
        <div className="contrib-graph__legend-cells" aria-hidden="true">
          {[0, 1, 2, 3, 4].map((level) => (
            <div key={level} className={`contrib-cell contrib-cell--${level}`} />
          ))}
        </div>
        <span className="contrib-graph__legend-label">More</span>
      </div>
    </div>
  )
}
