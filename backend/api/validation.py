import re

# Rule-based validation only. Student code is NEVER executed by this API.
PATTERNS = {
    "apiVersion apps/v1 and kind Deployment": [r"apiVersion:\s*apps/v1", r"kind:\s*Deployment"],
    "metadata name nginx-deployment": [r"name:\s*nginx-deployment"],
    "replicas set to 3": [r"replicas:\s*3"],
    "selector and pod template labels match app: nginx": [r"matchLabels:\s*(?:\n\s*)?app:\s*nginx", r"labels:\s*(?:\n\s*)?app:\s*nginx"],
    "container image nginx:1.25": [r"image:\s*nginx:1\.25"],
    "containerPort 80": [r"containerPort:\s*80"],
    "multi-stage build": [r"(?im)^\s*FROM\s+\S+\s+AS\s+\w+", r"(?im)^\s*COPY\s+--from="],
    "non-root user": [r"(?im)^\s*USER\s+(?!root\b)\w+"],
    "cache-conscious install": [r"--no-cache-dir|npm ci|composer install"],
    "Jenkins declarative pipeline": [r"(?s)pipeline\s*\{", r"(?s)stages\s*\{"],
    "Terraform resource": [r'(?m)^\s*resource\s+"[^"]+"\s+"[^"]+"\s*\{'],
    "S3 backend block": [r'(?s)backend\s+"s3"\s*\{'],
    "state key": [r'key\s*=\s*"[^"]+"'],
    "valid YAML structure": [r"(?m)^(apiVersion|kind|services|FROM|stages|pipeline|resource):?"],
}

def validate_submission(challenge, code):
    # Match known requirements where reliable patterns are defined; for remaining
    # requirements, use conservative keyword checks against their solution.
    checks = []
    for requirement in challenge.requirements:
        patterns = PATTERNS.get(requirement)
        if patterns:
            passed = all(re.search(pattern, code) for pattern in patterns)
        else:
            tokens = [t.strip("`'\".,:()") for t in re.findall(r"[A-Za-z0-9_./:-]+", requirement)]
            useful = [t for t in tokens if len(t) > 3 and t.lower() not in {"correct", "should", "using", "configured", "configured", "matching", "block"}]
            # A requirement is satisfied when its important words appear in the submitted code.
            passed = bool(useful) and sum(1 for token in useful if token.lower() in code.lower()) >= max(1, (len(useful)+1)//2)
        checks.append({"requirement": requirement, "passed": bool(passed)})
    passed_count = sum(1 for c in checks if c["passed"])
    score = round(passed_count / len(checks) * 100) if checks else 0
    return {"passed": bool(checks) and passed_count == len(checks), "score": score, "checks": checks,
            "message": "All configured checks passed." if checks and passed_count == len(checks) else f"{passed_count}/{len(checks)} requirements passed. Review failed checks and try again.",
            "validator": "rule-based", "code_executed": False}
