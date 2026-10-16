# CodeClash Pro — DevOps Battle Arena

A gamified React + Vite frontend for DevOps training. It is designed for fresher fundamentals through approximately 2-year and 3-year experience-level practice.

## Included features
- Improved dashboard with XP, levels, accuracy, daily quests, and mission entry points
- Linux, AWS, Docker, and Kubernetes question banks
- Beginner (fresher), Intermediate (~2 years), and Advanced (~3 years) tiers
- 10 curated multiple-choice questions per technology per tier (120 total)
- Guided troubleshooting scenarios for all four technologies
- Critical production incident challenges
- Safe terminal command simulator (does not execute shell commands)
- Classroom battle-room UI (demo only; no live multiplayer yet)
- Student profile, levels, mission badges, and skills analytics
- Demo progress saved to browser localStorage

## Requirements
- Node.js 20.19+ or 22.12+ recommended
- npm

## Run
```bash
npm install
npm run dev
```
Open the URL Vite prints, usually http://localhost:5173.

## Validate production build
```bash
npm run build
npm run lint
npm run preview
```

## Important limitations
This frontend now requires a CodeClash student account before the dashboard loads. It connects to the Django REST backend at `http://localhost:8000` through Vite's `/api` proxy and uses session cookies plus a CSRF cookie for safe authenticated requests. Start the backend first, then run this project with `npm install` and `npm run dev`.

Use the **Create one** option on the sign-in page to create a student account. This is intentionally separate from Django's `/admin/` login; students should never use an admin account to enter the learning app. The dashboard UI and its existing learning routes remain unchanged after sign-in.

## Project structure
```text
codeclash-pro/
├── index.html
├── package.json
├── vite.config.js
├── eslint.config.js
└── src/
    ├── App.jsx
    ├── App.css
    ├── index.css
    ├── main.jsx
    ├── questionBank.js
    ├── scenarios.js
    └── incidents.js
```


## Skills Analytics update

The Skills Analytics page now includes:
- KPI cards for accuracy, XP, completed challenges, and estimated practice time.
- Technology mastery donut chart with clickable technology selection.
- SVG skills radar chart and difficulty-level comparison bars.
- Topic-wise performance tabs, activity heatmap, question difficulty distribution,
  recent activity, and next-step recommendations.
- Responsive styling for desktop, tablet, and mobile layouts.

Analytics note: XP, challenge totals, and recorded quiz accuracy use the browser's
saved CodeClash state. Topic scores, difficulty comparisons, and activity heatmap
are demo estimates until per-question attempts are stored by the backend. The page
does not claim to provide server-side or AI-generated analytics yet.

### Run locally

```bash
npm install
npm run dev
```

To create a production build:

```bash
npm run build
```


## Terminal Lab and expanded quiz bank

This version adds a code-writing Terminal Lab with 44 practical challenges across:
- Kubernetes manifests and troubleshooting (Deployments, Services, ConfigMaps, Secrets, probes, resources, HPA, Ingress, PVC, RBAC, NetworkPolicy, rollouts, Pending Pods, ImagePullBackOff, CrashLoopBackOff and Service endpoints).
- Dockerfiles for Java/Spring Boot, Python, PHP and Node/Vite, including multi-stage builds and image-size optimization.
- Jenkins declarative pipelines, Maven CI, secure image publishing, approvals, parallel tests and test reporting.
- Terraform resources, variables, outputs, modules, S3 public-access controls and remote state.
- Safe Linux command-writing practice.

The quiz bank now contains 100 questions each for Linux, AWS, Docker and Kubernetes, split across Beginner, Intermediate and Advanced tiers. Existing local browser progress remains local.

### Terminal Lab validation scope

The frontend performs rule-based checks against each challenge's requirements. It does not execute submitted code or access a Kubernetes cluster, Docker daemon, Jenkins controller, AWS account or Terraform provider. Native syntax/runtime validation should be implemented through a restricted backend runner with timeouts, resource limits, isolation and least-privilege credentials before exposing it to students.
