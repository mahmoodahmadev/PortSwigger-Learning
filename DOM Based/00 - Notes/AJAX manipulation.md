# AJAX and DOM-Based AJAX Request-Header Manipulation

---

## What is AJAX?

AJAX stands for **Asynchronous JavaScript and XML**. It's a web development technique that allows a webpage to send or receive data from a server **without reloading the entire page**.

## Key Technologies Used in AJAX

| Technology                 | Role                                                       |
| -------------------------- | ---------------------------------------------------------- |
| **JavaScript**             | Initiates requests and handles responses                   |
| **XMLHttpRequest / fetch** | Sends HTTP requests in the background                      |
| **HTML/CSS**               | Used for content display and page structure                |
| **Server-side language**   | Responds with dynamic data (PHP, Node.js, etc.)            |
| **Data formats**           | Usually JSON (replaces older XML), but can be text or HTML |

## How AJAX Works

AJAX allows background requests like:

```js
// Using XMLHttpRequest
const xhr = new XMLHttpRequest();
xhr.open('GET', '/api/user?id=123', true);
xhr.onload = function () {
  if (xhr.status === 200) {
    console.log(xhr.responseText);
  }
};
xhr.send();

// Using fetch()
fetch('/api/user?id=123')
  .then(res => res.json())
  .then(data => console.log(data));
```

## Common Use Cases

- Dynamic content loading (infinite scroll, product listings)

- Submitting forms without page reload

- Live chat, notifications

- Autocomplete or search suggestions

- Voting, liking, rating actions

## Benefits

- Smoother user experience

- Lower server load (no full reloads)

- Real-time feedback

## Security Considerations with AJAX

- `CSRF` (Cross-Site Request Forgery): Background requests can unknowingly carry authentication.

- `CORS` (Cross-Origin Resource Sharing): Limits which domains can make cross-origin requests.

- `Input validation:` Never trust client-side data.

- `Silent failures:` AJAX errors can be invisible to users without proper error handling.

## DOM-Based AJAX Request-Header Manipulation

### What is It?

This vulnerability occurs when attacker-controllable data is used to set custom `HTTP` headers via `XMLHttpRequest`.
Attackers craft malicious URLs to make the victim's browser set arbitrary headers in AJAX requests.

**Example Attack Flow**

1. The site uses user input to set headers like this:

```javascript
const xhr = new XMLHttpRequest();
xhr.open('GET', '/api/secure', true);
xhr.setRequestHeader('X-Custom-Role', location.hash.slice(1)); // unsafe
xhr.send();
```

2. Attacker sends a URL like:

```javascript
https://example.com/#admin
```

3. Victim visits it, and the site sends:

```
GET /api/secure
X-Custom-Role: admin
```

## Potential Impacts

- `Unintended access behavior:` If the server trusts certain headers like X-Role, X-User, etc.

- `Privilege escalation:` Sending unauthorized headers like Authorization, X-User-Group, etc.

- `Request smuggling prep:` May support larger chained attacks (e.g., bypassing backend logic).

- `Data exfiltration:` If combined with other weaknesses (e.g., insecure CORS, SSRF).

## Vulnerable Sinks

| javaScript Sink       | Description                           |
| --------------------- | ------------------------------------- |
| XMLHttpRequest.open() | Can influence request method/URL      |
| XMLHttpRequest.send() | Finalizes and sends the request       |
| jQuery.globalEval()   | May be used to evaluate injected code |
| $.globalEval()        | Similar use as above with jQuery      |

## Prevention Measures

- Never use untrusted data in headers (especially from location, user input, document.cookie, etc.).

- Sanitize and validate all data before using it to construct headers.

- Use whitelists: Allow only specific, expected header values.

- Avoid reflecting headers in response—can leak info or become injection vectors.

## Summary Table

| Category             | Description                                                          |
| -------------------- | -------------------------------------------------------------------- |
| Core Concept         | Asynchronous requests without reloading                              |
| Vulnerability        | Injecting attacker-controlled data into AJAX request headers         |
| Common Attack Vector | URL hash, query string, or input controlling request headers         |
| Risk Examples        | sPrivilege escalation, phishing, sensitive data leak                 |
| Key Functions        | to Audit setRequestHeader, open, send, globalEval                    |
| Prevention           | Input validation, trusted sources only, avoid dynamic header setting |

```

```
