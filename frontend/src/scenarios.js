export const scenarios = {
  "Linux": [
    {
      "title": "Disk at 100%",
      "severity": "HIGH",
      "symptom": "A production API starts failing writes. df shows /var at 100%.",
      "goal": "Identify the space consumer safely before cleanup.",
      "steps": [
        "Check filesystem usage with df -h",
        "Inspect top-level usage with du -xhd1 /var",
        "Check for deleted-but-open files with lsof +L1"
      ],
      "solution": "Identify the owning service and log/archive policy. Avoid deleting unknown system files; rotate or safely truncate approved logs and restart/close the process if needed.",
      "xp": 250
    },
    {
      "title": "Nginx won't start",
      "severity": "MEDIUM",
      "symptom": "systemctl restart nginx fails after a config change.",
      "goal": "Validate configuration and inspect the service error.",
      "steps": [
        "Run sudo nginx -t",
        "Run systemctl status nginx",
        "Inspect journalctl -u nginx -n 50"
      ],
      "solution": "Fix the reported configuration error, re-test with nginx -t, then reload/restart. Keep a known-good config backup.",
      "xp": 200
    },
    {
      "title": "Permission denied",
      "severity": "MEDIUM",
      "symptom": "A deployment script exists but CI reports Permission denied.",
      "goal": "Check file mode, owner, and execution context.",
      "steps": [
        "Run ls -l deploy.sh",
        "Check the script interpreter and line endings",
        "Add only required execute permission with chmod u+x deploy.sh"
      ],
      "solution": "Correct the permission and ownership for the deployment user; avoid chmod 777 as a shortcut.",
      "xp": 200
    }
  ],
  "AWS": [
    {
      "title": "EC2 unreachable over SSH",
      "severity": "HIGH",
      "symptom": "A team cannot connect to a Linux EC2 instance on port 22.",
      "goal": "Trace the network path without opening access to everyone.",
      "steps": [
        "Check instance state and system status checks",
        "Verify route table, public IP, and subnet path",
        "Review security group and network ACL rules for the trusted source IP"
      ],
      "solution": "Correct the missing route/address or allow SSH only from the approved source CIDR. Prefer SSM Session Manager where appropriate.",
      "xp": 250
    },
    {
      "title": "ALB targets unhealthy",
      "severity": "CRITICAL",
      "symptom": "The load balancer returns 503 after a deployment.",
      "goal": "Find why targets fail health checks.",
      "steps": [
        "Inspect target-group health reason",
        "Verify target port, protocol, and health-check path",
        "Check app logs and security-group traffic from the ALB"
      ],
      "solution": "Align the listener/target port and health-check path with the app, ensure the app binds to the expected interface, and permit ALB-to-target traffic.",
      "xp": 300
    },
    {
      "title": "S3 AccessDenied",
      "severity": "HIGH",
      "symptom": "An application role can list a bucket but cannot read an object.",
      "goal": "Review the full authorization path.",
      "steps": [
        "Confirm the exact bucket and object ARN",
        "Check identity and bucket policies for explicit denies",
        "If SSE-KMS is used, verify kms:Decrypt and key policy"
      ],
      "solution": "Grant only the required object-level access and KMS permissions. Never make the bucket public as a troubleshooting shortcut.",
      "xp": 250
    }
  ],
  "Docker": [
    {
      "title": "Container exits immediately",
      "severity": "HIGH",
      "symptom": "docker ps shows no app container after deployment.",
      "goal": "Find the exit reason and fix the startup command.",
      "steps": [
        "Run docker ps -a and inspect exit code",
        "Read docker logs CONTAINER",
        "Inspect CMD/ENTRYPOINT and required environment variables"
      ],
      "solution": "Fix the application startup/configuration issue. A container should run a foreground process; don't add an arbitrary infinite sleep to hide failure.",
      "xp": 250
    },
    {
      "title": "App port not reachable",
      "severity": "HIGH",
      "symptom": "The app listens on port 8080 in the container, but localhost:8080 fails.",
      "goal": "Check published ports and process binding.",
      "steps": [
        "Check docker ps port mappings",
        "Inspect docker port CONTAINER",
        "Verify app binds to 0.0.0.0:8080 inside the container"
      ],
      "solution": "Publish the port with -p 8080:8080 and ensure the application listens on the container interface, not only 127.0.0.1.",
      "xp": 200
    },
    {
      "title": "Image build is huge",
      "severity": "MEDIUM",
      "symptom": "A small app produces a multi-gigabyte image.",
      "goal": "Reduce build context and runtime image contents.",
      "steps": [
        "Inspect docker image history IMAGE",
        "Review build context size",
        "Add suitable .dockerignore entries and use multi-stage builds"
      ],
      "solution": "Exclude caches and secrets from the context, use a small runtime stage, and avoid copying build-only dependencies into production.",
      "xp": 200
    }
  ],
  "Kubernetes": [
    {
      "title": "Pod CrashLoopBackOff",
      "severity": "CRITICAL",
      "symptom": "A new release never becomes healthy and Pods keep restarting.",
      "goal": "Diagnose the failing container before changing replicas.",
      "steps": [
        "Run kubectl describe pod POD",
        "Read kubectl logs POD --previous",
        "Check environment, mounted configuration, probes, and exit code"
      ],
      "solution": "Fix the demonstrated root cause (configuration, startup command, dependency, or probe). Roll back if service recovery is urgent.",
      "xp": 300
    },
    {
      "title": "Pods stuck Pending",
      "severity": "HIGH",
      "symptom": "A Deployment has desired replicas but no Pods are scheduled.",
      "goal": "Determine why the scheduler cannot place Pods.",
      "steps": [
        "Run kubectl describe pod POD and read Events",
        "Check node capacity and requests",
        "Review taints, tolerations, node affinity, and PVC binding"
      ],
      "solution": "Correct unrealistic requests or placement/storage constraints, or add suitable capacity. Do not blindly remove all scheduling controls.",
      "xp": 250
    },
    {
      "title": "Service has no endpoints",
      "severity": "HIGH",
      "symptom": "Pods are Running, but requests to a ClusterIP Service fail.",
      "goal": "Verify the Service selects ready Pods on the expected port.",
      "steps": [
        "Run kubectl get svc SERVICE -o yaml",
        "Compare Service selector with Pod labels",
        "Check readiness and targetPort"
      ],
      "solution": "Correct the selector or port mapping and ensure Pods become Ready. Running does not always mean ready to receive traffic.",
      "xp": 250
    }
  ]
};
