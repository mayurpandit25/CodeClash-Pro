import { useEffect, useState } from 'react'
import { questionBank } from './questionBank.js'
import { scenarios } from './scenarios.js'
import { incidents } from './incidents.js'
import TerminalLab from './TerminalLab.jsx'
import './App.css'

const categories = [
  { name: 'Linux', icon: '⌘', color: 'violet', desc: 'Commands, permissions & logs' },
  { name: 'AWS', icon: '☁', color: 'orange', desc: 'Cloud, networking & IAM' },
  { name: 'Docker', icon: '▣', color: 'blue', desc: 'Images, containers & builds' },
  { name: 'Kubernetes', icon: '⎈', color: 'pink', desc: 'Pods, services & rollouts' },
]
const tiers = [
  { name: 'Beginner', experience: 'Fresher', detail: 'Build strong fundamentals', color: 'green' },
  { name: 'Intermediate', experience: '2 years experience', detail: 'Work through practical scenarios', color: 'orange' },
  { name: 'Advanced', experience: '3 years experience', detail: 'Diagnose complex production behavior', color: 'pink' },
]
const terminalTasks = [
  { title: 'Make a script executable', context: '$ ls -l deploy.sh\n-rw-r--r-- 1 devops devops 240 deploy.sh', prompt: 'Enter the command to add execute permission for the file owner.', accepted: ['chmod u+x deploy.sh', 'chmod +x deploy.sh'], hint: 'Use chmod with u+x or +x.', explanation: 'chmod u+x deploy.sh adds execute permission for the owner.' },
  { title: 'Find recent errors', context: '$ tail -n 20 /var/log/app.log\n2026-10-16 INFO service started\n2026-10-16 ERROR database timeout', prompt: 'Enter a command that searches app.log for ERROR.', accepted: ["grep 'ERROR' app.log", 'grep ERROR app.log', 'grep "ERROR" app.log'], hint: 'Use grep PATTERN FILE.', explanation: 'grep ERROR app.log prints lines containing ERROR.' },
  { title: 'Inspect listening ports', context: '$ # Production service is not accepting connections', prompt: 'Enter a command to list listening TCP and UDP sockets numerically.', accepted: ['ss -tuln', 'ss -lntu', 'ss -tulpn', 'sudo ss -tulpn'], hint: 'Use the ss socket inspection tool.', explanation: 'ss -tuln lists listening TCP/UDP sockets and numeric ports.' },
  { title: 'Check disk space', context: '$ # The application reports "No space left on device"', prompt: 'Enter a command to show filesystem usage in human-readable units.', accepted: ['df -h'], hint: 'Think filesystem, not directory size.', explanation: 'df -h reports filesystem capacity and available space.' },
  { title: 'Check Kubernetes Pods', context: '$ # You are already connected to the correct cluster', prompt: 'Enter a command to list Pods in the current namespace.', accepted: ['kubectl get pods', 'kubectl get po'], hint: 'Start with kubectl get.', explanation: 'kubectl get pods lists Pods in the current namespace.' },
]

function loadSaved() {
  try {
    const value = JSON.parse(localStorage.getItem('codeclash-pro-state') || '{}')
    return { xp: value.xp ?? 1250, completed: value.completed ?? 0, correct: value.correct ?? 0, attempts: value.attempts ?? 0, quests: value.quests ?? [], badges: value.badges ?? [], name: value.name ?? 'Mayur', history: value.history ?? [] }
  } catch { return { xp: 1250, completed: 0, correct: 0, attempts: 0, quests: [], badges: [], name: 'Mayur', history: [] } }
}

