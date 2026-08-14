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

function Activities() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
  const endpoint = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/activities/`
    : 'http://localhost:8000/api/activities/'
  const [activities, setActivities] = useState([])
  const [pagination, setPagination] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const abortController = new AbortController()

    async function loadActivities() {
      try {
        setIsLoading(true)
        setError('')

        const response = await fetch(endpoint, {
          signal: abortController.signal,
        })

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const payload = await response.json()
        setActivities(normalizeCollection(payload))

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

    loadActivities()

    return () => {
      abortController.abort()
    }
  }, [endpoint])

  return (
    <section className="card shadow-sm border-0">
      <div className="card-body p-4">
        <h2 className="h4">Activities</h2>
        <p className="text-body-secondary mb-3">Source: {endpoint}</p>

        {isLoading && <p className="mb-0">Loading activities...</p>}
        {error && <p className="text-danger mb-0">{error}</p>}

        {!isLoading && !error && (
          <>
            <p className="mb-2">Count: {activities.length}</p>
            {pagination && (
              <p className="text-body-secondary mb-3">
                Page {pagination.page ?? 1}
                {pagination.totalPages ? ` of ${pagination.totalPages}` : ''}
                {pagination.total ? ` | Total: ${pagination.total}` : ''}
              </p>
            )}
            {activities.length === 0 ? (
              <p className="mb-0">No activities found.</p>
            ) : (
              <ul className="list-group list-group-flush rounded overflow-hidden">
                {activities.map((activity, index) => (
                  <li key={activity._id ?? activity.id ?? index} className="list-group-item">
                    <pre className="json-block mb-0">{JSON.stringify(activity, null, 2)}</pre>
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

export default Activities
