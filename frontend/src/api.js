const API_BASE = import.meta.env.VITE_API_URL || '/api'

function getCookie(name) {
  return document.cookie.split('; ').find((item) => item.startsWith(`${name}=`))?.split('=')[1] || ''
}

async function request(path, options = {}) {
  const headers = { ...(options.body ? { 'Content-Type': 'application/json' } : {}), ...options.headers }
  const csrfToken = decodeURIComponent(getCookie('csrftoken'))
  if (csrfToken && options.method && options.method !== 'GET') headers['X-CSRFToken'] = csrfToken
  const response = await fetch(`${API_BASE}${path}`, { credentials: 'include', ...options, headers })
  const data = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(data.detail || Object.values(data).flat().join(' ') || 'Something went wrong. Please try again.')
  return data
}

export function getCsrfToken() { return request('/auth/csrf/') }
export function getCurrentStudent() { return request('/auth/me/') }
export function signIn(email, password) { return request('/auth/login/', { method: 'POST', body: JSON.stringify({ username: email, password }) }) }
export function registerStudent({ name, email, password }) {
  return request('/auth/register/', { method: 'POST', body: JSON.stringify({ username: email, email, password, display_name: name }) })
}
export function signOut() { return request('/auth/logout/', { method: 'POST' }) }
