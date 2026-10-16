export const questionBank = {
  "Linux": {
    "Beginner": [
      {
        "prompt": "Which command shows the current working directory?",
        "answer": "pwd",
        "options": [
          "whoami",
          "ls -la",
          "cd ..",
          "pwd"
        ],
        "explanation": "pwd prints the absolute path of the current directory."
      },
      {
        "prompt": "Which command lists files, including hidden entries?",
        "answer": "ls -la",
        "options": [
          "ls -la",
          "pwd -a",
          "find -hidden",
          "showfiles"
        ],
        "explanation": "The -a flag includes hidden entries and -l gives a detailed listing."
      },
      {
        "prompt": "Which command follows new lines in a log file?",
        "answer": "tail -f /var/log/app.log",
        "options": [
          "grep -f /var/log/app.log",
          "tail -f /var/log/app.log",
          "head -f /var/log/app.log",
          "cat -w /var/log/app.log"
        ],
        "explanation": "tail -f continues displaying appended log lines."
      },
      {
        "prompt": "Which command searches for the word ERROR in app.log?",
        "answer": "grep 'ERROR' app.log",
        "options": [
          "tail ERROR app.log",
          "sed -l ERROR app.log",
          "grep 'ERROR' app.log",
          "find 'ERROR' app.log"
        ],
        "explanation": "grep searches file contents for matching text or patterns."
      },
      {
        "prompt": "Which command changes a file's permission bits?",
        "answer": "chmod",
        "options": [
          "chown",
          "chgrp",
          "umask -f",
          "chmod"
        ],
        "explanation": "chmod modifies read, write, and execute permissions."
      },
      {
        "prompt": "Which command shows filesystem free space in readable units?",
        "answer": "df -h",
        "options": [
          "df -h",
          "du -sh /",
          "free -m",
          "lsblk -f"
        ],
        "explanation": "df reports filesystem space; -h formats values for people."
      },
      {
        "prompt": "Which command displays memory usage?",
        "answer": "free -h",
        "options": [
          "du -sh",
          "free -h",
          "df -h",
          "ps -ef"
        ],
        "explanation": "free reports used and available memory and swap."
      },
      {
        "prompt": "Which command shows the effective username?",
        "answer": "whoami",
        "options": [
          "uname -n",
          "id -g",
          "whoami",
          "hostname"
        ],
        "explanation": "whoami prints the effective user name."
      },
      {
        "prompt": "Where are many Linux system configuration files stored?",
        "answer": "/etc",
        "options": [
          "/var/log",
          "/proc",
          "/opt/bin",
          "/etc"
        ],
        "explanation": "/etc is the conventional directory for system-wide configuration."
      },
      {
        "prompt": "Which command displays recent systemd journal entries?",
        "answer": "journalctl",
        "options": [
          "journalctl",
          "systemctl logs",
          "dmesg -f",
          "logshow"
        ],
        "explanation": "journalctl queries logs collected by systemd-journald."
      }
    ],
    "Intermediate": [
      {
        "prompt": "A script has permissions -rw-r--r--. Which command adds execute permission for its owner only?",
        "answer": "chmod u+x script.sh",
        "options": [
          "chmod 777 script.sh",
          "chmod o+x script.sh",
          "chown +x script.sh",
          "chmod u+x script.sh"
        ],
        "explanation": "chmod u+x adds execute permission for the owner without changing other bits."
      },
      {
        "prompt": "Which command finds files named app.log below the current directory?",
        "answer": "find . -name 'app.log'",
        "options": [
          "find . -name 'app.log'",
          "grep -r 'app.log' .",
          "locate -c app.log",
          "ls -R | tail app.log"
        ],
        "explanation": "find searches directory trees and can filter by file name."
      },
      {
        "prompt": "Which command lists listening TCP and UDP sockets numerically?",
        "answer": "ss -tuln",
        "options": [
          "netstat -r",
          "ss -tuln",
          "ip addr show",
          "ping -tuln"
        ],
        "explanation": "ss -tuln displays listening sockets with numeric ports and addresses."
      },
      {
        "prompt": "A service is managed by systemd. Which command restarts it?",
        "answer": "sudo systemctl restart nginx",
        "options": [
          "sudo service-log nginx",
          "sudo reboot nginx",
          "sudo systemctl restart nginx",
          "sudo journalctl restart nginx"
        ],
        "explanation": "systemctl restart asks systemd to restart the named unit."
      },
      {
        "prompt": "Which command shows the last 100 lines of a log?",
        "answer": "tail -n 100 app.log",
        "options": [
          "head -n 100 app.log",
          "wc -l 100 app.log",
          "grep -n 100 app.log",
          "tail -n 100 app.log"
        ],
        "explanation": "tail -n selects how many ending lines to print."
      },
      {
        "prompt": "Which command appends standard output to a file?",
        "answer": "command >> output.log",
        "options": [
          "command >> output.log",
          "command > output.log",
          "command < output.log",
          "command | output.log"
        ],
        "explanation": ">> appends; > overwrites/truncates the destination."
      },
      {
        "prompt": "Which command displays process IDs and command names matching nginx?",
        "answer": "pgrep -a nginx",
        "options": [
          "find / -pid nginx",
          "pgrep -a nginx",
          "grep nginx /proc",
          "chmod nginx"
        ],
        "explanation": "pgrep searches process names; -a includes the command line."
      },
      {
        "prompt": "A disk is full. Which command helps identify large directories under /var?",
        "answer": "sudo du -xhd1 /var",
        "options": [
          "df -R /var",
          "ps aux /var",
          "sudo du -xhd1 /var",
          "free -h /var"
        ],
        "explanation": "du summarizes directory usage; -x stays on one filesystem and -d1 limits depth."
      },
      {
        "prompt": "Which command changes file owner to deploy and group to web?",
        "answer": "chown deploy:web file",
        "options": [
          "chmod deploy:web file",
          "usermod deploy:web file",
          "chgrp deploy:web file",
          "chown deploy:web file"
        ],
        "explanation": "chown can set both owner and group using owner:group syntax."
      },
      {
        "prompt": "Which command shows failed systemd units?",
        "answer": "systemctl --failed",
        "options": [
          "systemctl --failed",
          "journalctl --failed-units",
          "systemctl --errors-only",
          "service --failed"
        ],
        "explanation": "systemctl --failed lists units currently in failed state."
      }
    ],
    "Advanced": [
      {
        "prompt": "A process ignores a graceful termination request. Which signal is the forceful last resort?",
        "answer": "SIGKILL (kill -9 PID)",
        "options": [
          "SIGTERM (kill -15 PID)",
          "SIGHUP (kill -1 PID)",
          "SIGSTOP (kill -19 PID)",
          "SIGKILL (kill -9 PID)"
        ],
        "explanation": "SIGKILL cannot be caught or handled, so cleanup cannot run; use only when needed."
      },
      {
        "prompt": "A filesystem is 100% full, but du cannot account for the space. What is a likely cause?",
        "answer": "A deleted file is still held open by a process",
        "options": [
          "A deleted file is still held open by a process",
          "All files are sparse",
          "The inode count is unlimited",
          "The filesystem automatically doubled"
        ],
        "explanation": "An unlinked file continues consuming space until its final open descriptor is closed; lsof +L1 can help."
      },
      {
        "prompt": "Which tool is best for tracing system calls made by a process?",
        "answer": "strace",
        "options": [
          "dig",
          "strace",
          "tcpdump",
          "vmstat"
        ],
        "explanation": "strace traces system calls and signals, useful for diagnosing process behavior."
      },
      {
        "prompt": "A service binds to port 8080 but clients cannot connect. Which command confirms the listening socket?",
        "answer": "ss -ltnp",
        "options": [
          "free -h",
          "chmod -l",
          "ss -ltnp",
          "df -h"
        ],
        "explanation": "ss -ltnp shows listening TCP sockets and associated processes where permitted."
      },
      {
        "prompt": "What is the safest first step before recursively changing permissions on /var?",
        "answer": "Inspect the exact path and current ownership/permissions",
        "options": [
          "Run chmod -R 777 /var",
          "Change all owners to root",
          "Delete the directory",
          "Inspect the exact path and current ownership/permissions"
        ],
        "explanation": "Broad recursive permission changes can break services and weaken security."
      },
      {
        "prompt": "Which systemd command displays a unit's dependency tree?",
        "answer": "systemctl list-dependencies nginx",
        "options": [
          "systemctl list-dependencies nginx",
          "journalctl --tree nginx",
          "ps --deps nginx",
          "systemd-analyze files nginx"
        ],
        "explanation": "list-dependencies shows units pulled in by a given unit."
      },
      {
        "prompt": "A Linux host has high load average but low CPU utilization. What should you investigate?",
        "answer": "Tasks blocked on I/O or uninterruptible sleep",
        "options": [
          "Whether /etc has hidden files",
          "Tasks blocked on I/O or uninterruptible sleep",
          "Only the hostname",
          "The shell prompt color"
        ],
        "explanation": "Load average includes runnable tasks and tasks in uninterruptible sleep, often I/O waits."
      },
      {
        "prompt": "Which command can show per-process open files and deleted-but-open files?",
        "answer": "lsof",
        "options": [
          "lsmod",
          "logrotate",
          "lsof",
          "lsblk"
        ],
        "explanation": "lsof lists open files; lsof +L1 can reveal deleted files still consuming space."
      },
      {
        "prompt": "Why can a process fail to create a file even when disk space is available?",
        "answer": "The filesystem may have exhausted inodes",
        "options": [
          "The kernel has no hostname",
          "The file extension is too short",
          "The system has too many groups",
          "The filesystem may have exhausted inodes"
        ],
        "explanation": "A filesystem can run out of inodes before running out of data blocks; check df -i."
      },
      {
        "prompt": "What is a sensible way to inspect a suspected memory leak over time?",
        "answer": "Track process RSS and system memory repeatedly",
        "options": [
          "Track process RSS and system memory repeatedly",
          "Run chmod on /proc",
          "Delete all logs immediately",
          "Disable swap without measuring"
        ],
        "explanation": "Repeated measurements help distinguish a growing process footprint from normal cache use."
      }
    ]
  },
  "AWS": {
    "Beginner": [
      {
        "prompt": "Which AWS service provides object storage?",
        "answer": "Amazon S3",
        "options": [
          "Amazon RDS",
          "Amazon S3",
          "Amazon EC2",
          "Amazon VPC"
        ],
        "explanation": "S3 stores objects in buckets."
      },
      {
        "prompt": "Which service provides virtual servers?",
        "answer": "Amazon EC2",
        "options": [
          "Amazon Route 53",
          "AWS IAM",
          "Amazon EC2",
          "Amazon SNS"
        ],
        "explanation": "EC2 provides resizable compute instances."
      },
      {
        "prompt": "Which AWS service manages relational databases?",
        "answer": "Amazon RDS",
        "options": [
          "Amazon S3",
          "Amazon CloudFront",
          "Amazon SQS",
          "Amazon RDS"
        ],
        "explanation": "RDS manages supported relational database engines."
      },
      {
        "prompt": "Which service controls identities and permissions?",
        "answer": "AWS IAM",
        "options": [
          "AWS IAM",
          "Amazon EBS",
          "Amazon ECR",
          "AWS Shield"
        ],
        "explanation": "IAM manages users, roles, policies, and access."
      },
      {
        "prompt": "Which service distributes incoming traffic across registered targets?",
        "answer": "Elastic Load Balancing",
        "options": [
          "AWS Budgets",
          "Elastic Load Balancing",
          "AWS CloudTrail",
          "Amazon S3 Glacier"
        ],
        "explanation": "ELB routes traffic across targets such as instances or IPs."
      },
      {
        "prompt": "Which service monitors metrics and alarms?",
        "answer": "Amazon CloudWatch",
        "options": [
          "AWS Artifact",
          "Amazon ECR",
          "Amazon CloudWatch",
          "Amazon Route 53"
        ],
        "explanation": "CloudWatch provides metrics, logs, dashboards, and alarms."
      },
      {
        "prompt": "Which service records account API activity for auditing?",
        "answer": "AWS CloudTrail",
        "options": [
          "Amazon CloudFront",
          "Amazon EFS",
          "AWS Backup",
          "AWS CloudTrail"
        ],
        "explanation": "CloudTrail records account activity and API events."
      },
      {
        "prompt": "Which AWS service provides managed DNS?",
        "answer": "Amazon Route 53",
        "options": [
          "Amazon Route 53",
          "Amazon EBS",
          "AWS Lambda",
          "Amazon KMS"
        ],
        "explanation": "Route 53 provides DNS and routing capabilities."
      },
      {
        "prompt": "Which service runs code without managing servers?",
        "answer": "AWS Lambda",
        "options": [
          "Amazon VPC",
          "AWS Lambda",
          "Amazon EBS",
          "AWS Direct Connect"
        ],
        "explanation": "Lambda executes event-driven functions on managed infrastructure."
      },
      {
        "prompt": "Which service provides a logically isolated virtual network?",
        "answer": "Amazon VPC",
        "options": [
          "AWS Budgets",
          "Amazon Inspector",
          "Amazon VPC",
          "Amazon S3"
        ],
        "explanation": "VPC defines network ranges, subnets, routes, and related controls."
      }
    ],
    "Intermediate": [
      {
        "prompt": "An EC2 instance in a public subnet has no internet access. What should you verify first?",
        "answer": "Route table route to an Internet Gateway and a public IP",
        "options": [
          "CloudWatch dashboard colors",
          "Route table route to an Internet Gateway and a public IP",
          "Only the instance name",
          "S3 bucket versioning"
        ],
        "explanation": "Public connectivity requires suitable routing and addressing plus security controls."
      },
      {
        "prompt": "An ALB target is unhealthy. Which check is most useful first?",
        "answer": "Target health reason, health-check path/port, and app response",
        "options": [
          "Rotate the AWS account alias",
          "Delete the VPC",
          "Target health reason, health-check path/port, and app response",
          "Increase S3 storage class"
        ],
        "explanation": "Target health details often reveal mismatched ports, paths, or application failures."
      },
      {
        "prompt": "An EC2 instance in a private subnet needs outbound internet access. What is a common design?",
        "answer": "Route through a NAT Gateway in a public subnet",
        "options": [
          "Attach an Internet Gateway directly to the instance",
          "Use a Route 53 hosted zone as a proxy",
          "Create an S3 lifecycle rule",
          "Route through a NAT Gateway in a public subnet"
        ],
        "explanation": "Private subnet default routes can point to a NAT Gateway for outbound access."
      },
      {
        "prompt": "A user receives AccessDenied for an S3 object. What should be checked?",
        "answer": "Identity policy, bucket policy, object ownership, and explicit denies",
        "options": [
          "Identity policy, bucket policy, object ownership, and explicit denies",
          "EC2 instance type only",
          "Route 53 TTL only",
          "CloudWatch log retention only"
        ],
        "explanation": "S3 access can be affected by multiple policy layers and ownership settings."
      },
      {
        "prompt": "Which component is stateful and attached at the instance/network-interface level?",
        "answer": "Security group",
        "options": [
          "Internet Gateway",
          "Security group",
          "Network ACL",
          "Route table"
        ],
        "explanation": "Security groups track connection state; network ACLs are stateless subnet filters."
      },
      {
        "prompt": "How can an application avoid storing long-lived AWS access keys on EC2?",
        "answer": "Attach an IAM role through an instance profile",
        "options": [
          "Use the root account keys",
          "Store keys in a public S3 bucket",
          "Attach an IAM role through an instance profile",
          "Put keys in source code"
        ],
        "explanation": "Instance roles provide temporary credentials through the instance metadata service."
      },
      {
        "prompt": "A Lambda function times out while calling RDS in a VPC. What should be checked?",
        "answer": "VPC subnets, security-group rules, routing, and function timeout",
        "options": [
          "Only the Lambda function name",
          "S3 website index document",
          "Route 53 registrar",
          "VPC subnets, security-group rules, routing, and function timeout"
        ],
        "explanation": "Network reachability and database rules commonly cause VPC Lambda connection timeouts."
      },
      {
        "prompt": "Which service can queue work so a web tier and worker tier are decoupled?",
        "answer": "Amazon SQS",
        "options": [
          "Amazon SQS",
          "Amazon Route 53",
          "AWS Certificate Manager",
          "Amazon EBS"
        ],
        "explanation": "SQS buffers messages between producers and consumers."
      },
      {
        "prompt": "An HTTPS listener needs a managed TLS certificate. Which service commonly supplies it?",
        "answer": "AWS Certificate Manager",
        "options": [
          "Amazon EFS",
          "AWS Certificate Manager",
          "AWS CloudTrail",
          "Amazon Athena"
        ],
        "explanation": "ACM provisions and manages supported TLS certificates."
      },
      {
        "prompt": "Which AWS service helps analyze historical spending and usage?",
        "answer": "AWS Cost Explorer",
        "options": [
          "Amazon ECR",
          "AWS Cloud Map",
          "AWS Cost Explorer",
          "AWS WAF"
        ],
        "explanation": "Cost Explorer provides cost and usage reports and visualizations."
      }
    ],
    "Advanced": [
      {
        "prompt": "A private EC2 instance cannot reach S3 and policy permissions look correct. Which option can provide private S3 access without NAT?",
        "answer": "An S3 Gateway VPC Endpoint with suitable routes and policies",
        "options": [
          "A public IP on the database",
          "An S3 Gateway VPC Endpoint with suitable routes and policies",
          "An Internet Gateway with no route",
          "A Route 53 TXT record"
        ],
        "explanation": "Gateway endpoints route S3 traffic privately and can be constrained with endpoint policies."
      },
      {
        "prompt": "An ALB returns 502 while targets appear registered. What should you investigate?",
        "answer": "Backend connection resets, protocol/port mismatch, and application health",
        "options": [
          "S3 lifecycle transitions",
          "IAM user password age",
          "Backend connection resets, protocol/port mismatch, and application health",
          "Only the ALB name tag"
        ],
        "explanation": "502 often indicates the load balancer could not get a valid backend response."
      },
      {
        "prompt": "An Auto Scaling group launches instances that fail health checks repeatedly. What is the best next step?",
        "answer": "Inspect launch template, bootstrap logs, health-check type, and target registration",
        "options": [
          "Disable all health checks permanently",
          "Delete CloudTrail",
          "Increase DNS TTL blindly",
          "Inspect launch template, bootstrap logs, health-check type, and target registration"
        ],
        "explanation": "Bootstrapping failures or incorrect health-check configuration can trigger replacement loops."
      },
      {
        "prompt": "A bucket must be private but deliver selected content through CloudFront. Which pattern is appropriate?",
        "answer": "Private S3 origin with CloudFront Origin Access Control",
        "options": [
          "Private S3 origin with CloudFront Origin Access Control",
          "Enable public read for every object",
          "Put access keys in frontend JavaScript",
          "Disable TLS"
        ],
        "explanation": "OAC lets CloudFront access a private S3 origin through a bucket policy."
      },
      {
        "prompt": "A service needs cross-account access without sharing permanent keys. What is the recommended pattern?",
        "answer": "Assume a role in the target account with STS",
        "options": [
          "Disable all policies",
          "Assume a role in the target account with STS",
          "Email root credentials",
          "Create one shared IAM user for everyone"
        ],
        "explanation": "STS role assumption issues temporary credentials under a trust policy."
      },
      {
        "prompt": "An RDS database is unexpectedly unreachable from an app in another subnet. Which settings are key?",
        "answer": "DB security group, subnet routing, endpoint/port, and network ACLs",
        "options": [
          "CloudFront cache key only",
          "Lambda memory alone",
          "DB security group, subnet routing, endpoint/port, and network ACLs",
          "S3 object tags"
        ],
        "explanation": "Database reachability depends on network path and both source and destination controls."
      },
      {
        "prompt": "Which feature helps route traffic to healthy regional endpoints during a regional outage?",
        "answer": "Route 53 failover routing with health checks, or an appropriate global traffic service",
        "options": [
          "S3 object lock alone",
          "IAM password policy",
          "EBS snapshot tags",
          "Route 53 failover routing with health checks, or an appropriate global traffic service"
        ],
        "explanation": "DNS or global traffic routing can shift clients based on health and architecture."
      },
      {
        "prompt": "A KMS-encrypted object cannot be downloaded by a role that has S3 read access. Why?",
        "answer": "The role may also need KMS decrypt permission and key-policy authorization",
        "options": [
          "The role may also need KMS decrypt permission and key-policy authorization",
          "S3 read always implies decrypt",
          "KMS is only for DNS",
          "The object must be renamed"
        ],
        "explanation": "S3 permission alone does not authorize decryption with a customer-managed KMS key."
      },
      {
        "prompt": "An EKS pod needs AWS API access without node-wide credentials. What is a suitable approach?",
        "answer": "Use EKS Pod Identity or IRSA with a scoped IAM role",
        "options": [
          "Make the role AdministratorAccess by default",
          "Use EKS Pod Identity or IRSA with a scoped IAM role",
          "Bake admin keys into the image",
          "Use the EC2 root password"
        ],
        "explanation": "Pod-scoped identity limits credentials to the workload and its required permissions."
      },
      {
        "prompt": "CloudWatch alarms miss a brief application outage. What improvement helps detection?",
        "answer": "Choose appropriate metrics, periods, evaluation windows, and health signals",
        "options": [
          "Set every alarm to OK",
          "Turn off application logging",
          "Choose appropriate metrics, periods, evaluation windows, and health signals",
          "Delete all metrics"
        ],
        "explanation": "Alarm behavior depends on metric selection, period, thresholds, and evaluation settings."
      }
    ]
  },
  "Docker": {
    "Beginner": [
      {
        "prompt": "Which command builds an image from a Dockerfile?",
        "answer": "docker build",
        "options": [
          "docker ps",
          "docker logs",
          "docker build",
          "docker run"
        ],
        "explanation": "docker build creates an image from a build context."
      },
      {
        "prompt": "Which command lists running containers?",
        "answer": "docker ps",
        "options": [
          "docker images",
          "docker build",
          "docker volume ls",
          "docker ps"
        ],
        "explanation": "docker ps lists running containers; add -a to include stopped containers."
      },
      {
        "prompt": "Which command fetches an image from a registry?",
        "answer": "docker pull",
        "options": [
          "docker pull",
          "docker push",
          "docker exec",
          "docker rm"
        ],
        "explanation": "docker pull downloads image layers and metadata."
      },
      {
        "prompt": "Which command shows a container's logs?",
        "answer": "docker logs",
        "options": [
          "docker network",
          "docker logs",
          "docker images",
          "docker tag"
        ],
        "explanation": "docker logs displays the container's stdout and stderr."
      },
      {
        "prompt": "Which Dockerfile instruction copies local build-context files?",
        "answer": "COPY",
        "options": [
          "CMD",
          "VOLUME",
          "COPY",
          "EXPOSE"
        ],
        "explanation": "COPY transfers files from the build context into the image."
      },
      {
        "prompt": "Which option runs a container in the background?",
        "answer": "-d",
        "options": [
          "-it",
          "--rm-only",
          "-f",
          "-d"
        ],
        "explanation": "Detached mode runs the container in the background."
      },
      {
        "prompt": "Which command opens a shell in a running container?",
        "answer": "docker exec -it CONTAINER sh",
        "options": [
          "docker exec -it CONTAINER sh",
          "docker build -it",
          "docker image sh",
          "docker pull sh"
        ],
        "explanation": "docker exec runs a command in an existing container."
      },
      {
        "prompt": "What is a Docker volume mainly used for?",
        "answer": "Persist data beyond a container's writable layer",
        "options": [
          "Replace a Dockerfile",
          "Persist data beyond a container's writable layer",
          "Expose a public IP",
          "Compile JavaScript"
        ],
        "explanation": "Volumes keep data outside the container's writable layer."
      },
      {
        "prompt": "Which file describes how to build a Docker image?",
        "answer": "Dockerfile",
        "options": [
          "container.yaml only",
          "daemon.txt",
          "Dockerfile",
          "compose.lock"
        ],
        "explanation": "A Dockerfile defines image build instructions."
      },
      {
        "prompt": "Which command publishes host port 8080 to container port 80?",
        "answer": "docker run -p 8080:80 IMAGE",
        "options": [
          "docker run -v 8080:80 IMAGE",
          "docker run --name 8080:80 IMAGE",
          "docker build -p 8080:80 IMAGE",
          "docker run -p 8080:80 IMAGE"
        ],
        "explanation": "-p HOST_PORT:CONTAINER_PORT publishes a container port."
      }
    ],
    "Intermediate": [
      {
        "prompt": "A container exits immediately after starting. What should you inspect first?",
        "answer": "docker logs and the container's exit status/command",
        "options": [
          "The host wallpaper",
          "The Docker Hub profile photo",
          "docker logs and the container's exit status/command",
          "Only the image tag color"
        ],
        "explanation": "Logs and exit status commonly expose startup errors or a process that finishes."
      },
      {
        "prompt": "A containerized web app listens on port 3000, but host access fails. What is likely missing?",
        "answer": "A published port mapping such as -p 3000:3000",
        "options": [
          "A Docker volume for /etc/hosts always",
          "A new image registry account",
          "A second ENTRYPOINT",
          "A published port mapping such as -p 3000:3000"
        ],
        "explanation": "Container ports are not automatically published to the host."
      },
      {
        "prompt": "Why use a .dockerignore file?",
        "answer": "Exclude unnecessary or sensitive files from the build context",
        "options": [
          "Exclude unnecessary or sensitive files from the build context",
          "Persist database data",
          "Configure DNS for Kubernetes",
          "Create an IAM role"
        ],
        "explanation": ".dockerignore reduces context size and avoids copying unwanted files."
      },
      {
        "prompt": "A container cannot resolve another Compose service by its service name. What should you check?",
        "answer": "Whether both services share the expected Compose network",
        "options": [
          "Whether a volume is named after the user",
          "Whether both services share the expected Compose network",
          "Whether the host has a GUI",
          "Whether the image has a label"
        ],
        "explanation": "Compose services on a shared network can resolve each other by service name."
      },
      {
        "prompt": "Which practice helps make a production image smaller?",
        "answer": "Use a multi-stage build and a minimal runtime base",
        "options": [
          "Use a full compiler image as runtime by default",
          "Install debugging tools unnecessarily",
          "Use a multi-stage build and a minimal runtime base",
          "Copy node_modules and build cache into every stage"
        ],
        "explanation": "Multi-stage builds leave build-only tools out of the final image."
      },
      {
        "prompt": "A process inside a container writes files as root and causes host permission issues on a bind mount. What helps?",
        "answer": "Run with an appropriate non-root UID/GID and set directory ownership",
        "options": [
          "Use chmod 777 everywhere",
          "Disable all file permissions",
          "Run privileged mode permanently",
          "Run with an appropriate non-root UID/GID and set directory ownership"
        ],
        "explanation": "Matching ownership and least privilege reduce bind-mount permission issues."
      },
      {
        "prompt": "Which command shows live CPU and memory usage for containers?",
        "answer": "docker stats",
        "options": [
          "docker stats",
          "docker history",
          "docker diff only",
          "docker login"
        ],
        "explanation": "docker stats reports resource usage for running containers."
      },
      {
        "prompt": "How should a containerized application receive environment-specific configuration?",
        "answer": "Environment variables or mounted configuration/secrets",
        "options": [
          "Commit passwords into Git",
          "Environment variables or mounted configuration/secrets",
          "Hard-code production credentials in the image",
          "Rebuild a unique source tree for every host"
        ],
        "explanation": "Externalized configuration separates runtime settings from the image."
      },
      {
        "prompt": "A Docker build unexpectedly includes a huge local folder. What should you do?",
        "answer": "Review build context and add the folder to .dockerignore",
        "options": [
          "Run docker ps -a",
          "Disable layer caching globally",
          "Review build context and add the folder to .dockerignore",
          "Increase container memory only"
        ],
        "explanation": "The build context is sent to the builder; excluding unnecessary files speeds builds."
      },
      {
        "prompt": "What is the usual purpose of a health check?",
        "answer": "Determine whether the application is responding as expected",
        "options": [
          "Publish a port automatically",
          "Encrypt every image layer",
          "Replace logging",
          "Determine whether the application is responding as expected"
        ],
        "explanation": "Health checks test application health; orchestration must be configured to act on results."
      }
    ],
    "Advanced": [
      {
        "prompt": "A container repeatedly restarts due to exit code 137. What is a key possibility to investigate?",
        "answer": "OOM kill or an explicit SIGKILL; inspect memory limits and host events",
        "options": [
          "The image has no tag",
          "A Docker label is missing",
          "OOM kill or an explicit SIGKILL; inspect memory limits and host events",
          "DNS TTL is always too high"
        ],
        "explanation": "Exit 137 often corresponds to SIGKILL and can indicate memory pressure, but verify evidence."
      },
      {
        "prompt": "A secret appears in an image layer after deleting it in a later Dockerfile step. Why?",
        "answer": "Earlier immutable image layers can still contain the secret",
        "options": [
          "Docker automatically removes all previous layers",
          "Only container names store secrets",
          "Layer caching encrypts secrets",
          "Earlier immutable image layers can still contain the secret"
        ],
        "explanation": "Deleting a secret in a later layer does not erase it from earlier layers; rotate it and rebuild safely."
      },
      {
        "prompt": "A multi-stage build has a compiled binary but runtime fails with missing shared libraries. What should be checked?",
        "answer": "Runtime base compatibility and required dynamic libraries",
        "options": [
          "Runtime base compatibility and required dynamic libraries",
          "The Docker Hub avatar",
          "Only the image description",
          "The container's display resolution"
        ],
        "explanation": "The final image must include the libraries and runtime dependencies required by the binary."
      },
      {
        "prompt": "What is the safer approach for supplying build-time credentials to BuildKit builds?",
        "answer": "Use BuildKit secret mounts instead of ARG or copied files",
        "options": [
          "Store credentials in a public build artifact",
          "Use BuildKit secret mounts instead of ARG or copied files",
          "Use ARG for a permanent password",
          "Copy credentials into the image then delete them"
        ],
        "explanation": "Secret mounts avoid persisting credentials in image layers by default."
      },
      {
        "prompt": "A container can access the internet but not a host service bound to 127.0.0.1. Why?",
        "answer": "127.0.0.1 inside the container refers to that container's loopback",
        "options": [
          "The container has no filesystem",
          "TCP cannot use loopback",
          "127.0.0.1 inside the container refers to that container's loopback",
          "Docker translates all localhost names to the host"
        ],
        "explanation": "Use an appropriate host address or service network rather than assuming localhost is shared."
      },
      {
        "prompt": "Why pin production image versions or digests?",
        "answer": "To improve reproducibility and control changes",
        "options": [
          "To guarantee no vulnerabilities",
          "To remove the need for patching",
          "To disable image layers",
          "To improve reproducibility and control changes"
        ],
        "explanation": "Pinned references make deployed artifacts predictable; still update them deliberately."
      },
      {
        "prompt": "What does Docker's read-only root filesystem option help achieve?",
        "answer": "Prevent writes to the container root filesystem",
        "options": [
          "Prevent writes to the container root filesystem",
          "Prevent all network traffic",
          "Encrypt the host filesystem",
          "Automatically rotate every secret"
        ],
        "explanation": "A read-only root filesystem reduces places where a compromised process can write."
      },
      {
        "prompt": "A build works locally but fails in CI due to missing files. What should you inspect?",
        "answer": "Build context path, .dockerignore, and case-sensitive file names",
        "options": [
          "The image's star count",
          "Build context path, .dockerignore, and case-sensitive file names",
          "Only the registry logo",
          "The local shell prompt"
        ],
        "explanation": "CI paths and Linux case sensitivity can expose context or filename mistakes."
      },
      {
        "prompt": "Why avoid running every container with --privileged?",
        "answer": "It grants broad host capabilities and weakens isolation",
        "options": [
          "It enables image signing automatically",
          "It forces a non-root user",
          "It grants broad host capabilities and weakens isolation",
          "It makes images smaller"
        ],
        "explanation": "Privileged mode gives a container extensive host access and should be avoided unless required."
      },
      {
        "prompt": "Which command helps compare a container's writable layer changes?",
        "answer": "docker diff CONTAINER",
        "options": [
          "docker tag CONTAINER",
          "docker login CONTAINER",
          "docker compose config --pull-only",
          "docker diff CONTAINER"
        ],
        "explanation": "docker diff shows files added, changed, or deleted in a container's writable layer."
      }
    ]
  },
  "Kubernetes": {
    "Beginner": [
      {
        "prompt": "What is the smallest deployable unit in Kubernetes?",
        "answer": "Pod",
        "options": [
          "Cluster",
          "Namespace",
          "Pod",
          "Node"
        ],
        "explanation": "A Pod is Kubernetes' smallest deployable unit."
      },
      {
        "prompt": "Which resource manages replicated stateless applications and rollouts?",
        "answer": "Deployment",
        "options": [
          "ConfigMap",
          "Secret",
          "PersistentVolume",
          "Deployment"
        ],
        "explanation": "Deployments manage ReplicaSets and declarative application updates."
      },
      {
        "prompt": "Which resource gives a group of Pods a stable network endpoint?",
        "answer": "Service",
        "options": [
          "Service",
          "Job",
          "ConfigMap",
          "ServiceAccount"
        ],
        "explanation": "Services provide stable discovery and traffic routing to selected Pods."
      },
      {
        "prompt": "Which command lists Pods in the current namespace?",
        "answer": "kubectl get pods",
        "options": [
          "kubectl list deployments",
          "kubectl get pods",
          "kubectl show nodes",
          "kubectl logs all"
        ],
        "explanation": "kubectl get pods lists Pods in the selected namespace."
      },
      {
        "prompt": "Which command displays container logs?",
        "answer": "kubectl logs POD_NAME",
        "options": [
          "kubectl get events -f",
          "kubectl apply logs",
          "kubectl logs POD_NAME",
          "kubectl describe logs"
        ],
        "explanation": "kubectl logs retrieves stdout/stderr for a container."
      },
      {
        "prompt": "Which resource stores non-sensitive configuration values?",
        "answer": "ConfigMap",
        "options": [
          "Secret",
          "IngressClass",
          "PersistentVolume",
          "ConfigMap"
        ],
        "explanation": "ConfigMaps decouple configuration from container images."
      },
      {
        "prompt": "Which resource is intended for sensitive values such as credentials?",
        "answer": "Secret",
        "options": [
          "Secret",
          "ConfigMap",
          "Service",
          "ReplicaSet"
        ],
        "explanation": "Secrets are designed for sensitive data; secure access and encryption still matter."
      },
      {
        "prompt": "Which command applies resources defined in YAML?",
        "answer": "kubectl apply -f app.yaml",
        "options": [
          "kubectl build app.yaml",
          "kubectl apply -f app.yaml",
          "kubectl run -f app.yaml --delete",
          "kubectl logs -f app.yaml"
        ],
        "explanation": "kubectl apply creates or updates resources declaratively."
      },
      {
        "prompt": "Which component schedules unscheduled Pods onto nodes?",
        "answer": "kube-scheduler",
        "options": [
          "CoreDNS",
          "etcd proxy",
          "kube-scheduler",
          "kubelet"
        ],
        "explanation": "The scheduler chooses nodes based on constraints and available resources."
      },
      {
        "prompt": "What is a Kubernetes namespace used for?",
        "answer": "Logical separation and organization of namespaced resources",
        "options": [
          "A physical server rack",
          "A Docker image layer",
          "A public IP address",
          "Logical separation and organization of namespaced resources"
        ],
        "explanation": "Namespaces scope names and help organize teams and workloads."
      }
    ],
    "Intermediate": [
      {
        "prompt": "A Pod is in CrashLoopBackOff. What is a sensible first diagnostic step?",
        "answer": "Check kubectl logs and kubectl describe pod events",
        "options": [
          "Increase DNS TTL only",
          "Expose the Pod with NodePort",
          "Check kubectl logs and kubectl describe pod events",
          "Delete the entire cluster immediately"
        ],
        "explanation": "Logs and events often show crashes, bad configuration, or probe failures."
      },
      {
        "prompt": "A Pod remains Pending. Which checks are most useful?",
        "answer": "Events, resource requests, node capacity, taints, and scheduling constraints",
        "options": [
          "Only application access logs",
          "The Service DNS name alone",
          "Image build history on a laptop",
          "Events, resource requests, node capacity, taints, and scheduling constraints"
        ],
        "explanation": "Pending Pods often cannot be scheduled due to capacity or placement constraints."
      },
      {
        "prompt": "A Service has no endpoints. What should you check?",
        "answer": "Service selector labels against Pod labels and Pod readiness",
        "options": [
          "Service selector labels against Pod labels and Pod readiness",
          "The container registry logo",
          "The node's SSH key name",
          "The Ingress resource's comments"
        ],
        "explanation": "Service selectors must match Pods, and readiness can affect endpoints."
      },
      {
        "prompt": "Which probe indicates whether a Pod should receive service traffic?",
        "answer": "Readiness probe",
        "options": [
          "Image pull policy",
          "Readiness probe",
          "Liveness probe only",
          "Startup command"
        ],
        "explanation": "Readiness controls whether a Pod is considered ready for traffic."
      },
      {
        "prompt": "What does a liveness probe failure commonly trigger?",
        "answer": "Container restart",
        "options": [
          "Creation of a new namespace",
          "A permanent Service deletion",
          "Container restart",
          "Automatic database failover in all cases"
        ],
        "explanation": "Repeated liveness failures can cause kubelet to restart the container."
      },
      {
        "prompt": "Which resource runs a one-off task to completion?",
        "answer": "Job",
        "options": [
          "Deployment",
          "DaemonSet",
          "Ingress",
          "Job"
        ],
        "explanation": "Jobs manage Pods that run to completion."
      },
      {
        "prompt": "Which resource schedules recurring jobs?",
        "answer": "CronJob",
        "options": [
          "CronJob",
          "StatefulSet",
          "Service",
          "NetworkPolicy"
        ],
        "explanation": "CronJobs create Jobs on a time-based schedule."
      },
      {
        "prompt": "How do you scale a Deployment to four replicas?",
        "answer": "kubectl scale deployment APP --replicas=4",
        "options": [
          "kubectl rollout pause --replicas=4",
          "kubectl scale deployment APP --replicas=4",
          "kubectl replicas APP 4",
          "kubectl set nodes APP=4"
        ],
        "explanation": "kubectl scale changes the desired replica count."
      },
      {
        "prompt": "What does a resource request influence?",
        "answer": "Scheduling and the amount of resources requested for a container",
        "options": [
          "DNS domain registration",
          "The number of namespaces",
          "Scheduling and the amount of resources requested for a container",
          "Container image tag"
        ],
        "explanation": "Requests are used for scheduling and resource allocation decisions."
      },
      {
        "prompt": "What is an Ingress controller responsible for?",
        "answer": "Implementing Ingress routing rules",
        "options": [
          "Building container images",
          "Storing Secrets in etcd manually",
          "Scheduling every Pod",
          "Implementing Ingress routing rules"
        ],
        "explanation": "Ingress rules need a controller to implement HTTP(S) routing."
      }
    ],
    "Advanced": [
      {
        "prompt": "A rollout is stuck with unavailable replicas. What should you inspect?",
        "answer": "Deployment status, ReplicaSet events, Pod readiness, image pulls, and capacity",
        "options": [
          "Only ConfigMap creation time",
          "The cluster's display theme",
          "Deployment status, ReplicaSet events, Pod readiness, image pulls, and capacity",
          "Only the Ingress hostname"
        ],
        "explanation": "Rollout progress depends on healthy new replicas and available resources."
      },
      {
        "prompt": "A Pod has memory limit 256Mi and repeatedly restarts under load. What is a likely cause?",
        "answer": "Memory limit exhaustion causing OOM kills",
        "options": [
          "NodePort collision in all cases",
          "A missing Ingress class always",
          "An expired ConfigMap",
          "Memory limit exhaustion causing OOM kills"
        ],
        "explanation": "Memory limits can trigger OOM kills; inspect last state and container metrics."
      },
      {
        "prompt": "A workload must run only on nodes labelled workload=gpu. Which setting is appropriate?",
        "answer": "nodeSelector or required node affinity",
        "options": [
          "nodeSelector or required node affinity",
          "A Service type LoadBalancer",
          "A ConfigMap key named gpu",
          "A readiness probe"
        ],
        "explanation": "Node selection rules constrain placement to labelled nodes."
      },
      {
        "prompt": "What does a PodDisruptionBudget help control?",
        "answer": "Voluntary disruptions while maintaining an availability target",
        "options": [
          "Image vulnerability scanning",
          "Voluntary disruptions while maintaining an availability target",
          "All application crashes",
          "Every node failure regardless of configuration"
        ],
        "explanation": "PDBs constrain voluntary disruptions, not all involuntary failures."
      },
      {
        "prompt": "A NetworkPolicy has no effect. What should be verified?",
        "answer": "The cluster network plugin supports NetworkPolicy enforcement",
        "options": [
          "The node has a GUI",
          "The Deployment name is uppercase",
          "The cluster network plugin supports NetworkPolicy enforcement",
          "The Pod's image tag is latest"
        ],
        "explanation": "NetworkPolicy enforcement requires a compatible network plugin."
      },
      {
        "prompt": "A Deployment uses image tag latest and unexpectedly changes after redeploy. What is a better practice?",
        "answer": "Use explicit versioned tags or image digests",
        "options": [
          "Disable readiness probes",
          "Use a random tag each time",
          "Store the image inside a ConfigMap",
          "Use explicit versioned tags or image digests"
        ],
        "explanation": "Pinned images improve repeatability and change control."
      },
      {
        "prompt": "How should a workload receive narrowly scoped AWS permissions on EKS?",
        "answer": "Use a workload identity mechanism such as EKS Pod Identity or IRSA",
        "options": [
          "Use a workload identity mechanism such as EKS Pod Identity or IRSA",
          "Put administrator keys in the container image",
          "Grant every Pod node-admin permissions",
          "Use the cluster's public endpoint as a credential"
        ],
        "explanation": "Workload identities allow IAM roles to be scoped to particular applications."
      },
      {
        "prompt": "A Service works inside the cluster but not from outside. What should you verify?",
        "answer": "Service type, Ingress/load balancer, security rules, and target health",
        "options": [
          "The namespace description",
          "Service type, Ingress/load balancer, security rules, and target health",
          "Only the Pod's labels' capitalization",
          "Only the local kubeconfig file name"
        ],
        "explanation": "External access requires a suitable exposure path and allowed network traffic."
      },
      {
        "prompt": "Why should Secret access be restricted with RBAC?",
        "answer": "Users or Pods with access may retrieve sensitive values",
        "options": [
          "RBAC only changes CPU limits",
          "Secrets cannot be mounted",
          "Users or Pods with access may retrieve sensitive values",
          "Secrets are always public by design"
        ],
        "explanation": "Kubernetes Secret access should be limited to the identities that need it."
      },
      {
        "prompt": "What is the purpose of a rolling update strategy?",
        "answer": "Replace old Pods gradually while controlling availability",
        "options": [
          "Delete all replicas before every update",
          "Prevent every code regression automatically",
          "Back up the database automatically",
          "Replace old Pods gradually while controlling availability"
        ],
        "explanation": "Rolling updates control how old and new replicas are replaced."
      }
    ]
  }
};

