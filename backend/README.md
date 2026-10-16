# CodeClash Pro Backend

Django REST Framework + PostgreSQL backend for the CodeClash Pro React/Vite frontend.

## Included

- Imports the frontend's existing **400 questions** (100 each for Linux, AWS, Docker, Kubernetes; Beginner, Intermediate and Advanced tiers).
- Imports the existing **44 Terminal Lab challenges**.
- PostgreSQL models for questions, lab challenges, student profiles, quiz attempts and lab submissions.
- Session-based student register/login/logout endpoints, quiz answer checking, XP, lab submission feedback and analytics.
- Django admin for maintaining questions and challenges.
- Docker Compose for a local PostgreSQL 16 database.
- Safe, rule-based code checks. Submitted code is stored and checked as text; it is **not executed**.

## Run locally on Ubuntu

```bash
sudo apt update
sudo apt install -y python3 python3-venv python3-pip
unzip codeclash-backend.zip
cd codeclash-backend
cp .env.example .env
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
docker compose up -d db
python manage.py makemigrations api
python manage.py migrate
python manage.py seed_codeclash
python manage.py createsuperuser
python manage.py runserver 0.0.0.0:8000
```

API health: `http://127.0.0.1:8000/api/health/`  
Django admin: `http://127.0.0.1:8000/admin/`

If Docker is not installed, install PostgreSQL 16 locally and set `POSTGRES_*` in `.env`.

## API endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/health/` | Health check |
| GET | `/api/auth/csrf/` | Set the CSRF cookie used before authenticated POST requests |
| POST | `/api/auth/register/` | Create account (`username`, `email`, `password`, optional `display_name`) |
| POST | `/api/auth/login/` | Start Django session (`username`, `password`) |
| POST | `/api/auth/logout/` | End session |
| GET | `/api/auth/me/` | Current user's profile; requires login |
| GET | `/api/questions/` | Paginated question bank |
| GET | `/api/questions/?technology=AWS&tier=Beginner` | Filter questions |
| GET | `/api/terminal-challenges/` | List lab challenges |
| GET | `/api/terminal-challenges/?technology=Kubernetes&level=Beginner` | Filter labs |
| POST | `/api/quiz/answer/` | Submit answer: `{"question_id":1,"selected_answer":"pwd"}` |
| POST | `/api/terminal/submit/` | Submit code: `{"challenge_id":1,"code":"..."}` |
| GET | `/api/analytics/` | User XP, accuracy and technology breakdown |

DRF pagination is enabled by the framework defaults only if configured; the question endpoint response format may be a list unless pagination is enabled in settings.

## Frontend integration

Frontend origin is allowed by default at `http://localhost:5173`. The supplied frontend first calls `/api/auth/csrf/`, then sends cookies with `credentials: "include"` and the `X-CSRFToken` header for POST requests. It uses Vite's local `/api` proxy in development, so student sessions are safe across the frontend and backend.

Students create an account through the frontend's **Create one** form and sign in using their email and password. The Django `/admin/` site is for staff administration only and is not a student sign-in page.

Example:
```js
const response = await fetch("http://localhost:8000/api/questions/?technology=Linux&tier=Beginner", {
  credentials: "include"
});
const data = await response.json();
```

## Safety and production notes

- The Terminal Lab API uses **rule-based validation**, not a real shell or compiler. Checks are learning feedback, not proof that code is valid in a real cluster.
- Do not execute student-submitted shell, Dockerfile, Jenkins, Terraform or Kubernetes content in the Django web process.
- For true validation, implement a separate isolated runner with ephemeral sandboxes, no host mounts, no privileged containers, strict CPU/memory/time limits, outbound network disabled by default, and narrowly scoped temporary credentials. Keep the runner on a separate host/service.
- Before production: set a strong `SECRET_KEY`, `DEBUG=False`, HTTPS, trusted CSRF origins, secure cookies, backups, database firewall rules, login throttling, and a deliberate authentication strategy (session+CSRF or token-based auth).
