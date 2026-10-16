import { useEffect, useMemo, useState } from 'react'
import { terminalCategories, terminalChallenges } from './terminalChallenges.js'

const levels = ['Beginner', 'Intermediate', 'Advanced']

function evaluateChallenge(challenge, code) {
  const checks = challenge.checks.map(([label, matcher]) => {
    let passed = false
    try { passed = typeof matcher === 'function' ? Boolean(matcher(code)) : new RegExp(matcher.source, matcher.flags).test(code) } catch { passed = false }
    return { label, passed }
  })
  const nonEmpty = code.trim().length > 0
  const basicChecks = [
    { label: 'Code is not empty', passed: nonEmpty },
    { label: 'No tab characters that commonly break YAML indentation', passed: challenge.language !== 'yaml' || !code.includes('\t') },
  ]
  return { checks: [...basicChecks, ...checks], passed: nonEmpty && checks.every((item) => item.passed) && basicChecks.every((item) => item.passed) }
}

export default function TerminalLab({ onReward }) {
  const [category, setCategory] = useState('Kubernetes manifests')
  const [level, setLevel] = useState('Beginner')
  const [challengeId, setChallengeId] = useState('k8s-deploy')
  const [code, setCode] = useState('')
  const [result, setResult] = useState(null)
  const [sideTab, setSideTab] = useState('Instructions')
  const [showSolution, setShowSolution] = useState(false)
  const [completedIds, setCompletedIds] = useState([])
  const [showHow, setShowHow] = useState(false)

  const categoryChallenges = useMemo(() => terminalChallenges.filter((c) => c.tech === category), [category])
  const levelChallenges = useMemo(() => categoryChallenges.filter((c) => c.level === level), [categoryChallenges, level])
  const available = levelChallenges.length ? levelChallenges : categoryChallenges
  const current = available.find((c) => c.id === challengeId) || available[0] || terminalChallenges[0]
  const index = Math.max(0, available.findIndex((c) => c.id === current.id))

  useEffect(() => {
    setChallengeId(current.id)
    setCode(current.starter)
    setResult(null)
    setShowSolution(false)
  }, [current.id])

  function changeCategory(next) {
    const first = terminalChallenges.find((c) => c.tech === next && c.level === level) || terminalChallenges.find((c) => c.tech === next)
    setCategory(next)
    if (first) { setChallengeId(first.id); setCode(first.starter); setResult(null); setShowSolution(false) }
  }
  function changeLevel(next) {
    const first = terminalChallenges.find((c) => c.tech === category && c.level === next) || terminalChallenges.find((c) => c.tech === category)
    setLevel(next)
    if (first) { setChallengeId(first.id); setCode(first.starter); setResult(null); setShowSolution(false) }
  }
  function selectChallenge(challenge) {
    setChallengeId(challenge.id)
    setCode(challenge.starter)
    setResult(null)
    setShowSolution(false)
    setSideTab('Instructions')
  }
  function validate() {
    const evaluated = evaluateChallenge(current, code)
    setResult(evaluated)
    if (evaluated.passed && !completedIds.includes(current.id)) {
      setCompletedIds((prev) => [...prev, current.id])
      onReward?.(current)
    }
  }
  function nextChallenge() {
    const next = available[(index + 1) % available.length]
    selectChallenge(next)
  }
  function resetCode() { setCode(current.starter); setResult(null); setShowSolution(false) }

  return <div className="page-content terminal-pro-page">
    <div className="terminal-pro-heading">
      <div>
        <div className="eyebrow">WORKSPACE / TERMINAL LAB / {category.toUpperCase()}</div>
        <h1>Terminal <span className="gradient-text">Lab</span></h1>
        <p className="page-subtitle">Write real DevOps code. Validate requirements. Learn from every failed attempt.</p>
      </div>
      <div className="terminal-head-actions">
        <button className="secondary-button" onClick={() => setShowHow((v) => !v)}>ⓘ How it works</button>
        <span className="terminal-safe-pill">● SAFE PRACTICE MODE</span>
      </div>
    </div>
    {showHow && <div className="terminal-how panel"><strong>How validation works</strong><p>Your answer is checked against the task's required directives and values. The frontend does not execute shell commands, deploy to Kubernetes, build Docker images, run Jenkins, or apply Terraform. Real runtime checks can be added later through a locked-down backend sandbox.</p></div>}

    <div className="terminal-tech-tabs" role="tablist" aria-label="Terminal technologies">
      {terminalCategories.map((item) => <button key={item.name} className={category === item.name ? 'active' : ''} onClick={() => changeCategory(item.name)} role="tab" aria-selected={category === item.name}>
        <span className="terminal-tech-icon">{item.icon}</span><span><strong>{item.name}</strong><small>{item.description}</small></span>
      </button>)}
    </div>

    <div className="terminal-level-row">
      <div className="terminal-levels">{levels.map((item) => <button key={item} className={`terminal-level level-${item.toLowerCase()} ${level === item ? 'active' : ''}`} onClick={() => changeLevel(item)}>{item === 'Beginner' ? '●' : item === 'Intermediate' ? '◉' : '◆'} {item}</button>)}</div>
      <div className="terminal-progress"><span>Challenge {index + 1} of {available.length}</span><div><i style={{ width: `${((index + 1) / Math.max(available.length, 1)) * 100}%` }}/></div></div>
      <button className="terminal-reset-all" onClick={resetCode}>↻ Reset code</button>
    </div>

    <div className="terminal-workspace">
      <section className="terminal-editor-card panel">
        <div className="terminal-challenge-brief">
          <div className="terminal-challenge-symbol">{terminalCategories.find((item) => item.name === category)?.icon}</div>
          <div className="terminal-challenge-copy">
            <div className="terminal-challenge-title"><h2>{current.title}</h2><span className={`difficulty-pill ${current.level.toLowerCase()}`}>{current.level}</span></div>
            <p>{current.prompt}</p>
            <div className="terminal-reward">✦ +{current.xp} XP <span>•</span> {current.tech}</div>
          </div>
        </div>
        <div className="terminal-code-head"><span><i/> {current.file}</span><label>{current.language.toUpperCase()} <span>⌄</span></label><button onClick={() => setCode(current.solution)} title="Load sample solution">Load example</button></div>
        <div className="terminal-editor-wrap">
          <div className="terminal-line-numbers" aria-hidden="true">{Array.from({length:Math.max(1,code.split('\n').length)},(_,i)=><span key={i}>{i+1}</span>)}</div>
          <textarea spellCheck="false" autoCapitalize="off" autoCorrect="off" autoComplete="off" aria-label={`${current.file} code editor`} value={code} onChange={(e) => {setCode(e.target.value);setResult(null)}} className="terminal-code-editor" />
        </div>
        <div className="terminal-editor-footer">
          <button className="primary-button" onClick={validate}>▷ Run validation</button>
          <button className="secondary-button" onClick={resetCode}>↻ Reset code</button>
          <div className={`terminal-inline-status ${result?.passed ? 'passed' : result ? 'failed' : ''}`}>{result ? (result.passed ? '✓ All requirements passed!' : `! ${result.checks.filter((c)=>!c.passed).length} requirement(s) need work`) : '● Ready to validate'}</div>
          <button className="primary-button terminal-next-btn" onClick={nextChallenge}>{result?.passed ? 'Next challenge →' : 'Skip challenge →'}</button>
        </div>
        {result && <div className={`terminal-result-box ${result.passed ? 'success' : 'needs-work'}`}>
          <strong>{result.passed ? '✓ Correct! Challenge passed.' : 'Not quite — review the checks below.'}</strong>
          <p>{result.passed ? `You met all listed requirements and earned ${completedIds.includes(current.id) ? 'no additional' : current.xp} XP.` : 'Fix the failed requirements and run validation again. This validator checks challenge patterns, not full language/runtime semantics.'}</p>
          <div className="terminal-check-list">{result.checks.map((check) => <div key={check.label} className={check.passed ? 'check-pass' : 'check-fail'}><span>{check.passed ? '✓' : '×'}</span>{check.label}</div>)}</div>
        </div>}
      </section>

      <aside className="terminal-right-column">
        <section className="panel terminal-side-panel">
          <div className="terminal-side-tabs">{['Instructions','Hints','Expected output'].map((tab) => <button key={tab} className={sideTab === tab ? 'active' : ''} onClick={() => {setSideTab(tab);if(tab==='Expected output')setShowSolution(true)}}>{tab}</button>)}</div>
          {sideTab === 'Instructions' && <div className="terminal-side-content"><h3>Requirements</h3><ul>{current.requirements.map((r) => <li key={r}>{r}</li>)}</ul><div className="terminal-note">Your code must satisfy every requirement before the challenge passes.</div></div>}
          {sideTab === 'Hints' && <div className="terminal-side-content"><h3>Need a nudge?</h3><p>{current.hint}</p><div className="terminal-note">Tip: make one change at a time, then run validation again.</div></div>}
          {sideTab === 'Expected output' && <div className="terminal-side-content"><h3>Reference solution</h3><p>Use this after attempting the challenge yourself.</p><button className="secondary-button" onClick={() => setShowSolution((v)=>!v)}>{showSolution ? 'Hide solution' : 'Reveal solution'}</button>{showSolution && <pre className="terminal-solution-code">{current.solution}</pre>}</div>}
        </section>
        <section className="panel terminal-score-panel">
          <div className="eyebrow">YOUR LAB PROGRESS</div>
          <div className="terminal-score-number">{completedIds.length}<span> / {terminalChallenges.length}</span></div>
          <div className="terminal-score-track"><i style={{width:`${completedIds.length/terminalChallenges.length*100}%`}}/></div>
          <p>Challenges passed in this session</p>
          <div className="terminal-score-stats"><span>Current tier<strong>{level}</strong></span><span>Category<strong>{category}</strong></span></div>
        </section>
        <section className="panel terminal-tip-panel"><div className="eyebrow">PRO TIP</div><h3>Think like an engineer</h3><p>Check syntax, labels, image tags, resource names and security defaults. In production, validate with the native toolchain and test in a non-production environment first.</p></section>
      </aside>
    </div>

    <section className="panel terminal-more-panel">
      <div className="terminal-more-heading"><div><div className="eyebrow">PRACTICE PATHS</div><h2>More Terminal Lab challenges</h2></div><span>{terminalChallenges.length} challenges included</span></div>
      <div className="terminal-challenge-grid">{terminalChallenges.filter((c)=>c.tech!==category).slice(0,8).map((challenge)=><button className="terminal-mini-challenge" key={challenge.id} onClick={()=>{setCategory(challenge.tech);setLevel(challenge.level);selectChallenge(challenge)}}><span className="terminal-mini-icon">{terminalCategories.find((t)=>t.name===challenge.tech)?.icon}</span><span className="terminal-mini-copy"><strong>{challenge.title}</strong><small>{challenge.tech} · {challenge.level}</small></span><span className="terminal-mini-xp">+{challenge.xp} XP</span></button>)}</div>
    </section>
    <div className="terminal-disclaimer">Validation is rule-based in this frontend. It does not execute submitted code or contact your cloud accounts. For real kubectl, Docker, Jenkins, Terraform validation, connect a restricted backend runner with resource limits and timeouts.</div>
  </div>
}
