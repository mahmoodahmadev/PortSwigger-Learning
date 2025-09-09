# Authentication Pentesting Mindmap

│
├── Reconnaissance
│ ├── Identify authentication endpoints (login, registration, reset/change)
│ └── Enumerate supplementary authentication features
│
├── Username Enumeration
│ ├── Analyze error messages (valid vs invalid usernames)
│ ├── Test timing differences
│ └── Trigger account lockouts & observe feedback
│
├── Brute-Force Protection Testing
│ ├── Attempt password brute-force
│ ├── Check rate limiting / account lockouts
│ ├── Bypass protections with X-Forwarded-For
│ └── Test CAPTCHA enforcement
│
├── Session & Cookie Analysis
│ ├── Inspect session & persistent cookies
│ ├── Test predictability / weak cookie values
│ ├── Attempt session hijacking (XSS, cookie theft)
│ └── Decode or brute-force persistent cookies (Base64, MD5, etc.)
│
├── Multi-Factor Authentication (2FA)
│ ├── Test logic flaws in 2FA flow
│ ├── Check if session is set before 2FA completion
│ └── Attempt accessing resources with only first step
│
├── Password Reset & Change
│ ├── Check token strength (guessable, weak, reused)
│ ├── Attempt token theft & replay
│ └── Enumerate valid passwords via reset/change feedback
│
├── Header Manipulation
│ ├── X-Forwarded-For (IP spoofing)
│ ├── X-Forwarded-Host (reset poisoning / host header attacks)
│ ├── Referer (bypass referer-based controls)
│ └── X-Original-URL / X-Rewrite-URL (override URLs)
│
├── Error Message & Timing Analysis
│ ├── Look for detailed error differences
│ └── Perform timing attacks on authentication flows
│
├── Privilege Escalation
│ ├── Modify cookies to escalate privileges
│ └── Look for role indicators in cookies or headers
│
├── Automation & Tooling
│ ├── Burp Suite Proxy (interception & modification)
│ ├── Burp Intruder / Turbo Intruder (automation)
│ └── Burp Collaborator (token/cookie exfiltration)
│
├── Supplementary Functionality
│ ├── Test registration & account management
│ ├── Check logic flaws in password reset/change
│ └── Register new accounts to analyze flows
│
├── Credential & Data Protection
│ ├── Enforce HTTPS everywhere
│ ├── Audit credential leaks in responses
│ └── Check exposure in profiles or logs
│
├── Token & Logic Validation
│ ├── Ensure tokens are high entropy & single-use
│ ├── Validate all tokens server-side
│ └── Test for bypasses or token reuse
│
└── Defense Recommendations
├── Strong password policies & strength checks
├── Strict rate limiting & CAPTCHA
├── Server-side validation of auth logic
└── Secure all auth-related features, not just login
