import { useEffect, useState } from 'react'

function normalizeCollection(payload) {
  if (Array.isArray(payload)) {
    return payload
  }

  if (payload && typeof payload === 'object') {
    if (Array.isArray(payload.results)) {
      return payload.results
    }

    if (Array.isArray(payload.items)) {
      return payload.items
    }

    if (Array.isArray(payload.data)) {
      return payload.data
    }
  }

  return []
}

function Workouts({ apiBaseUrl }) {
  const [workouts, setWorkouts] = useState([])
  const [pagination, setPagination] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const abortController = new AbortController()

    async function loadWorkouts() {
      try {
        setIsLoading(true)
        setError('')

        const response = await fetch(`${apiBaseUrl}/workouts/`, {
          signal: abortController.signal,
        })

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const payload = await response.json()
        setWorkouts(normalizeCollection(payload))

        if (payload && typeof payload === 'object' && !Array.isArray(payload)) {
          setPagination({
            page: payload.page,
            totalPages: payload.totalPages,
            total: payload.total,
          })
        } else {
          setPagination(null)
        }
      } catch (loadError) {
        if (loadError.name !== 'AbortError') {
          setError(loadError.message)
        }
      } finally {
        setIsLoading(false)
      }
    }

    loadWorkouts()

    return () => {
      abortController.abort()
    }
  }, [apiBaseUrl])

  return (
    <section className="card shadow-sm border-0">
      <div className="card-body p-4">
        <h2 className="h4">Workouts</h2>
        <p className="text-body-secondary mb-3">Source: {`${apiBaseUrl}/workouts/`}</p>

        {isLoading && <p className="mb-0">Loading workouts...</p>}
        {error && <p className="text-danger mb-0">{error}</p>}

        {!isLoading && !error && (
          <>
            <p className="mb-2">Count: {workouts.length}</p>
            {pagination && (
              <p className="text-body-secondary mb-3">
                Page {pagination.page ?? 1}
                {pagination.totalPages ? ` of ${pagination.totalPages}` : ''}
                {pagination.total ? ` | Total: ${pagination.total}` : ''}
              </p>
            )}
            {workouts.length === 0 ? (
              <p className="mb-0">No workouts found.</p>
            ) : (
              <ul className="list-group list-group-flush rounded overflow-hidden">
                {workouts.map((workout, index) => (
                  <li key={workout._id ?? workout.id ?? index} className="list-group-item">
                    <pre className="json-block mb-0">{JSON.stringify(workout, null, 2)}</pre>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </section>
  )
}

export default Workouts
