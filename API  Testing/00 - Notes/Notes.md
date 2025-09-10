# API Security Testing Notes

APIs (Application Programming Interfaces) enable software systems and applications to communicate and share data. Testing APIs is crucial because vulnerabilities can undermine a website’s confidentiality, integrity, and availability.

---

## Mindmap: API Security Testing

```plaintext
API Security Testing
├── Reconnaissance
│   ├── Identify Endpoints
│   ├── Review Documentation
│   ├── Analyze JavaScript & Traffic
│   └── Discover Hidden/Unused Endpoints
├── Authentication & Authorization
│   ├── Test Auth Mechanisms
│   ├── Bypass/Privilege Escalation
│   └── Rate Limiting
├── Input Handling
│   ├── Parameter Tampering
│   ├── Mass Assignment
│   ├── Server-side Parameter Pollution
│   └── Content-Type & Data Format
├── Business Logic
│   ├── Workflow Manipulation
│   └── Insecure Direct Object Reference (IDOR)
├── Automated & Manual Tools
│   ├── Burp Suite (Scanner, Intruder, Repeater)
│   ├── Postman, SoapUI
│   └── Specialized BApps (Param Miner, JS Link Finder)
└── Prevention & Best Practices
    ├── Allowlist Methods/Params
    ├── Validate Input & Output
    ├── Secure Documentation
    └── Use Generic Error Messages
```

---

## API Security Testing Checklist

### Reconnaissance

- [ ] Identify all API endpoints (URLs, methods, parameters)
- [ ] Review available documentation (OpenAPI, Swagger, etc.)
- [ ] Analyze JavaScript files for hidden endpoints
- [ ] Use tools (Burp Scanner, JS Link Finder) to discover endpoints
- [ ] Check for machine-readable docs (`/swagger`, `/openapi.json`)

### Authentication & Authorization

- [ ] Test login, token, and session mechanisms
- [ ] Attempt to bypass authentication
- [ ] Test for privilege escalation (IDOR, role changes)
- [ ] Check for rate limiting and brute-force protection

### Input Handling & Parameter Testing

- [ ] Enumerate all parameters (documented and hidden)
- [ ] Test for mass assignment (add extra fields in requests)
- [ ] Try server-side parameter pollution (inject `&`, `#`, `=`, path traversal)
- [ ] Change content types (JSON, XML, form-data) and observe behavior
- [ ] Test for parameter overrides and duplicates

### Business Logic & Workflow

- [ ] Manipulate workflows (e.g., order of API calls)
- [ ] Test for logic flaws (e.g., purchasing without payment)
- [ ] Check for IDOR by changing resource IDs

### Automated & Manual Testing

- [ ] Use Burp Suite tools (Repeater, Intruder, Scanner)
- [ ] Use Param Miner and Content Discovery tools
- [ ] Use Postman/SoapUI for custom requests

### Error Handling & Information Disclosure

- [ ] Analyze error messages for sensitive info
- [ ] Check for stack traces, debug info, or verbose errors

### Prevention & Best Practices (for devs)

- [ ] Secure and restrict API documentation
- [ ] Allowlist HTTP methods and parameters
- [ ] Validate and sanitize all input and output
- [ ] Use generic error messages
- [ ] Apply security controls to all API versions

---

## Practical API Testing Techniques

### Crawling and Reconnaissance

- Use **Burp Scanner** to crawl the application and manually investigate interesting attack surfaces using Burp's browser.
- Look for patterns in URLs (e.g., `/api/`) and review JavaScript files for references to hidden endpoints. Use the **JS Link Finder BApp** for deeper extraction.

### Interacting with API Endpoints

- Use **Burp Repeater** and **Burp Intruder** to interact with endpoints, observe behavior, and discover additional attack surface.
- Review error messages and responses closely for clues to construct valid HTTP requests.

### Identifying Supported HTTP Methods

The HTTP method specifies the action to be performed on a resource:

- `GET` – Retrieves data from a resource.
- `PATCH` – Applies partial changes to a resource.
- `OPTIONS` – Retrieves information on supported request methods.

Test all potential methods for each endpoint. For example:

```http
GET /api/tasks      # Retrieves a list of tasks
POST /api/tasks     # Creates a new task
DELETE /api/tasks/1 # Deletes a task
```

> **Note:** When testing different HTTP methods, target low-priority objects to avoid unintended consequences.

### Identifying Supported Content Types

- APIs may expect data in specific formats (JSON, XML, etc.). Changing the `Content-Type` may trigger errors, bypass defenses, or exploit logic flaws.
- Use the **Content type converter BApp** to convert data between XML and JSON.

### Finding Hidden Endpoints and Parameters

- Use **Burp Intruder** with wordlists to fuzz for hidden endpoints and parameters.
- Use **Param Miner BApp** to guess parameter names.
- Use the **Content discovery tool** to find unlinked content and parameters.

### Mass Assignment Vulnerabilities

> Mass assignment (auto-binding) can create hidden parameters by binding request parameters to internal object fields.

**Example:**

```json
// PATCH /api/users/
{
  "username": "wiener",
  "email": "wiener@example.com"
}
// GET /api/users/123
{
  "id": 123,
  "name": "John Doe",
  "email": "john@example.com",
  "isAdmin": "false"
}
```

**Testing:**

```json
// Try adding isAdmin to PATCH request
{
  "username": "wiener",
  "email": "wiener@example.com",
  "isAdmin": true
}
```

If the user is granted admin privileges, the API is vulnerable.

### Preventing Mass Assignment

- Allowlist properties that can be updated by the user.
- Blocklist sensitive properties.

---

## Server-Side Parameter Pollution (SSPP)

> Server-side parameter pollution occurs when user input is embedded in a server-side request to an internal API without adequate encoding.

**Impacts:**

- Override existing parameters
- Modify application behavior
- Access unauthorized data

**Test all user input** (query params, form fields, headers, URL path params) for pollution.

### Testing for SSPP in Query Strings

- Inject query syntax characters like `#`, `&`, and `=` into your input and observe the response.

**Example:**

```http
GET /userSearch?name=peter%23foo&back=/home
# Server-side request: GET /users/search?name=peter#foo&publicProfile=true
```

> **Note:** URL-encode the `#` character so it is passed to the internal API.

### Injecting Parameters

- Add a second parameter using URL-encoded `&`:

```http
GET /userSearch?name=peter%26foo=xyz&back=/home
# Server-side: GET /users/search?name=peter&foo=xyz&publicProfile=true
```

### Overriding Parameters

- Inject a second parameter with the same name:

```http
GET /userSearch?name=peter%26name=carlos&back=/home
# Server-side: GET /users/search?name=peter&name=carlos&publicProfile=true
```

> **Tech Note:**
>
> - PHP: last parameter wins
> - Node.js/Express: first parameter wins
> - ASP.NET: combines both

### SSPP in REST Paths

- Add path traversal sequences to manipulate server-side URL path parameters:

```http
GET /edit_profile.php?name=peter%2f..%2fadmin
# Server-side: GET /api/private/users/peter/../admin
```

### SSPP in Structured Data (JSON/XML)

- Inject unexpected structured data into user inputs and observe the server's response.

**Example:**

```json
// POST /myaccount
{
  "name": "peter",
  "access_level": "administrator"
}
// Server-side: {"name":"peter","access_level":"administrator"}
```

### Detecting SSPP with Tools

- **Burp Scanner**: Detects suspicious input transformations.
- **Backslash Powered Scanner BApp**: Classifies inputs as boring, interesting, or vulnerable.

### Preventing SSPP

- Use an allowlist for characters that don't need encoding.
- Encode all other user input before including it in server-side requests.
- Ensure all input adheres to the expected format and structure.

---

## References

- [OWASP API Security Top 10](https://owasp.org/www-project-api-security/)
- [PortSwigger Web Security Academy](https://portswigger.net/web-security)
