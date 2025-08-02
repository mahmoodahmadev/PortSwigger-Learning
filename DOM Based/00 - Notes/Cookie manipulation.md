# DOM-Based Cookie Manipulation

## What Are Cookies?

**Cookies** are small pieces of data stored on the user's browser by a website.
They are commonly used for:
  - Session management (e.g., login tokens)
  - Personalization (e.g., language or theme)
  - Tracking (e.g., analytics or ads)

### Example Cookie:

```html
session_id=abc123; path=/; HttpOnly; Secure
```


## How Cookies Can Be Exploited

Cookies themselves are not inherently dangerous, but problems arise when:

1. Cookies are set using untrusted client-side data
2. Cookies are reflected unsafely into the page
3. Cookies can be stolen via XSS


## DOM-Based Cookie Manipulation

### What Is DOM-Based Cookie Manipulation?

- Occurs when **client-side JavaScript** writes attacker-controlled data into a cookie.
- This makes cookies,normally safe,vulnerable to attack.
- The attacker crafts a `URL` that sets **arbitrary cookie values** when visited.

---

### How XSS Enables Cookie Manipulation

- **Cross-Site Scripting (XSS)** allows attackers to inject and run scripts in the victim’s browser.
- If the app uses unsanitized data from the DOM (e.g., `location.hash`, `location.search`), XSS can manipulate cookies directly.

---

### Example: Writing Attacker-Controlled Data to a Cookie

```js
// JavaScript vulnerable to DOM-based manipulation
document.cookie = location.hash;
```
**Example:** 

XSS Payload to Manipulate Cookie
```
https://site.com/#<script>document.cookie='session=attackerSessionId'</script>
```
- User visits `URL` → Malicious script runs

- Script sets new cookie → e.g., session=attackerSessionId

### Exploitation Scenarios

**Session Fixation**
- Attacker sets a known session ID in the victim's browser

- Hijacks that session on the server

**Privilege Escalation**

- Manipulated cookie changes user roles or access rights

**Cross-Site Attacks**

- If cookies are shared across subdomains, one vulnerable site can impact others

**Exploit Chains**

- Low-severity issues like cookie manipulation can lead to high-severity impact when chained

### Common Vulnerable Sinks

`document.cookie`

The most direct way to set cookies from JavaScript. Dangerous when used with untrusted input.

### How to Prevent DOM-Based Cookie Manipulation

- Never write untrusted data into document.cookie

- Sanitize and validate all input before using it in cookies

- Avoid using location.hash, location.search, or direct user input to set cookies

- Encode and reflect cookie values safely in HTML

- Implement Content Security Policy (CSP)

- Apply general DOM-based vulnerability mitigations (e.g., avoid inline scripts)