// Expanded practice bank: 70 additional concept questions per technology.
// Together with the original 30 questions per category, this creates 100 questions each.
const terminalConcepts = {"Linux": [["show the current working directory", "pwd", "whoami", "ls -la", "cd -p", "pwd prints the current directory path."], ["list hidden files in long format", "ls -la", "ls -h", "find -hidden", "pwd -a", "The -a flag includes hidden entries and -l shows details."], ["search a file for lines containing ERROR", "grep 'ERROR' app.log", "find ERROR app.log", "sed -n ERROR app.log", "tail ERROR app.log", "grep searches file contents using a pattern."], ["find files by name under a directory", "find /var -name '*.log'", "grep -r '*.log' /var", "locate -d /var '*.log'", "ls -R '*.log'", "find searches directory trees using predicates."], ["change owner of a file", "chown appuser file.txt", "chmod appuser file.txt", "chgrp appuser file.txt", "usermod file.txt", "chown changes file ownership."], ["show filesystem usage in readable units", "df -h", "du -sh", "free -h", "lsblk -m", "df reports filesystem capacity and free space."], ["estimate a directory's total size", "du -sh /var/log", "df -h /var/log", "free -h /var/log", "ls -lh /var/log", "du estimates file and directory space usage."], ["show memory and swap usage", "free -h", "df -h", "du -sh", "ps -ef", "free displays RAM and swap statistics."], ["display running processes in detail", "ps aux", "df -a", "ls -p", "jobs -d", "ps reports process status and command details."], ["send a signal to process ID 1234", "kill 1234", "chmod 1234", "chown 1234", "systemctl 1234", "kill sends a signal to a process; SIGTERM is the default."], ["show listening sockets with numeric ports", "ss -lnt", "ip route", "netstat -r", "ping -l", "ss displays socket statistics; -l lists listening sockets."], ["show IP addresses on interfaces", "ip addr show", "ip route show", "dig A", "ss -s", "ip addr displays network interface addresses."], ["test HTTP response headers from a URL", "curl -I https://example.com", "ping -I https://example.com", "dig -I example.com", "ssh -I example.com", "curl -I sends a HEAD request and prints response headers."], ["query DNS records", "dig example.com", "ip addr example.com", "ss example.com", "route example.com", "dig queries DNS and can show record details."], ["check a systemd service status", "systemctl status nginx", "journalctl status nginx", "service --logs nginx", "ps status nginx", "systemctl status shows unit state and recent service messages."], ["view logs for a systemd unit", "journalctl -u nginx", "systemctl logs nginx", "dmesg -u nginx", "tail -u nginx", "journalctl -u filters journal entries for a unit."], ["create a gzip-compressed tar archive", "tar -czf backup.tar.gz data/", "tar -xzf backup.tar.gz data/", "gzip -d backup.tar.gz", "zip -x backup.tar.gz data/", "tar -czf creates a gzip-compressed tar archive."], ["copy files over SSH securely", "scp file.txt user@host:/tmp/", "cp file.txt user@host:/tmp/", "mv file.txt ssh:/tmp/", "rsync --local file.txt user@host", "scp copies files over SSH."], ["edit the current user's cron schedule", "crontab -e", "systemctl edit cron", "at -e", "cron --edit-user", "crontab -e edits the user's scheduled jobs."], ["print selected columns from text", "awk '{print $1}' file.txt", "grep '{print $1}' file.txt", "cut -f1 -d awk file.txt", "sed '$1' file.txt", "awk processes records and fields."], ["replace text in a stream", "sed 's/old/new/g' file.txt", "grep 'old/new' file.txt", "awk 'replace old new' file.txt", "tr 'old' 'new' file.txt", "sed can perform substitutions on text streams."], ["sort lines alphabetically", "sort file.txt", "uniq -s file.txt", "cut -sort file.txt", "paste -a file.txt", "sort orders lines according to the selected collation."], ["remove adjacent duplicate lines", "sort file.txt | uniq", "uniq -r file.txt", "grep -u file.txt", "sed -uniq file.txt", "uniq removes adjacent duplicate lines; sorting first groups duplicates."], ["show open files held by a process", "lsof -p 1234", "ls -p 1234", "ps -f 1234", "fuser -l 1234", "lsof lists open files and can filter by PID."], ["list block devices and filesystems", "lsblk -f", "df -i", "free -b", "mount -l", "lsblk shows block devices and filesystem information."], ["show kernel ring-buffer messages", "dmesg", "journalctl -u kernel", "sysctl --logs", "uname -l", "dmesg displays kernel ring-buffer messages."], ["generate an SSH key pair", "ssh-keygen", "ssh-copy-id", "ssh-add -K", "scp-keygen", "ssh-keygen creates SSH key pairs."], ["list commands a user may run with sudo", "sudo -l", "sudo -u", "su --list", "whoami --sudo", "sudo -l lists the invoking user's sudo privileges."], ["resolve a hostname locally before DNS", "/etc/hosts", "/etc/resolv.conf", "/etc/fstab", "/etc/hostname", "The hosts file provides static hostname-to-address mappings."], ["configure persistent filesystem mounts", "/etc/fstab", "/etc/hosts", "/etc/passwd", "/etc/profile", "/etc/fstab defines filesystems mounted at boot or via mount -a."], ["set default permission mask for new files", "umask", "chmod", "chattr", "setfacl", "umask controls default permission bits removed when creating files."], ["inspect and edit POSIX access control lists", "getfacl and setfacl", "chmod and chown only", "lsblk and mount", "useradd and groupadd", "getfacl/setfacl inspect and modify extended ACLs."], ["change a user's password aging policy", "chage", "passwd -l only", "usermod -s", "groupmod", "chage manages password expiration and aging settings."], ["adjust process scheduling priority", "nice or renice", "chmod", "ionice only", "systemctl nice", "nice/renice affect CPU scheduling priority."], ["check system uptime and load averages", "uptime", "free -h", "df -h", "hostnamectl", "uptime shows uptime and load averages."], ["inspect virtual memory and CPU statistics", "vmstat", "lsblk", "dig", "tar", "vmstat reports processes, memory, paging and CPU activity."]], "AWS": [["grant temporary AWS permissions to a workload", "IAM role", "IAM user access key embedded in code", "S3 bucket ACL", "Route 53 record", "IAM roles provide temporary credentials through role assumption."], ["control inbound and outbound traffic at an EC2 instance", "security group", "route table only", "CloudTrail", "NAT gateway", "Security groups act as stateful virtual firewalls for resources."], ["apply subnet-level stateless network rules", "network ACL", "security group", "IAM policy", "KMS key policy", "Network ACLs are stateless subnet-level filters."], ["distribute HTTP requests across targets", "Application Load Balancer", "EBS volume", "S3 lifecycle rule", "CloudTrail trail", "An ALB supports HTTP/HTTPS routing and health checks."], ["add or remove EC2 capacity based on demand", "Auto Scaling group", "EFS", "CloudFormation stack policy", "Route 53 hosted zone", "Auto Scaling groups adjust desired capacity using policies and health checks."], ["retain prior object versions in S3", "S3 Versioning", "S3 Transfer Acceleration", "S3 Select", "S3 Inventory", "Versioning preserves multiple versions of an object."], ["encrypt S3 objects using a managed customer key", "SSE-KMS", "SSE-C without a key", "TLS listener only", "CloudFront cache policy", "SSE-KMS integrates S3 encryption with AWS KMS keys."], ["record AWS API activity for auditing", "CloudTrail", "CloudWatch alarm only", "VPC Flow Logs only", "AWS Budgets", "CloudTrail records account activity and API calls."], ["collect metrics and create operational alarms", "CloudWatch", "CloudTrail Lake only", "IAM Access Analyzer only", "Route 53 Resolver", "CloudWatch provides metrics, logs, dashboards and alarms."], ["route a domain name to an endpoint", "Route 53", "AWS Config", "EBS snapshot", "SQS", "Route 53 is AWS's managed DNS service."], ["provide database failover across Availability Zones", "RDS Multi-AZ deployment", "Read replica only", "S3 replication", "EFS lifecycle management", "Multi-AZ improves RDS availability through standby failover."], ["attach persistent block storage to EC2", "EBS volume", "EFS file system only", "S3 bucket", "SQS queue", "EBS provides block storage volumes for EC2."], ["share a managed network file system across instances", "EFS", "EBS single-attach volume only", "S3 Glacier vault", "DynamoDB table", "EFS provides shared elastic NFS file storage."], ["decouple producers and consumers with a queue", "SQS", "SNS topic only", "CloudTrail", "KMS", "SQS is a managed message queue."], ["fan out notifications to multiple subscribers", "SNS topic", "EBS snapshot", "NAT gateway", "IAM group", "SNS supports pub/sub delivery to subscribed endpoints."], ["run code in response to events without managing servers", "Lambda", "EC2 dedicated host", "EBS", "Direct Connect", "Lambda runs event-driven functions on managed infrastructure."], ["connect privately to supported AWS services without internet NAT", "VPC endpoint", "Internet gateway", "Elastic IP only", "public subnet", "VPC endpoints provide private connectivity to supported services."], ["allow private-subnet instances outbound internet access", "NAT gateway", "Internet gateway attached directly to private subnet", "VPC peering", "Gateway Load Balancer endpoint", "A NAT gateway enables outbound connections from private subnets."], ["connect a VPC to the public internet", "internet gateway", "NAT gateway only", "VPC endpoint", "Transit Gateway route only", "An internet gateway enables internet routing for eligible public resources."], ["obtain temporary credentials by assuming a role", "STS AssumeRole", "CreateAccessKey", "S3 GetObject", "KMS Decrypt only", "STS AssumeRole returns temporary role credentials."], ["manage encryption keys and key policies", "AWS KMS", "AWS Config", "CloudWatch Logs", "Route 53", "KMS creates and manages cryptographic keys and access policies."], ["provision and renew public TLS certificates integrated with AWS", "AWS Certificate Manager", "IAM user certificate", "CloudTrail", "Secrets Manager only", "ACM manages certificates for supported AWS services."], ["cache content near users globally", "CloudFront", "EFS", "SQS", "RDS subnet group", "CloudFront is a content delivery network."], ["filter web requests for common exploits", "AWS WAF", "AWS Shield only", "CloudTrail", "GuardDuty only", "WAF evaluates HTTP requests using web ACL rules."], ["run managed Kubernetes control planes", "Amazon EKS", "Amazon ECS only", "AWS Batch only", "Elastic Beanstalk only", "EKS is AWS's managed Kubernetes service."], ["run containers without managing EC2 hosts", "ECS Fargate", "EBS", "EFS", "CloudTrail", "Fargate provides serverless compute for supported container services."], ["store and scan container images", "Amazon ECR", "S3 static website hosting", "CodeArtifact only", "CloudWatch", "ECR is a managed container image registry."], ["use a key-value and document NoSQL database", "DynamoDB", "RDS MySQL only", "EFS", "Redshift only", "DynamoDB is a managed NoSQL database."], ["expire or transition older S3 objects automatically", "S3 Lifecycle rule", "S3 bucket policy only", "CloudTrail event selector", "Route 53 health check", "Lifecycle rules transition or expire objects based on age and filters."], ["serve private S3 content through CloudFront with origin access control", "CloudFront OAC", "public-read bucket ACL", "NAT gateway", "IAM user key", "Origin Access Control lets CloudFront access private S3 origins."], ["recover an RDS database to a prior time within retention", "automated backup and point-in-time recovery", "CloudTrail event history", "EBS fast snapshot restore only", "Route 53 failover", "RDS automated backups can support point-in-time recovery."], ["manage instances remotely without inbound SSH", "AWS Systems Manager Session Manager", "public SSH key only", "Internet gateway", "S3 presigned URL", "Session Manager provides managed access without opening inbound SSH ports."], ["store and rotate application secrets", "AWS Secrets Manager", "plain-text user data", "CloudWatch dashboard", "Route 53 TXT record", "Secrets Manager stores secrets and supports rotation integrations."], ["evaluate resource configuration against rules", "AWS Config", "CloudTrail only", "SQS", "EFS", "AWS Config records resource configurations and evaluates compliance."], ["detect suspicious activity using threat findings", "Amazon GuardDuty", "AWS Budgets", "CloudFormation", "CloudFront", "GuardDuty analyzes signals for potential threats."]], "Docker": [["build an image from a Dockerfile", "docker build", "docker run", "docker pull", "docker logs", "docker build creates an image from a build context and instructions."], ["list running containers", "docker ps", "docker images", "docker volume ls", "docker network ls", "docker ps lists containers; -a includes stopped containers."], ["show logs from a container named api", "docker logs api", "docker inspect api only", "docker build api", "docker tag api", "docker logs prints a container's standard output and error."], ["execute a command inside a running container", "docker exec -it api sh", "docker attach-image api", "docker build -it api", "docker inspect --exec api", "docker exec runs a new process inside a running container."], ["persist data independently of a container lifecycle", "Docker volume", "container writable layer only", "image tag", "bridge network", "Volumes store data outside a container's writable layer."], ["connect containers on a user-defined network by name", "user-defined bridge network", "host network only", "none network", "image layer", "User-defined bridge networks provide container-name DNS resolution."], ["reduce build context with excluded paths", ".dockerignore", "Dockerfile CMD", "docker tag", "HEALTHCHECK", ".dockerignore excludes files from the build context."], ["create a smaller final image using separate build and runtime stages", "multi-stage build", "one stage with compilers retained", "docker commit", "privileged container", "Multi-stage builds let final images copy only required artifacts."], ["run a container as a non-root user", "USER instruction", "EXPOSE instruction", "LABEL instruction", "ARG only", "USER selects the user for subsequent build steps and runtime by default."], ["define the default command while allowing arguments", "ENTRYPOINT", "EXPOSE", "WORKDIR", "STOPSIGNAL only", "ENTRYPOINT defines the main executable; CMD can supply defaults."], ["set the default working directory", "WORKDIR", "VOLUME", "ARG", "HEALTHCHECK", "WORKDIR sets the working directory for later instructions."], ["copy local files into an image", "COPY", "EXPOSE", "HEALTHCHECK", "ENV only", "COPY transfers files from the build context into the image."], ["fetch remote resources or extract local archives during build", "ADD", "USER", "CMD", "STOPSIGNAL", "ADD has extra behavior; COPY is preferred for straightforward local copies."], ["pass build-time parameters", "ARG", "ENV only", "LABEL", "VOLUME", "ARG defines build-time variables."], ["set environment variables in the image", "ENV", "ARG only", "EXPOSE", "SHELL only", "ENV sets environment variables that persist in the resulting image."], ["publish the intended container port as metadata", "EXPOSE", "USER", "RUN", "COPY", "EXPOSE documents the container port; it does not publish it on the host."], ["check why a container exited", "docker inspect", "docker tag", "docker push", "docker save only", "docker inspect exposes state, exit code and configuration."], ["view images and their sizes", "docker images", "docker ps only", "docker stats only", "docker events only", "docker images lists local images and reported sizes."], ["remove unused image layers and build cache safely", "docker image prune and docker builder prune", "docker kill all", "docker export all", "docker login", "Prune commands remove unused data; review what will be deleted first."], ["use a small official base image variant", "alpine or slim base image", "full OS image by default", "scratch for every app", "latest tag only", "A smaller base can reduce size but must still support required libraries."], ["build a Node application with reproducible lockfile dependencies", "npm ci in builder stage", "npm install without lockfile only", "npm update in runtime", "npx clear-cache", "npm ci installs from the lockfile and is suitable for CI builds."], ["build a Maven Java application in a dedicated stage", "Maven/JDK builder then JRE runtime", "copy Maven and all caches into runtime", "run mvn on every container start", "use Node as the runtime", "A build stage can contain Maven while the final stage contains only a JRE and JAR."], ["serve a Vite frontend with a lightweight web server", "copy dist from Node builder into Nginx runtime", "ship node_modules and dev server", "use Maven runtime", "run npm install on each request", "Static assets can be served by Nginx without Node in the final image."], ["avoid storing dependency caches in Python image layers", "pip install --no-cache-dir", "pip install --cache-dir=/root/cache", "copy the whole host venv", "install compilers in final stage", "--no-cache-dir avoids retaining pip's download cache."], ["install only production PHP dependencies", "composer install --no-dev", "composer update in runtime", "copy all global Composer caches", "disable PHP extensions randomly", "Composer --no-dev excludes development dependencies."], ["wait until a container reports healthy", "HEALTHCHECK", "EXPOSE", "LABEL", "ARG", "HEALTHCHECK defines a command for Docker to use to determine container health."], ["limit a container's memory usage", "docker run --memory", "docker tag --memory", "docker build --cpu-shares only", "docker login --memory", "The --memory option sets a container memory limit."], ["inspect real-time resource usage by container", "docker stats", "docker history", "docker diff only", "docker save", "docker stats shows CPU, memory, network and block I/O usage."], ["show image layer history", "docker history image:tag", "docker logs image:tag", "docker events image:tag", "docker cp image:tag", "docker history displays image layers and build instructions."], ["copy a file between host and container", "docker cp", "docker tag", "docker network connect", "docker login", "docker cp copies files or directories to or from a container."], ["create a named bridge network", "docker network create app-net", "docker volume create app-net", "docker build app-net", "docker context use app-net", "docker network create creates a network resource."], ["start multiple services from a Compose file", "docker compose up", "docker compose buildx only", "docker swarm leave", "docker image prune", "docker compose up creates and starts services defined in the Compose model."], ["pin an image to an explicit version", "FROM python:3.12-slim", "FROM python:latest only", "FROM python", "FROM python:random", "Explicit version tags improve reproducibility; digest pinning can make it stricter."], ["prevent secrets from entering image layers", "BuildKit secret mounts or runtime secret injection", "ARG SECRET=... and keep layer", "COPY .env into image", "ENV PASSWORD=...", "Use secret mounts or runtime secret providers rather than baking secrets into images."], ["stop a container gracefully", "docker stop", "docker rm -f first", "docker image prune", "docker pause forever", "docker stop sends a stop signal and waits before force-killing after timeout."]], "Kubernetes": [["create a replicated stateless workload", "Deployment", "PersistentVolume", "ConfigMap", "IngressClass", "A Deployment manages ReplicaSets and desired Pod replicas."], ["expose a workload internally with a stable virtual IP", "ClusterIP Service", "NodePort only", "PersistentVolumeClaim", "Secret", "ClusterIP is the default internal Service type."], ["expose a Service on a port on each node", "NodePort Service", "ClusterIP Service", "ConfigMap", "RoleBinding", "NodePort allocates a port on cluster nodes."], ["route HTTP host/path traffic to Services", "Ingress plus an Ingress controller", "ConfigMap alone", "PVC", "PodDisruptionBudget", "An Ingress resource needs a controller to implement routing."], ["store non-sensitive application configuration", "ConfigMap", "Secret only", "PersistentVolume", "ServiceAccount", "ConfigMaps hold configuration data separate from container images."], ["store sensitive configuration data", "Secret", "ConfigMap only", "EndpointSlice", "Deployment annotation only", "Kubernetes Secrets are intended for sensitive values; secure RBAC and encryption are still needed."], ["check whether a container is ready to receive traffic", "readinessProbe", "livenessProbe only", "startup command only", "resource limit", "Readiness probes determine whether a Pod should receive Service traffic."], ["restart a container when it is unhealthy", "livenessProbe", "readinessProbe only", "Service selector", "Ingress path", "Liveness probes can trigger restarts when the probe repeatedly fails."], ["protect slow-starting apps from premature liveness failures", "startupProbe", "NodePort", "PodDisruptionBudget", "ConfigMap", "A startup probe delays liveness/readiness checks until startup succeeds."], ["set scheduling requests for CPU and memory", "resources.requests", "resources.limits only", "nodeSelector only", "terminationGracePeriodSeconds", "Requests are used by the scheduler when placing Pods."], ["cap a container's CPU and memory consumption", "resources.limits", "metadata.labels", "readinessProbe", "serviceAccountName", "Limits constrain resource use according to Kubernetes resource semantics."], ["automatically scale replicas based on metrics", "HorizontalPodAutoscaler", "StatefulSet only", "ConfigMap", "DaemonSet", "HPA adjusts scale based on configured metrics and target values."], ["persist data beyond a Pod's lifecycle", "PersistentVolumeClaim", "emptyDir only", "ConfigMap", "Ingress", "A PVC requests persistent storage from a suitable provisioner or PV."], ["grant namespace-scoped API permissions", "Role and RoleBinding", "ClusterRoleBinding only", "NetworkPolicy", "Service only", "A Role defines namespace-scoped permissions and a RoleBinding grants them."], ["apply cluster-wide reusable RBAC permissions", "ClusterRole", "Role only", "Secret", "Ingress", "ClusterRole can define cluster-scoped or reusable permissions."], ["roll back a Deployment rollout", "kubectl rollout undo deployment/name", "kubectl delete namespace", "kubectl drain only", "kubectl expose deployment", "rollout undo reverts a Deployment to a prior revision."], ["inspect previous logs after a container restart", "kubectl logs pod --previous", "kubectl get nodes", "kubectl apply -f", "kubectl label", "--previous retrieves logs from the previous container instance."], ["investigate a Pod stuck in Pending", "kubectl describe pod and inspect Events", "readinessProbe only", "delete all namespaces", "restart kubelet immediately", "Events often show scheduling, resource, taint, affinity or volume-binding causes."], ["investigate ImagePullBackOff", "describe Pod and check image/tag/credentials", "increase replicas", "edit Service targetPort only", "change CoreDNS first always", "ImagePullBackOff commonly points to image reference, registry access or pull-secret issues."], ["diagnose CrashLoopBackOff", "inspect describe output and previous container logs", "edit Ingress host only", "increase Service port", "delete the namespace immediately", "Container exit code, logs, probes, config and resources help diagnose restart loops."], ["view Pods in a specific namespace", "kubectl get pods -n namespace", "kubectl get pods --cluster", "kubectl get nodes -n namespace", "kubectl describe service -A only", "The -n flag scopes namespaced resources to a namespace."], ["apply a manifest file", "kubectl apply -f file.yaml", "kubectl get -f file.yaml", "kubectl logs -f file.yaml", "kubectl exec -f file.yaml", "kubectl apply creates or updates resources declared in a manifest."], ["check resources across all namespaces", "kubectl get pods -A", "kubectl get pods -n default only", "kubectl get namespaces -o pods", "kubectl apply -A", "-A is shorthand for all namespaces for namespaced resources."], ["find why a Service has no endpoints", "compare Service selector to Ready Pod labels", "increase NodePort", "change DNS TTL only", "add a PVC", "Selector mismatch or unready Pods can leave a Service without endpoints."], ["isolate ingress/egress at the Pod level", "NetworkPolicy with an enforcing CNI", "ConfigMap", "Ingress alone", "HPA", "NetworkPolicy enforcement depends on the cluster networking plugin."], ["schedule a Pod onto nodes with a label", "nodeSelector or node affinity", "containerPort", "Service type", "ConfigMap key", "Node selectors and affinity influence scheduling based on node labels."], ["prevent voluntary disruption of too many replicas", "PodDisruptionBudget", "LimitRange only", "Secret", "IngressClass", "PDB limits simultaneous voluntary disruptions under its policy."], ["limit aggregate namespace resource consumption", "ResourceQuota", "ServiceAccount", "EndpointSlice", "Ingress annotation", "ResourceQuota limits aggregate resource consumption in a namespace."], ["set defaults and per-container resource bounds", "LimitRange", "NetworkPolicy", "StorageClass", "IngressClass", "LimitRange can set default requests/limits and constrain resource values."], ["manage stable identities and ordered Pod rollout", "StatefulSet", "Deployment only", "Job", "ConfigMap", "StatefulSets are designed for stable identities and persistent storage patterns."], ["run a Pod on every eligible node", "DaemonSet", "Deployment", "CronJob", "Ingress", "DaemonSets run a copy of a Pod on eligible nodes."], ["run a finite task to completion", "Job", "Deployment", "Service", "DaemonSet", "Jobs manage Pods that run to completion."], ["schedule a recurring task", "CronJob", "StatefulSet", "Ingress", "PersistentVolume", "CronJobs create Jobs on a schedule."], ["store data in a namespace-scoped API object not intended as secret", "ConfigMap", "Secret", "ServiceAccount token", "TLS private key", "ConfigMap is for non-sensitive configuration."], ["configure Pod service account identity", "serviceAccountName", "nodeName only", "containerPort", "imagePullPolicy", "serviceAccountName selects the ServiceAccount used by the Pod."], ["understand a namespace-scoped Service DNS name", "service.namespace.svc.cluster.local", "pod.ip.public", "node.hostname:0", "namespace.localhost", "Kubernetes service discovery commonly uses the cluster DNS suffix."], ["debug cluster DNS resolution", "inspect CoreDNS Pods/logs and test DNS from a Pod", "restart every Deployment first", "edit imagePullPolicy", "delete all Services", "CoreDNS health, network policy and service names are key DNS troubleshooting checks."]]};

for (const [technology, facts] of Object.entries(terminalConcepts)) {
  const extraQuestions = [];
  facts.slice(0, 35).forEach(([topic, answer, wrong1, wrong2, wrong3, explanation], index) => {
    const variants = [
      `Which command or service should you use to ${topic}?`,
      `In a DevOps task, which option is appropriate when you need to ${topic}?`,
    ];
    variants.forEach((prompt, variantIndex) => {
      const options = [answer, wrong1, wrong2, wrong3];
      const shift = (index + variantIndex) % options.length;
      const shuffled = [...options.slice(shift), ...options.slice(0, shift)];
      extraQuestions.push({
        prompt,
        answer,
        options: shuffled,
        explanation,
      });
    });
  });
  const tiers = ['Beginner', 'Intermediate', 'Advanced'];
  extraQuestions.forEach((question, index) => {
    const tier = index < 23 ? tiers[0] : index < 46 ? tiers[1] : tiers[2];
    questionBank[technology][tier].push(question);
  });
}