export default function App({ student, onLogout }) {
  const [saved, setSaved] = useState(loadSaved)
  const [view, setView] = useState('dashboard')
  const [category, setCategory] = useState('Linux')
  const [tier, setTier] = useState('Beginner')
  const [quizIndex, setQuizIndex] = useState(0)
  const [picked, setPicked] = useState(null)
  const [quizBank, setQuizBank] = useState([])
  const [seconds, setSeconds] = useState(30)
  const [scenarioCategory, setScenarioCategory] = useState('Linux')
  const [scenarioIndex, setScenarioIndex] = useState(0)
  const [terminalIndex, setTerminalIndex] = useState(0)
  const [terminalInput, setTerminalInput] = useState('')
  const [terminalFeedback, setTerminalFeedback] = useState(null)
  const [roomCode, setRoomCode] = useState('')
  const [roomJoined, setRoomJoined] = useState(false)
  const [classSize, setClassSize] = useState('10')
  const [editingName, setEditingName] = useState(false)
  const [nameInput, setNameInput] = useState(saved.name)
  const [incidentIndex, setIncidentIndex] = useState(0)
  const [incidentPicked, setIncidentPicked] = useState(null)

  useEffect(() => {
    if (student?.display_name || student?.username) updateSaved({ name: student.display_name || student.username })
  }, [student])

  useEffect(() => { localStorage.setItem('codeclash-pro-state', JSON.stringify(saved)) }, [saved])
  const level = Math.floor(saved.xp / 500) + 1
  const nextLevelXP = level * 500
  const progress = Math.min(100, (saved.xp % 500) / 500 * 100)
  const accuracy = saved.attempts ? Math.round(saved.correct / saved.attempts * 100) : 0
  const currentQuestion = quizBank[quizIndex]
  const quizFinished = picked !== null || seconds === 0

  useEffect(() => {
    if (view !== 'quiz' || quizFinished) return undefined
    const id = window.setInterval(() => setSeconds((n) => Math.max(0, n - 1)), 1000)
    return () => window.clearInterval(id)
  }, [view, quizFinished, quizIndex])

  function updateSaved(patch) { setSaved((prev) => ({ ...prev, ...patch })) }
  function navigate(page) { setView(page); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  function startQuiz(cat, selectedTier = tier) {
    setCategory(cat); setTier(selectedTier)
    const list = (questionBank[cat]?.[selectedTier] || []).map((q, index) => ({ ...q, points: selectedTier === 'Advanced' ? 200 : selectedTier === 'Intermediate' ? 150 : 100, id: `${cat}-${selectedTier}-${index}` }))
    setQuizBank(list); setQuizIndex(0); setPicked(null); setSeconds(30); navigate('quiz')
  }
  function answerQuestion(index) {
    if (quizFinished || !currentQuestion) return
    const isCorrect = index === currentQuestion.options.indexOf(currentQuestion.answer)
    const gained = isCorrect ? currentQuestion.points : 0
    setPicked(index)
    updateSaved({
      xp: saved.xp + gained,
      completed: saved.completed + 1,
      attempts: saved.attempts + 1,
      correct: saved.correct + (isCorrect ? 1 : 0),
      history: [{ label: `${category} · ${tier}`, correct: isCorrect, date: new Date().toLocaleDateString() }, ...saved.history].slice(0, 8),
    })
  }
  function nextQuestion() {
    if (quizIndex + 1 >= quizBank.length) { navigate('results'); return }
    setQuizIndex((n) => n + 1); setPicked(null); setSeconds(30)
  }
  function startScenario(cat, index = 0) { setScenarioCategory(cat); setScenarioIndex(index); navigate('troubleshooting') }
  function completeScenario(scenario) {
    const key = `${scenarioCategory}-${scenario.title}`
    if (saved.badges.includes(key)) { navigate('troubleshooting'); return }
    updateSaved({ xp: saved.xp + scenario.xp, completed: saved.completed + 1, badges: [...saved.badges, key] })
    navigate('scenario-result')
  }
  function submitTerminal() {
    const task = terminalTasks[terminalIndex]
    const normalized = terminalInput.trim().replace(/\s+/g, ' ')
    const correct = task.accepted.some((answer) => answer.replace(/\s+/g, ' ') === normalized)
    setTerminalFeedback({ correct, message: correct ? task.explanation : `Not quite. Hint: ${task.hint}` })
    if (correct) updateSaved({ xp: saved.xp + 100, completed: saved.completed + 1, correct: saved.correct + 1, attempts: saved.attempts + 1 })
    else updateSaved({ attempts: saved.attempts + 1 })
  }
  function nextTerminal() { setTerminalIndex((n) => (n + 1) % terminalTasks.length); setTerminalInput(''); setTerminalFeedback(null) }
  function claimQuest(quest) { if (!saved.quests.includes(quest)) updateSaved({ quests: [...saved.quests, quest], xp: saved.xp + 100 }) }
  function answerIncident(index) {
    if (incidentPicked !== null) return
    const correct = index === incidents[incidentIndex].answer
    setIncidentPicked(index)
    updateSaved({ xp: saved.xp + (correct ? incidents[incidentIndex].xp : 0), attempts: saved.attempts + 1, correct: saved.correct + (correct ? 1 : 0), completed: saved.completed + 1 })
  }
  function nextIncident() { setIncidentIndex((n) => (n + 1) % incidents.length); setIncidentPicked(null) }
  const scenarioList = scenarios[scenarioCategory] || []
  const currentScenario = scenarioList[scenarioIndex % scenarioList.length]
  const activeQuests = [
    { id: 'quiz', title: 'Warm up your brain', description: 'Answer 3 quiz questions', progress: Math.min(saved.completed, 3), goal: 3 },
    { id: 'mission', title: 'Incident responder', description: 'Complete 1 troubleshooting scenario', progress: Math.min(saved.badges.length, 1), goal: 1 },
    { id: 'terminal', title: 'Terminal tactician', description: 'Earn a terminal challenge reward', progress: saved.history.some((h) => h.label === 'Terminal simulator') ? 1 : 0, goal: 1 },
  ]
  const skillValues = categories.map((c) => {
    const attempts = saved.history.filter((h) => h.label.startsWith(c.name))
    return { ...c, value: attempts.length ? Math.round(attempts.filter((h) => h.correct).length / attempts.length * 100) : 0, count: attempts.length }
  })

  return <div className="app-shell">
    <aside className="sidebar">
      <button className="brand" onClick={() => navigate('dashboard')}><span className="brand-mark">CC</span><span className="brand-copy"><strong>CODECLASH</strong><small>DEVOPS BATTLE ARENA</small></span></button>
      <div className="side-label">WORKSPACE</div>
      <nav className="side-nav">
        <Nav active={view === 'dashboard'} onClick={() => navigate('dashboard')} icon="▦">Dashboard</Nav>
        <Nav active={['quiz','results'].includes(view)} onClick={() => navigate('categories')} icon="⚔">Battle arena</Nav>
        <Nav active={view === 'missions' || view === 'troubleshooting'} onClick={() => navigate('missions')} icon="◈">Missions</Nav>
        <Nav active={view === 'classroom'} onClick={() => navigate('classroom')} icon="♟">Classroom battle</Nav>
        <Nav active={view === 'terminal'} onClick={() => navigate('terminal')} icon=">_">Terminal lab</Nav>
        <Nav active={view === 'analytics'} onClick={() => navigate('analytics')} icon="▥">Skills analytics</Nav>
      </nav>
      <div className="side-label category-label">CHALLENGE ZONES</div>
      <div className="side-categories">{categories.map((c) => <button className="side-category" key={c.name} onClick={() => { setCategory(c.name); navigate('categories') }}><span className={`category-icon ${c.color}`}>{c.icon}</span><span>{c.name}</span><span className="side-count">100 Qs</span></button>)}</div>
      <div className="sidebar-bottom"><div className="upgrade-card"><span className="upgrade-spark">✦</span><strong>Ready for the next level?</strong><p>Complete missions and earn XP to rank up.</p><button onClick={() => navigate('missions')}>Explore missions <span>↗</span></button></div><button className="profile-mini" onClick={() => navigate('profile')}><span className="avatar profile-avatar">{saved.name.slice(0,1).toUpperCase()}</span><span className="profile-copy"><strong>{saved.name}</strong><small>Level {level} · Challenger</small></span><span className="profile-menu">•••</span></button><button className="signout-button" onClick={onLogout}>Sign out</button></div>
    </aside>
    <main className="main-content">
      <header className="topbar"><div className="breadcrumb">Workspace <span>/</span> <strong>{pageTitle(view)}</strong></div><div className="topbar-right"><div className="live-pill"><span/> SYSTEM ONLINE</div><button className="topbar-signout" onClick={onLogout}>Sign out</button><button className="top-avatar" onClick={() => navigate('profile')}>{saved.name.slice(0,1).toUpperCase()}</button></div></header>
      {view === 'dashboard' && <div className="page-content">
        <section className="welcome-row"><div><div className="eyebrow"><span className="eyebrow-line"/> YOUR TRAINING GROUND</div><h1>Ready to <span className="gradient-text">clash?</span></h1><p className="page-subtitle">Train like an engineer. Respond like an expert. Level up every day.</p></div><button className="primary-button" onClick={() => navigate('missions')}>⚔ Start a mission <span>→</span></button></section>
        <section className="stats-grid"><StatCard icon="✦" color="violet" label="TOTAL EXPERIENCE" value={saved.xp.toLocaleString()} suffix="XP" foot={`${nextLevelXP - saved.xp} XP to next level`}/><StatCard icon="♜" color="orange" label="CURRENT LEVEL" value={level} suffix=" " foot={levelName(level)}/><StatCard icon="✓" color="green" label="CHALLENGES DONE" value={saved.completed} suffix="" foot={`${saved.correct} correct answers`}/><StatCard icon="◎" color="blue" label="ACCURACY" value={accuracy} suffix="%" foot={saved.attempts ? `${saved.attempts} attempts recorded` : 'Play a challenge to begin'}/></section>
        <section className="hero-banner"><div className="hero-copy"><div className="hero-tag"><span/> CRITICAL PRODUCTION CHALLENGE <span className="tag-date">• INCIDENT ROOM</span></div><h2>Production is <span>down.</span><br/>Can you save the day?</h2><p>Investigate realistic incidents, follow the evidence, and earn bonus XP.</p><div className="hero-meta"><span>◷ Timed response</span><span>✦ Up to 350 XP</span><span>▣ Real-world scenarios</span></div><button className="hero-button" onClick={() => navigate('incidents')}>Respond to incident <span>→</span></button></div><div className="hero-art"><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="terminal-card"><div className="terminal-head"><span/><span/><span/><small>incident-console</small></div><div className="terminal-body"><p><b>!</b> API health check failed</p><p className="terminal-muted">status: 502 Bad Gateway</p><p><b>➜</b> kubectl get pods</p><p className="terminal-green">api-7bd8c9&nbsp;&nbsp; 0/1&nbsp;&nbsp; CrashLoopBackOff</p><p><b>➜</b> <span className="cursor"/></p></div></div><div className="floating-xp">✦ +350 XP</div><div className="art-spark spark-a">✧</div></div></section>
        <section className="section-block"><div className="section-heading"><div><div className="eyebrow">CHOOSE YOUR PATH</div><h2>Challenge categories</h2></div><button className="text-button" onClick={() => navigate('categories')}>Browse all levels ↗</button></div><div className="challenge-grid">{categories.map((c) => <button className="challenge-card" key={c.name} onClick={() => { setCategory(c.name); navigate('categories') }}><div className="challenge-card-top"><span className={`big-category-icon ${c.color}`}>{c.icon}</span><span className="card-arrow">↗</span></div><h3>{c.name}</h3><p>{c.desc}</p><div className="challenge-card-bottom"><span>3 experience tiers</span><span className="difficulty-dots"><i/><i/><i/></span></div></button>)}</div></section>
        <section className="dashboard-columns"><div className="panel quests-panel"><div className="panel-heading"><div><div className="eyebrow">SMALL WINS, BIG SKILLS</div><h2>Daily quests</h2></div><span className="small-pill">+100 XP each</span></div>{activeQuests.map((q) => { const done = saved.quests.includes(q.id) || q.progress >= q.goal; return <div className="quest-row" key={q.id}><span className={`quest-icon ${done?'done':''}`}>{done?'✓':'✦'}</span><div className="quest-copy"><strong>{q.title}</strong><p>{q.description}</p><div className="mini-progress"><span style={{width:`${done?100:q.progress/q.goal*100}%`}}/></div></div>{done?<span className="claimed">CLAIMED</span>:<button className="claim-button" onClick={() => claimQuest(q.id)}>{q.progress>=q.goal?'Claim':'Claim demo'}</button>}</div>})}</div><div className="panel profile-progress"><div className="panel-heading"><div><div className="eyebrow">YOUR JOURNEY</div><h2>Level progression</h2></div><button className="text-button" onClick={() => navigate('profile')}>Profile ↗</button></div><div className="level-showcase"><div className="level-emblem">L{level}</div><div><strong>{levelName(level)}</strong><p>Every challenge makes you stronger.</p></div></div><div className="progress-label"><span>Level {level}</span><span>{saved.xp % 500} / 500 XP</span></div><div className="level-track"><span style={{width:`${progress}%`}}/></div><div className="next-level">Next rank: <strong>{levelName(level+1)}</strong></div><button className="wide-secondary" onClick={() => navigate('analytics')}>View skill analytics →</button></div></section>
        <section className="section-block"><div className="section-heading"><div><div className="eyebrow">TRAIN WITH REALISTIC FAILURES</div><h2>Production & troubleshooting labs</h2></div><button className="text-button" onClick={() => navigate('troubleshooting')}>All scenarios ↗</button></div><div className="scenario-preview-grid">{categories.map((c) => <button className="scenario-preview" key={c.name} onClick={() => startScenario(c.name)}><span className={`category-icon ${c.color}`}>{c.icon}</span><strong>{c.name} troubleshooting</strong><small>{scenarios[c.name].length} guided scenarios</small><span className="preview-arrow">↗</span></button>)}</div></section>
        <Footer/>
      </div>}
      {view === 'categories' && <div className="page-content"><PageHeading eyebrow="PICK YOUR DIFFICULTY" title={<>Choose your <span className="gradient-text">challenge.</span></>} subtitle="Start as a fresher, then progress toward real-world engineer-level questions."/><div className="category-tabs">{categories.map(c=><button key={c.name} className={`category-tab ${category===c.name?'selected':''}`} onClick={()=>setCategory(c.name)}><span className={`category-icon ${c.color}`}>{c.icon}</span>{c.name}<small>10 per tier</small></button>)}</div><div className="tier-grid">{tiers.map(t=><div className="tier-card" key={t.name}><span className={`tier-label ${t.color}`}>{t.name.toUpperCase()}</span><h2>{t.experience}</h2><p>{t.detail}. Each round has 10 questions with explanations.</p><ul><li>Four answer choices per question</li><li>{t.name==='Beginner'?'Core commands and concepts':t.name==='Intermediate'?'Hands-on troubleshooting and configuration':'Production reasoning and design trade-offs'}</li><li>{t.name==='Beginner'?100:t.name==='Intermediate'?150:200} XP per correct answer</li></ul><button className="primary-button" onClick={()=>startQuiz(category,t.name)}>Start {t.name} quiz →</button></div>)}</div><div className="panel category-note"><strong>Experience guide</strong><p>Beginner = fresher foundations · Intermediate = around 2 years of practical experience · Advanced = around 3 years of experience. These are learning levels, not formal equivalencies.</p></div><Footer/></div>}
      {view === 'quiz' && currentQuestion && <div className="page-content battle-page"><button className="back-link" onClick={()=>navigate('categories')}>← Change category / level</button><PageHeading eyebrow={`LIVE CHALLENGE · ${category.toUpperCase()} · ${tier.toUpperCase()}`} title={<>Enter the <span className="gradient-text">arena.</span></>} subtitle="Think through the question. Learn from every answer."/><div className="battle-layout"><section className="panel quiz-panel"><div className="quiz-top"><span className={`difficulty-badge ${tier.toLowerCase()}`}>{tier.toUpperCase()}</span><span className="question-counter">QUESTION {quizIndex+1} <span>/ {quizBank.length}</span></span></div><div className="progress-track"><div style={{width:`${(quizIndex+1)/quizBank.length*100}%`}}/></div><div className="question-label">CHALLENGE {String(quizIndex+1).padStart(2,'0')}</div><h2 className="question-title">{currentQuestion.prompt}</h2><p className="question-hint">Choose the best answer. You'll see an explanation after submitting.</p><div className="answer-list">{currentQuestion.options.map((option,i)=>{const answerIndex=currentQuestion.options.indexOf(currentQuestion.answer);let state='';if(quizFinished&&i===answerIndex)state='correct';else if(picked===i&&i!==answerIndex)state='incorrect';return <button key={option} disabled={quizFinished} className={`answer-option ${state}`} onClick={()=>answerQuestion(i)}><span className="answer-letter">{String.fromCharCode(65+i)}</span><span>{option}</span>{state==='correct'&&<span className="answer-check">✓</span>}{state==='incorrect'&&<span className="answer-check">×</span>}</button>})}</div>{quizFinished&&<div className={`answer-feedback ${picked===currentQuestion.options.indexOf(currentQuestion.answer)?'feedback-correct':'feedback-wrong'}`}><strong>{seconds===0&&picked===null?'Time is up!':picked===currentQuestion.options.indexOf(currentQuestion.answer)?`Correct! +${currentQuestion.points} XP`:'Not quite — use this as a learning moment.'}</strong><p>{currentQuestion.explanation}</p></div>}<div className="quiz-footer"><span>✦ Reward: <strong>{currentQuestion.points} XP</strong></span>{quizFinished?<button className="primary-button" onClick={nextQuestion}>{quizIndex+1===quizBank.length?'View results':'Next question'} →</button>:<span className="select-hint">Select an answer to continue</span>}</div></section><aside className="battle-aside"><div className={`panel timer-panel ${seconds<=10?'timer-warning':''}`}><div className="eyebrow">TIME REMAINING</div><div className="timer-value">00:{String(seconds).padStart(2,'0')}</div><div className="timer-track"><span style={{width:`${seconds/30*100}%`}}/></div><p>Stay focused, challenger.</p></div><div className="panel round-panel"><div className="eyebrow">YOUR PERFORMANCE</div><RoundStat label="Experience" value={`${saved.xp.toLocaleString()} XP`}/><RoundStat label="Questions answered" value={saved.completed}/><RoundStat label="Current round" value={`${quizIndex+1} / ${quizBank.length}`}/></div><div className="tip-card"><span>✧ LEARNING TIP</span><p>{currentQuestion.explanation}</p></div></aside></div><Footer/></div>}
      {view === 'results' && <div className="page-content results-page"><div className="results-icon">✦</div><div className="eyebrow">ROUND COMPLETE</div><h1>Keep building, <span className="gradient-text">challenger.</span></h1><p className="page-subtitle">Your progress is saved in this browser for the demo.</p><div className="results-grid"><StatCard icon="✦" color="violet" label="TOTAL XP" value={saved.xp.toLocaleString()} suffix="XP" foot="Experience earned"/><StatCard icon="✓" color="green" label="ACCURACY" value={`${accuracy}%`} suffix="" foot="Across recorded attempts"/><StatCard icon="♜" color="blue" label="LEVEL" value={level} suffix="" foot={levelName(level)}/></div><div className="results-actions"><button className="primary-button" onClick={()=>startQuiz(category,tier)}>Play this tier again ↗</button><button className="secondary-button" onClick={()=>navigate('categories')}>Choose another tier</button></div><Footer/></div>}
      {view === 'missions' && <div className="page-content"><PageHeading eyebrow="MISSION CONTROL" title={<>Real skills. <span className="gradient-text">Real missions.</span></>} subtitle="Follow evidence, choose safe diagnostics, and practise how engineers troubleshoot."/><div className="mission-feature"><div><span className="priority-badge">HIGH PRIORITY</span><h2>Mission: Restore service health</h2><p>A deployment has gone unhealthy. Work through the evidence in the guided troubleshooting labs.</p><button className="primary-button" onClick={()=>navigate('incidents')}>Enter incident room →</button></div><div className="mission-symbol">⌘</div></div><div className="section-heading"><div><div className="eyebrow">SELECT A MISSION ZONE</div><h2>Choose your environment</h2></div></div><div className="scenario-preview-grid">{categories.map(c=><button className="scenario-preview" key={c.name} onClick={()=>startScenario(c.name)}><span className={`category-icon ${c.color}`}>{c.icon}</span><strong>{c.name} mission pack</strong><small>{scenarios[c.name].length} guided troubleshooting missions</small><span className="preview-arrow">↗</span></button>)}</div><div className="section-block"><div className="section-heading"><div><div className="eyebrow">URGENT RESPONSE</div><h2>Can you solve this critical production issue?</h2></div></div><div className="incident-cards">{incidents.slice(0,3).map((inc,i)=><button className="incident-card" key={inc.title} onClick={()=>{setIncidentIndex(i);setIncidentPicked(null);navigate('incidents')}}><span className={`severity ${inc.severity.toLowerCase()}`}>{inc.severity}</span><h3>{inc.title}</h3><p>{inc.symptom}</p><span className="incident-reward">✦ +{inc.xp} XP</span></button>)}</div></div><Footer/></div>}
      {view === 'troubleshooting' && currentScenario && <div className="page-content"><button className="back-link" onClick={()=>navigate('missions')}>← Back to mission control</button><PageHeading eyebrow={`${scenarioCategory.toUpperCase()} TROUBLESHOOTING`} title={<>Investigate the <span className="gradient-text">symptoms.</span></>} subtitle="Work the diagnostic checklist in order. These labs are simulated; they do not change real systems."/><div className="scenario-switcher">{categories.map(c=><button className={`filter-chip ${scenarioCategory===c.name?'active':''}`} key={c.name} onClick={()=>startScenario(c.name)}>{c.name}</button>)}</div><div className="scenario-layout"><section className="panel scenario-main"><div className="scenario-title-row"><span className={`severity ${currentScenario.severity.toLowerCase()}`}>{currentScenario.severity}</span><span className="incident-reward">✦ {currentScenario.xp} XP</span></div><h2>{currentScenario.title}</h2><div className="symptom-box"><span className="eyebrow">INCIDENT SYMPTOM</span><p>{currentScenario.symptom}</p></div><h3>Mission objective</h3><p>{currentScenario.goal}</p><h3>Diagnostic checklist</h3><div className="checklist">{currentScenario.steps.map((step,i)=><label key={step} className="check-row"><input type="checkbox"/><span className="check-num">{String(i+1).padStart(2,'0')}</span><span>{step}</span></label>)}</div><button className="primary-button" onClick={()=>completeScenario(currentScenario)}>Complete mission and reveal resolution →</button></section><aside className="panel scenario-aside"><div className="eyebrow">ENGINEER'S NOTEBOOK</div><h3>Safe troubleshooting</h3><p>Observe before changing. Collect evidence, isolate the likely cause, and prefer the smallest reversible fix.</p><div className="tip-card"><span>SIMULATED LAB</span><p>Commands are examples for learning. Run them only in an environment you are authorized to manage.</p></div></aside></div><Footer/></div>}
      {view === 'scenario-result' && <div className="page-content results-page"><div className="results-icon">✓</div><div className="eyebrow">MISSION RESOLUTION</div><h1>Good incident <span className="gradient-text">response.</span></h1><p className="page-subtitle">Use this resolution as a troubleshooting playbook.</p><div className="panel resolution-panel"><h2>{currentScenario?.title}</h2><p>{currentScenario?.solution}</p><div className="incident-reward">✦ Mission reward recorded · {currentScenario?.xp} XP</div></div><div className="results-actions"><button className="primary-button" onClick={()=>startScenario(scenarioCategory,(scenarioIndex+1)%scenarios[scenarioCategory].length)}>Next scenario →</button><button className="secondary-button" onClick={()=>navigate('missions')}>Mission control</button></div><Footer/></div>}
      {view === 'terminal' && <TerminalLab onReward={(challenge) => {
        setSaved((prev) => ({
          ...prev,
          xp: prev.xp + challenge.xp,
          completed: prev.completed + 1,
          history: [{ label: `${challenge.tech} · ${challenge.title}`, correct: true, date: new Date().toLocaleDateString() }, ...(prev.history || [])].slice(0, 50),
        }))
      }} />}
      {view === 'classroom' && <div className="page-content"><PageHeading eyebrow="TRAIN TOGETHER" title={<>Classroom <span className="gradient-text">battle.</span></>} subtitle="Create a room for your class or join a trainer's room code. Demo-only until the backend is connected."/><div className="classroom-grid"><section className="panel classroom-card"><span className="classroom-icon">♟</span><h2>Create a battle room</h2><p>Choose a round size and generate a demo room code for your students.</p><label className="field-label">QUESTIONS PER ROUND</label><select value={classSize} onChange={e=>setClassSize(e.target.value)}><option value="10">10 questions · Quick clash</option><option value="20">20 questions · Standard battle</option><option value="30">30 questions · Endurance</option></select><button className="primary-button" onClick={()=>{setRoomCode(`CC-${Math.random().toString(36).slice(2,6).toUpperCase()}`);setRoomJoined(true)}}>Create room →</button>{roomJoined&&<div className="room-created"><span className="eyebrow">ROOM CREATED · DEMO</span><strong>{roomCode}</strong><p>{classSize}-question round ready. Share this code in class; multiplayer sync needs the Django backend.</p><button className="secondary-button" onClick={()=>navigator.clipboard?.writeText(roomCode)}>Copy room code</button></div>}</section><section className="panel classroom-card"><span className="classroom-icon orange-icon">↗</span><h2>Join a battle</h2><p>Enter the room code provided by your trainer.</p><label className="field-label">ROOM CODE</label><input className="text-field" value={roomCode} onChange={e=>setRoomCode(e.target.value.toUpperCase())} placeholder="e.g. CC-7K2Q"/><button className="primary-button" onClick={()=>setRoomJoined(true)} disabled={!roomCode.trim()}>Join room →</button>{roomJoined&&<div className="room-created"><strong>You're ready to join.</strong><p>Room code {roomCode} is stored in this local demo. Real room validation and live sync will be added in the backend phase.</p></div>}</section></div><div className="panel classroom-note"><div className="eyebrow">TRAINER TOOLKIT</div><h2>Battle rules</h2><div className="rule-grid"><div><strong>Fair play</strong><p>Same questions and time limit for every participant.</p></div><div><strong>XP scoring</strong><p>Correct answers earn points; optional speed bonus can be added later.</p></div><div><strong>Live ranking</strong><p>Real-time class leaderboard requires Django Channels or polling API.</p></div></div></div><Footer/></div>}
      {view === 'incidents' && <div className="page-content"><button className="back-link" onClick={()=>navigate('missions')}>← Back to mission control</button><PageHeading eyebrow="CRITICAL INCIDENT ROOM" title={<>Can you save <span className="gradient-text">production?</span></>} subtitle="Read the symptoms and select the safest, evidence-led first response."/><div className="incident-quiz-layout"><section className="panel incident-question"><div className="scenario-title-row"><span className={`severity ${incidents[incidentIndex].severity.toLowerCase()}`}>{incidents[incidentIndex].severity}</span><span className="question-counter">INCIDENT {incidentIndex+1} / {incidents.length}</span></div><div className="eyebrow">{incidents[incidentIndex].service}</div><h2>{incidents[incidentIndex].title}</h2><div className="symptom-box"><span className="eyebrow">WHAT'S HAPPENING?</span><p>{incidents[incidentIndex].symptom}</p></div><h3>What's your first move?</h3><div className="answer-list">{incidents[incidentIndex].choices.map((choice,i)=>{const state=incidentPicked!==null&&i===incidents[incidentIndex].answer?'correct':incidentPicked===i?'incorrect':'';return <button key={choice} disabled={incidentPicked!==null} className={`answer-option ${state}`} onClick={()=>answerIncident(i)}><span className="answer-letter">{String.fromCharCode(65+i)}</span><span>{choice}</span></button>})}</div>{incidentPicked!==null&&<div className={`answer-feedback ${incidentPicked===incidents[incidentIndex].answer?'feedback-correct':'feedback-wrong'}`}><strong>{incidentPicked===incidents[incidentIndex].answer?'Good call. Evidence first.':'Unsafe or incomplete first step.'}</strong><p>{incidents[incidentIndex].why}</p></div>}<div className="quiz-footer"><span>✦ Reward: <strong>{incidents[incidentIndex].xp} XP</strong></span>{incidentPicked!==null&&<button className="primary-button" onClick={nextIncident}>Next incident →</button>}</div></section><aside className="panel incident-principles"><div className="eyebrow">PRODUCTION PRINCIPLES</div>{['Protect customer impact first','Gather evidence before changing state','Prefer reversible, minimal changes','Verify recovery with metrics and logs'].map((x,i)=><div className="principle" key={x}><span>{String(i+1).padStart(2,'0')}</span><p>{x}</p></div>)}</aside></div><Footer/></div>}
      {view === 'analytics' && <AnalyticsDashboard saved={saved} accuracy={accuracy} level={level} navigate={navigate} />}
      {view === 'profile' && <div className="page-content"><PageHeading eyebrow="PLAYER CARD" title={<>Your DevOps <span className="gradient-text">identity.</span></>} subtitle="A personal training profile for your CodeClash journey."/><section className="panel player-profile"><div className="profile-hero"><div className="profile-large-avatar">{saved.name.slice(0,1).toUpperCase()}</div><div className="profile-hero-copy">{editingName?<form onSubmit={e=>{e.preventDefault();if(nameInput.trim())updateSaved({name:nameInput.trim()});setEditingName(false)}}><input className="text-field" value={nameInput} onChange={e=>setNameInput(e.target.value)}/><button className="secondary-button" type="submit">Save name</button></form>:<><h2>{saved.name}</h2><p>{levelName(level)} · Level {level}</p><button className="text-button" onClick={()=>{setNameInput(saved.name);setEditingName(true)}}>Edit display name ✎</button></>}</div><div className="profile-xp"><strong>{saved.xp.toLocaleString()}</strong><span>TOTAL XP</span></div></div><div className="level-track"><span style={{width:`${progress}%`}}/></div><div className="profile-metrics"><div><strong>{saved.completed}</strong><span>Challenges completed</span></div><div><strong>{accuracy}%</strong><span>Answer accuracy</span></div><div><strong>{saved.badges.length}</strong><span>Mission badges</span></div><div><strong>{saved.quests.length}</strong><span>Quests claimed</span></div></div></section><div className="section-block"><div className="section-heading"><div><div className="eyebrow">YOUR COLLECTION</div><h2>Mission badges</h2></div></div>{saved.badges.length?<div className="badge-collection">{saved.badges.map(b=><span className="earned-badge" key={b}>✦ {b}</span>)}</div>:<div className="panel empty-state"><span>✦</span><strong>Your first badge is waiting.</strong><p>Complete a troubleshooting mission to earn one.</p><button className="primary-button" onClick={()=>navigate('missions')}>Explore missions →</button></div>}</div><Footer/></div>}
    </main>
  </div>
}


function AnalyticsDashboard({ saved, accuracy, level, navigate }) {
  const [activeTech, setActiveTech] = useState('Linux')
  const [range, setRange] = useState('30 days')
  const techs = [
    { name: 'Linux', color: '#a78bfa', icon: '⌘', topics: [
      ['File System & Commands', 92], ['Users & Permissions', 85], ['Process Management', 78],
      ['Networking', 70], ['Shell Scripting', 60], ['Troubleshooting', 50], ['Monitoring', 65],
    ]},
    { name: 'AWS', color: '#fbbf24', icon: '☁', topics: [
      ['IAM & Access', 78], ['EC2 & Networking', 72], ['S3 & Storage', 84],
      ['Load Balancing', 62], ['VPC Troubleshooting', 54], ['Monitoring', 69], ['Cost & Security', 76],
    ]},
    { name: 'Docker', color: '#38bdf8', icon: '▣', topics: [
      ['Images & Builds', 88], ['Container Lifecycle', 82], ['Networking', 68],
      ['Volumes', 74], ['Compose', 61], ['Debugging', 56], ['Security', 70],
    ]},
    { name: 'Kubernetes', color: '#34d399', icon: '✿', topics: [
      ['Pods & Deployments', 87], ['Services & DNS', 73], ['ConfigMaps & Secrets', 79],
      ['Probes & Health', 64], ['Scheduling', 58], ['Ingress', 67], ['Troubleshooting', 52],
    ]},
  ]
  const palette = ['#a78bfa', '#fbbf24', '#38bdf8', '#34d399']
  const history = Array.isArray(saved.history) ? saved.history : []
  const actualByTech = techs.map(t => {
    const rows = history.filter(h => String(h.label || '').toLowerCase().startsWith(t.name.toLowerCase()))
    const correct = rows.filter(h => h.correct).length
    return { ...t, attempts: rows.length, actualAccuracy: rows.length ? Math.round(correct / rows.length * 100) : null }
  })
  const hasHistory = history.length > 0
  const displayedSkills = actualByTech.map((t, i) => ({
    ...t,
    value: t.actualAccuracy === null ? [85, 72, 68, 87][i] : t.actualAccuracy,
    isSample: t.actualAccuracy === null,
  }))
  const overall = saved.attempts ? accuracy : 78
  const overallIsSample = !saved.attempts
  const completed = saved.completed || 0
  const estimatedMinutes = Math.max(0, saved.attempts * 3 + saved.badges.length * 12)
  const formatTime = mins => `${Math.floor(mins / 60)}h ${mins % 60}m`
  const selected = techs.find(t => t.name === activeTech) || techs[0]
  const groupedBars = [
    { name: 'Linux', values: [90, 78, 62] }, { name: 'AWS', values: [82, 68, 48] },
    { name: 'Docker', values: [85, 70, 55] }, { name: 'Kubernetes', values: [88, 80, 60] },
  ]
  const radarVals = displayedSkills.map(t => t.value)
  const radarPoints = radarVals.map((v, i) => {
    const angle = (-Math.PI / 2) + i * (Math.PI * 2 / 4)
    const r = 24 + v * 0.72
    return `${150 + Math.cos(angle) * r},${105 + Math.sin(angle) * r}`
  }).join(' ')
  const radarTarget = [95, 90, 90, 95].map((v, i) => {
    const angle = (-Math.PI / 2) + i * (Math.PI * 2 / 4)
    const r = 24 + v * 0.72
    return `${150 + Math.cos(angle) * r},${105 + Math.sin(angle) * r}`
  }).join(' ')
  const activity = Array.from({ length: 84 }, (_, i) => {
    const seed = (i * 17 + i * i * 3 + (saved.attempts || 5) * 11) % 13
    return seed < 3 ? 0 : seed < 6 ? 1 : seed < 9 ? 2 : seed < 11 ? 3 : 4
  })
  const recent = history.slice(0, 5)
  const recommendations = [
    { icon: '◎', title: 'Focus on AWS Networking', text: 'Review VPC routes, security groups, NACLs and load balancer health checks.', button: 'Start practice', color: 'orange', tech: 'AWS' },
    { icon: '>_', title: 'Improve Linux Troubleshooting', text: 'Practise log analysis, disk pressure and process diagnostics.', button: 'Start lab', color: 'blue', tech: 'Linux' },
    { icon: '▣', title: 'Learn Docker Advanced', text: 'Practise multi-stage builds, container networking and persistent volumes.', button: 'Take quiz', color: 'pink', tech: 'Docker' },
  ]
  return <div className="page-content analytics-page">
    <div className="analytics-title-row">
      <div><div className="eyebrow">WORKSPACE / SKILLS ANALYTICS</div><h1>Skills <span className="gradient-text">Analytics</span></h1><p className="page-subtitle">Track your progress, find weak areas and get personalized recommendations.</p></div>
      <label className="analytics-range">▦ <select value={range} onChange={e => setRange(e.target.value)}><option>7 days</option><option>30 days</option><option>90 days</option><option>All time</option></select></label>
    </div>
    <div className="analytics-demo-note"><span>●</span> {hasHistory ? 'Attempt accuracy and activity are based on your saved browser history. Topic and difficulty breakdowns are practice-demo estimates until the backend records every answer.' : 'Demo preview: charts use illustrative skill scores until you complete challenges. Your XP, level and challenge totals are taken from this browser.'}</div>
    <section className="stats-grid analytics-kpis">
      <StatCard icon="◎" color="green" label="OVERALL ACCURACY" value={`${overall}%`} suffix="" foot={overallIsSample ? 'Illustrative preview score' : `${saved.correct} correct of ${saved.attempts} attempts`}/>
      <StatCard icon="✦" color="violet" label="TOTAL XP EARNED" value={saved.xp.toLocaleString()} suffix="" foot={`${saved.xp >= 450 ? `+${Math.min(saved.xp, 450)} XP` : `${saved.xp} XP`} total in this browser`}/>
      <StatCard icon="♜" color="orange" label="CHALLENGES COMPLETED" value={`${completed}`} suffix="" foot={`${saved.badges.length} mission badges earned`}/>
      <StatCard icon="◷" color="blue" label="ESTIMATED STUDY TIME" value={formatTime(estimatedMinutes)} suffix="" foot="Estimated from recorded attempts"/>
    </section>
    <div className="analytics-main-grid">
      <section className="panel analytics-panel mastery-panel">
        <PanelTitle eyebrow="TECHNOLOGY BREAKDOWN" title="Skill mastery by technology"/>
        <div className="donut-layout">
          <div className="mastery-donut" style={{background:`conic-gradient(${displayedSkills.map((s,i)=>`${palette[i]} ${displayedSkills.slice(0,i).reduce((sum,x)=>sum+x.value,0)/displayedSkills.reduce((sum,x)=>sum+x.value,0)*100}% ${displayedSkills.slice(0,i+1).reduce((sum,x)=>sum+x.value,0)/displayedSkills.reduce((sum,x)=>sum+x.value,0)*100}%`).join(', ')})`}}><div><strong>{overall}%</strong><span>Overall</span></div></div>
          <div className="donut-legend">{displayedSkills.map((s,i)=><button className={`legend-row ${activeTech===s.name?'selected':''}`} key={s.name} onClick={()=>setActiveTech(s.name)}><i style={{background:palette[i]}}/><span>{s.name}</span><strong>{s.value}%</strong></button>)}</div>
        </div>
      </section>
      <section className="panel analytics-panel radar-panel">
        <PanelTitle eyebrow="STRENGTH PROFILE" title="Skills radar chart"/>
        <div className="radar-wrap"><svg viewBox="0 0 300 220" role="img" aria-label="Skill comparison radar chart">
          {[25,45,65,85].map(r=><polygon key={r} points={[0,1,2,3].map(i=>{const a=-Math.PI/2+i*Math.PI/2;return `${150+Math.cos(a)*r},${105+Math.sin(a)*r}`}).join(' ')} fill="none" stroke="#33344b" strokeWidth="1"/>)}
          {[0,1,2,3].map(i=>{const a=-Math.PI/2+i*Math.PI/2;return <line key={i} x1="150" y1="105" x2={150+Math.cos(a)*90} y2={105+Math.sin(a)*90} stroke="#33344b"/>})}
          <polygon points={radarTarget} fill="#60a5fa" fillOpacity=".06" stroke="#60a5fa" strokeDasharray="4 4" strokeWidth="1.4"/>
          <polygon points={radarPoints} fill="#a78bfa" fillOpacity=".23" stroke="#b794ff" strokeWidth="2"/>
          {radarVals.map((v,i)=>{const a=-Math.PI/2+i*Math.PI/2;const r=24+v*.72;return <circle key={i} cx={150+Math.cos(a)*r} cy={105+Math.sin(a)*r} r="3" fill="#d8b4fe"/>})}
          <text x="150" y="9" textAnchor="middle" fill="#d6d2e7" fontSize="10">Linux</text><text x="265" y="108" textAnchor="middle" fill="#d6d2e7" fontSize="10">AWS</text><text x="150" y="214" textAnchor="middle" fill="#d6d2e7" fontSize="10">Docker</text><text x="35" y="108" textAnchor="middle" fill="#d6d2e7" fontSize="10">Kubernetes</text>
        </svg></div>
        <div className="chart-legend"><span><i className="legend-purple"/>Your skills</span><span><i className="legend-dashed"/>Target level</span></div>
      </section>
      <section className="panel analytics-panel level-performance">
        <PanelTitle eyebrow="DIFFICULTY COMPARISON" title="Question level performance"/>
        <div className="bar-legend"><span><i className="bar-green"/>Beginner</span><span><i className="bar-blue"/>Intermediate</span><span><i className="bar-purple"/>Advanced</span></div>
        <div className="grouped-chart">
          <div className="chart-y-labels"><span>100%</span><span>75%</span><span>50%</span><span>25%</span><span>0%</span></div>
          <div className="grouped-chart-body"><div className="chart-grid-lines"><i/><i/><i/><i/><i/></div>{groupedBars.map(group=><div className="bar-group" key={group.name}>{group.values.map((v,i)=><div className={`chart-bar bar-${i}`} key={i} style={{height:`${v}%`}} title={`${group.name}: ${v}%`}><span>{v}%</span></div>)}<small>{group.name}</small></div>)}</div>
        </div>
      </section>
      <section className="panel analytics-panel topic-panel">
        <div className="analytics-panel-head"><PanelTitle eyebrow="DETAILED BREAKDOWN" title="Topic-wise performance"/><div className="tech-tabs">{techs.map(t=><button key={t.name} className={activeTech===t.name?'active':''} onClick={()=>setActiveTech(t.name)}>{t.name}</button>)}</div></div>
        {selected.topics.map(([name,value],i)=><div className="topic-performance-row" key={name}><span>{name}</span><div className="topic-track"><i style={{width:`${value}%`,background:value<60?'#fbbf24':value<75?'#3b9af7':'#36d399'}}/></div><strong>{value}%</strong></div>)}
        <p className="chart-footnote">Topic scores are illustrative until per-topic answer history is stored.</p>
      </section>
      <section className="panel analytics-panel heatmap-panel">
        <PanelTitle eyebrow="CONSISTENCY" title="Activity heatmap"/>
        <p className="panel-subtext">Practice activity · {range}</p>
        <div className="heatmap-grid">{activity.slice(range==='7 days'?-7:range==='30 days'?-35:0).map((v,i)=><span key={i} className={`heat-cell heat-${v}`} title={`${v ? v+' activity points' : 'No activity'} · day ${i+1}`}/>)}</div>
        <div className="heatmap-footer"><span>Less activity</span><div>{[0,1,2,3,4].map(v=><i key={v} className={`heat-cell heat-${v}`}/>)}</div><span>More activity</span></div>
      </section>
      <section className="panel analytics-panel difficulty-panel">
        <PanelTitle eyebrow="QUESTION BANK" title="Topic difficulty distribution"/>
        <div className="donut-layout difficulty-layout"><div className="difficulty-donut"><div><strong>120</strong><span>Questions</span></div></div><div className="difficulty-legend"><div><i className="bar-green"/> <span>Easy</span><strong>40 <small>(33%)</small></strong></div><div><i className="bar-blue"/> <span>Medium</span><strong>50 <small>(42%)</small></strong></div><div><i className="bar-purple"/> <span>Hard</span><strong>30 <small>(25%)</small></strong></div></div></div>
        <p className="chart-footnote">Distribution reflects the current demo question bank.</p>
      </section>
      <section className="panel analytics-panel recent-panel">
        <PanelTitle eyebrow="YOUR JOURNEY" title="Recent activity"/>
        {recent.length ? recent.map((h,i)=><div className="analytics-history-row" key={`${h.label}-${i}`}><span className={h.correct?'history-check':'history-miss'}>{h.correct?'✓':'×'}</span><div><strong>{h.label}</strong><small>{h.date || 'Recent'}</small></div><b className={h.correct?'xp-positive':'xp-negative'}>{h.correct?'+XP':'Review'}</b></div>) : <div className="analytics-empty"><strong>No recent activity yet</strong><p>Complete a quiz to populate your learning history.</p><button className="secondary-button" onClick={()=>navigate('categories')}>Start a quiz →</button></div>}
        {recent.length>0 && <button className="text-button analytics-view-all" onClick={()=>navigate('categories')}>Practise more →</button>}
      </section>
      <section className="panel analytics-panel recommendations-panel">
        <div className="analytics-panel-head"><PanelTitle eyebrow="PERSONALIZED NEXT STEPS" title="Recommended for you"/><span className="recommendation-status">● LOCAL INSIGHTS</span></div>
        <div className="recommendation-cards">{recommendations.map(r=><div className={`recommendation-card ${r.color}`} key={r.title}><div className="recommendation-icon">{r.icon}</div><strong>{r.title}</strong><p>{r.text}</p><button onClick={()=>{if(r.tech==='Linux')navigate('terminal');else {navigate('categories')}}}>{r.button} →</button></div>)}</div>
        <p className="chart-footnote">Recommendations are rule-based demo suggestions, not AI-generated, until a recommendation service is connected.</p>
      </section>
    </div>
    <Footer/>
  </div>
}
function PanelTitle({eyebrow,title}){return <div className="panel-heading analytics-panel-title"><div><div className="eyebrow">{eyebrow}</div><h2>{title}</h2></div></div>}

function Nav({active,onClick,icon,children}){return <button className={`nav-item ${active?'active':''}`} onClick={onClick}><span>{icon}</span>{children}{active&&<span className="nav-dot"/>}</button>}
function StatCard({icon,color,label,value,suffix,foot}){return <div className="stat-card"><div className="stat-top"><span className={`stat-icon ${color}`}>{icon}</span><span className="stat-label">{label}</span></div><div className="stat-value">{value}<small>{suffix}</small></div><div className="stat-foot">{foot}</div></div>}
function RoundStat({label,value}){return <div className="round-stat"><span>{label}</span><strong>{value}</strong></div>}
function PageHeading({eyebrow,title,subtitle}){return <div className="page-heading"><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p className="page-subtitle">{subtitle}</p></div>}
function Footer(){return <footer className="footer"><span>© 2026 CODECLASH ARENA</span><span>LEARN. TROUBLESHOOT. LEVEL UP. <b>✦</b></span></footer>}
function pageTitle(view){return ({dashboard:'Dashboard',categories:'Challenge categories',quiz:'Battle arena',results:'Round results',missions:'Mission control',troubleshooting:'Troubleshooting lab','scenario-result':'Mission resolution',terminal:'Terminal simulator',classroom:'Classroom battle',incidents:'Critical production incident',analytics:'Skills analytics',profile:'Student profile'})[view]||'Dashboard'}
function levelName(level){if(level>=10)return 'DevOps Legend';if(level>=7)return 'Production Guardian';if(level>=5)return 'Kubernetes Warrior';if(level>=3)return 'Cloud Apprentice';if(level>=2)return 'Container Explorer';return 'Linux Rookie'}
