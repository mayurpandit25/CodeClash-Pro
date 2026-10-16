import { useEffect, useState } from 'react'
import { getCsrfToken, getCurrentStudent, registerStudent, signIn, signOut } from './api.js'
import './AuthGate.css'

const emptyForm = { name: '', email: '', password: '', confirmPassword: '' }

export default function AuthGate({ children }) {
  const [student, setStudent] = useState(null)
  const [checking, setChecking] = useState(true)
  const [mode, setMode] = useState('login')
  const [form, setForm] = useState(emptyForm)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    let active = true
    async function restoreSession() {
      try {
        await getCsrfToken()
        const profile = await getCurrentStudent()
        if (active) setStudent(profile)
      } catch {
        // A 403 from /me/ simply means this browser has no student session yet.
      } finally {
        if (active) setChecking(false)
      }
    }
    restoreSession()
    return () => { active = false }
  }, [])

  async function submit(event) {
    event.preventDefault()
    setError('')
    if (mode === 'register' && form.password !== form.confirmPassword) return setError('Passwords do not match.')
    setBusy(true)
    try {
      await getCsrfToken()
      if (mode === 'register') await registerStudent(form)
      await signIn(form.email, form.password)
      setStudent(await getCurrentStudent())
      setForm(emptyForm)
    } catch (reason) {
      setError(reason.message)
    } finally {
      setBusy(false)
    }
  }

  async function logout() {
    try { await getCsrfToken(); await signOut() } finally { setStudent(null) }
  }

  if (checking) return <main className="auth-page"><div className="auth-loading">Checking your student session…</div></main>
  if (student) return children(student, logout)

  const isRegister = mode === 'register'
  return <main className="auth-page">
    <section className="auth-showcase">
      <div className="auth-brand"><span>CC</span><div><strong>CODECLASH</strong><small>DEVOPS BATTLE ARENA</small></div></div>
      <div className="auth-pitch"><p className="auth-eyebrow">STUDENT WORKSPACE</p><h1>Train for the<br/><em>real world.</em></h1><p>Practise Linux, cloud, containers and Kubernetes through guided challenges built for DevOps learners.</p></div>
      <div className="auth-stats"><span><b>400+</b> questions</span><span><b>44</b> code labs</span><span><b>4</b> skill paths</span></div>
    </section>
    <section className="auth-panel-wrap">
      <form className="auth-panel" onSubmit={submit}>
        <p className="auth-eyebrow">WELCOME TO CODECLASH</p><h2>{isRegister ? 'Create your student account' : 'Sign in to your workspace'}</h2>
        <p className="auth-copy">{isRegister ? 'Your training profile is created for you. This is not the Django admin login.' : 'Use your student email and password to continue.'}</p>
        {isRegister && <label>Display name<input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" autoComplete="name" /></label>}
        <label>Email address<input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" autoComplete="email" /></label>
        <label>Password<input required type="password" minLength="8" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="At least 8 characters" autoComplete={isRegister ? 'new-password' : 'current-password'} /></label>
        {isRegister && <label>Confirm password<input required type="password" value={form.confirmPassword} onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })} placeholder="Repeat password" autoComplete="new-password" /></label>}
        {error && <div className="auth-error" role="alert">{error}</div>}
        <button className="auth-submit" disabled={busy} type="submit">{busy ? 'Please wait…' : isRegister ? 'Create account and enter →' : 'Sign in and continue →'}</button>
        <p className="auth-switch">{isRegister ? 'Already have an account?' : 'New to CodeClash?'} <button type="button" onClick={() => { setMode(isRegister ? 'login' : 'register'); setError('') }}>{isRegister ? 'Sign in' : 'Create one'}</button></p>
      </form>
    </section>
  </main>
}
