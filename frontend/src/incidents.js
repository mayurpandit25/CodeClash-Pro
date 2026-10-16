export const incidents = [
  {
    "title": "Production API returns 502",
    "severity": "CRITICAL",
    "service": "Load balancer / API",
    "symptom": "Users report intermittent 502 responses after a release. Target instances are registered.",
    "choices": [
      "Check target health, backend port/protocol, app logs, and connection resets",
      "Restart every server immediately without checking logs",
      "Make all security groups allow all traffic",
      "Increase the DNS TTL"
    ],
    "answer": 0,
    "why": "502 commonly points to a failed or invalid backend response. Inspect health, ports, logs, and connectivity first.",
    "xp": 350
  },
  {
    "title": "Database connection pool exhausted",
    "severity": "CRITICAL",
    "service": "Application / PostgreSQL",
    "symptom": "The API latency spikes; logs show connection acquisition timeouts while database CPU is moderate.",
    "choices": [
      "Inspect pool metrics, slow queries, transaction leaks, and connection limits",
      "Increase the pool size without checking database limits",
      "Disable authentication to reduce latency",
      "Delete database indexes"
    ],
    "answer": 0,
    "why": "Pool exhaustion can come from leaked/long transactions or undersized capacity; correlate pool and database metrics before tuning.",
    "xp": 350
  },
  {
    "title": "Kubernetes rollout is stuck",
    "severity": "HIGH",
    "service": "Kubernetes Deployment",
    "symptom": "New Pods never become Ready and the rollout exceeds its progress deadline.",
    "choices": [
      "Inspect Pod events, previous logs, readiness probes, and image/config changes",
      "Scale replicas to 100 immediately",
      "Delete the namespace",
      "Disable every probe permanently"
    ],
    "answer": 0,
    "why": "The new ReplicaSet is not producing ready Pods; use events, logs, probes, and rollout status to isolate the cause.",
    "xp": 300
  },
  {
    "title": "Disk exhaustion on production host",
    "severity": "HIGH",
    "service": "Linux host",
    "symptom": "Services fail to write temporary files and filesystem usage is 100%.",
    "choices": [
      "Find the full filesystem and largest consumers; inspect deleted-open files and log rotation",
      "Run rm -rf /var/log/* without review",
      "Reboot repeatedly",
      "Change every file to mode 777"
    ],
    "answer": 0,
    "why": "Measure first and remove or rotate only known safe data; deleting open files may not release space until the process closes them.",
    "xp": 300
  },
  {
    "title": "Container works locally, fails in CI",
    "severity": "MEDIUM",
    "service": "Docker / CI",
    "symptom": "The build succeeds on a developer laptop but fails on a Linux CI runner with a missing file.",
    "choices": [
      "Check build context, .dockerignore, filename case, and CI build command",
      "Disable all CI checks",
      "Copy the developer's whole home directory into the image",
      "Use privileged containers"
    ],
    "answer": 0,
    "why": "CI often exposes case sensitivity and build-context assumptions; make the build deterministic and minimal.",
    "xp": 250
  }
];
