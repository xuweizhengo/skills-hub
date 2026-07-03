# Security Skills

Security auditing, recon, web testing, reporting, and assessment skills for authorized security work.

## Included Skills

| Skill | Category | Description |
|---|---|---|
| [analyzing-tls-config](./skills/analyzing-tls-config.md) | security | Analyze a target's TLS configuration — negotiated protocol version, cipher suite, certificate chain, expiry, and downgrade vectors. Use when: SOC2 auditor flagged your endpoint for "weak TLS" but you don't know which... |
| [auditing-cors-policy](./skills/auditing-cors-policy.md) | security | Audit a target's CORS posture — Access-Control-Allow-Origin handling, reflected-origin bypass, credentials+wildcard mismatch, preflight OPTIONS behavior, Vary header correctness. Use when: a third-party integration is... |
| [auditing-npm-dependencies](./skills/auditing-npm-dependencies.md) | security | Audit a Node.js project's installed npm dependency tree for known CVEs by wrapping the npm audit JSON output and emitting findings in the canonical penetration-tester schema. Detects direct AND transitive vulnerabilit... |
| [auditing-python-dependencies](./skills/auditing-python-dependencies.md) | security | Audit a Python project's installed dependencies for known CVEs by wrapping pip-audit (PyPA's official vulnerability auditor) and emitting findings in the canonical penetration-tester schema. Detects vulnerable direct... |
| [checking-http-security-headers](./skills/checking-http-security-headers.md) | security | Audit a target's HTTP security headers — CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, and the Cross-Origin trio (COOP, COEP, CORP). Use when: SOC2 / PCI auditor flagged "mis... |
| [checking-license-compliance](./skills/checking-license-compliance.md) | security | Audit a project's dependency licenses against an explicit policy (allow-list / deny-list / review-required) and flag incompatibilities before they ship to production. Reads SPDX license identifiers from npm package ma... |
| [composing-vulnerability-report](./skills/composing-vulnerability-report.md) | security | Read findings JSONL files from cluster 1-4 skills, deduplicate by fingerprint, group by severity, and compose a deliverable- grade markdown vulnerability report with per-finding sections (title, severity, target, deta... |
| [confirming-pentest-authorization](./skills/confirming-pentest-authorization.md) | security | Verify that a penetration test has explicit, written, signed authorization before any scanning begins. Reads a Rules-of- Engagement (ROE) attestation file, validates required fields (authorizer, in-scope targets, time... |
| [defining-pentest-scope](./skills/defining-pentest-scope.md) | security | Parse the ROE scope definition, enumerate every in-scope target (hostnames, IPs, CIDRs, URLs, cloud accounts, SaaS tenants), validate syntax, detect overlap with out-of-scope or known third-party SaaS ranges, and emit... |
| [detecting-command-injection-patterns](./skills/detecting-command-injection-patterns.md) | security | Scan a source tree for command-injection vulnerable patterns: shell=True calls in Python subprocess, os.system / os.popen with interpolated strings, Node child_process.exec with template literals, Ruby backticks / Ker... |
| [detecting-debug-endpoints](./skills/detecting-debug-endpoints.md) | security | Probe a target for accidentally-public admin / debug / introspection endpoints — Spring Boot Actuator, Apache server-status, Prometheus metrics, GraphQL playground, Swagger UI, phpMyAdmin, JMX-over-HTTP (Jolokia), Ela... |
| [detecting-directory-listing](./skills/detecting-directory-listing.md) | security | Probe a target for directories that return auto-generated index listings instead of denying or serving a specific file — exposes the full file tree under any reachable directory, including files the application never... |
| [detecting-eval-exec-usage](./skills/detecting-eval-exec-usage.md) | security | Scan a source tree for dynamic-code-execution APIs that an attacker can hijack: Python eval / exec / compile, JavaScript eval / Function() / setTimeout(string), Ruby eval / instance_eval / class_eval, Java ScriptEngin... |
| [detecting-exposed-secrets-files](./skills/detecting-exposed-secrets-files.md) | security | Probe a target for accidentally-served secret-bearing files in the web root — `.git/`, `.env`, `.DS_Store`, backup files, database dumps, key files, CI configs, IDE configs. Use when: post-deploy verification on a new... |
| [detecting-insecure-deserialization](./skills/detecting-insecure-deserialization.md) | security | Scan a source tree for unsafe-by-default deserialization APIs: Python pickle.loads / cPickle / shelve / dill, Ruby Marshal.load / YAML.load (pre-3.1 default), Java ObjectInputStream.readObject, PHP unserialize, .NET B... |
| [detecting-sql-injection-patterns](./skills/detecting-sql-injection-patterns.md) | security | Scan a source tree for SQL-injection vulnerable patterns: string concatenation into queries, f-string interpolation in SQL, string-format substitution into raw queries, deprecated cursor methods (cursor.execute with %... |
| [detecting-ssl-cert-issues](./skills/detecting-ssl-cert-issues.md) | security | Audit a target's TLS certificate beyond protocol/expiry — chain ordering, OCSP stapling, revocation status, Certificate Transparency presence, key-usage flags, and over-broad wildcards. Use when: TLS handshake already... |
| [detecting-weak-cryptography](./skills/detecting-weak-cryptography.md) | security | Scan a source tree for weak cryptographic primitives: MD5 / SHA-1 used for security purposes, DES / 3DES / RC4 ciphers, ECB block mode, custom-built crypto (XOR loops, hand-rolled HMAC), hardcoded IVs, predictable ran... |
| [fingerprinting-server-software](./skills/fingerprinting-server-software.md) | security | Identify the server software, framework, and component versions a target is running from its HTTP response signatures — Server header, X-Powered-By, Via, X-AspNet-Version, X-Runtime, X-Drupal-Cache, X-Generator, Set-C... |
| [generating-executive-summary](./skills/generating-executive-summary.md) | security | Compose an exec-readable summary from a unified findings JSONL plus the OWASP coverage report. Computes a single engagement risk score (0-100, severity-weighted with OWASP-breadth and governance terms), rolls up findi... |
| [mapping-findings-to-owasp-top10](./skills/mapping-findings-to-owasp-top10.md) | security | Annotate every pentest finding with its OWASP Top 10 (2021) category by applying a deterministic rule table keyed on source skill, finding category, detail keywords, and CWE identifier when present. Produces an enrich... |
| [performing-penetration-testing](./skills/performing-penetration-testing.md) | security | Orchestrate a penetration test by routing user intent to one or more of the 25 narrow skills in this pack. Confirms authorization + scope FIRST (cluster 5), runs the relevant scan skills (clusters 1-4), then composes... |
| [performing-security-code-review](./skills/performing-security-code-review.md) | security | Execute this skill enables AI assistant to conduct a security-focused code review using the security-agent plugin. it analyzes code for potential vulnerabilities like sql injection, xss, authentication flaws, and inse... |
| [probing-dangerous-http-methods](./skills/probing-dangerous-http-methods.md) | security | Probe a target for HTTP methods that should not be enabled in production — TRACE (XST attack), unrestricted PUT/DELETE, DEBUG/CONNECT, WebDAV (PROPFIND/MKCOL/COPY/MOVE), and Allow header enumeration. Use when: penetra... |
| [recording-pentest-engagement](./skills/recording-pentest-engagement.md) | security | Package an engagement's findings, scan outputs, evidence, and signed ROE into a timestamped archive with a SHA-256 manifest covering every file. Establishes chain of custody so legal counsel, internal audit, or an out... |
| [scanning-for-hardcoded-secrets](./skills/scanning-for-hardcoded-secrets.md) | security | Scan a source-code tree for hardcoded credentials embedded in source files: AWS access keys, GitHub tokens, Stripe keys, Slack tokens, Anthropic API keys, OpenAI keys, JWT signing secrets, generic base64-encoded passw... |
| [tracing-transitive-vulnerabilities](./skills/tracing-transitive-vulnerabilities.md) | security | Build a dependency-tree map of a project (npm or Python) and trace the path from each known-vulnerable transitive package back to one or more direct dependencies. Identifies which direct-dep bump would clear the most... |

## Install

This plugin is listed in the repo marketplace at:

```text
.agents/plugins/marketplace.json
```

Add this marketplace to Codex from the repository root, then install `security-skills` from the Codex app.
