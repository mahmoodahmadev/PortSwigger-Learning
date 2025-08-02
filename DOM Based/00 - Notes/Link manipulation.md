# DOM-Based Link Manipulation

---

## What is DOM-Based Link Manipulation?

DOM-based link-manipulation vulnerabilities occur when a web application’s JavaScript uses attacker-controlled data to set the destination (target URL) of a:

- Hyperlink (`<a href="">`)
- Image (`<img src="">`)
- Form (`<form action="">`)

This allows an attacker to construct a malicious URL that, when visited by another user, changes these navigation targets on the page.

## Impact of DOM-Based Link Manipulation

An attacker can use this to:

1. **Redirect users to malicious websites**

   - Trick users into clicking a fake link (phishing, malware delivery)

2. **Exfiltrate form data**

   - Modify a form’s action so the data gets submitted to the attacker’s server

3. **Perform unintended actions**

   - Alter link or query string to perform unauthorized app actions

4. **Bypass anti-XSS defenses**
   - Inject scripts via manipulated internal links that the browser doesn’t sanitize

## Vulnerable Sinks

Common JavaScript properties (DOM sinks) that can be exploited:

| Sink             | Description                                       |
| ---------------- | ------------------------------------------------- |
| `element.href`   | Used for hyperlinks (`<a href="...">`)            |
| `element.src`    | Used for media, scripts, iframes, images          |
| `element.action` | Used for form submissions (`<form action="...">`) |

## Example Vulnerable Code

```js
// Takes untrusted data from the hash
const link = document.getElementById('myLink');
link.href = location.hash.substring(1); // ❌ vulnerable
```

Malicious URL example:

```
https://example.com/#https://evil.com
```

What happens:

- The link with id="myLink" now points to https://evil.com

## How to Prevent DOM-Based Link Manipulation

- Never use untrusted data to set link/form destinations

- Do not set href, src, or action directly using location.search, location.hash, or user input

- Whitelist or validate URLs before setting them

```javascript
const trustedDomains = ['example.com'];
const input = getSomeInput();
const url = new URL(input, location.origin);
if (trustedDomains.includes(url.hostname)) {
  link.href = url.href; // safe
}
```

- Use static link destinations when possible

- Escape or sanitize values before injecting into the DOM

## Summary

- Category Details
- Vulnerability Writing untrusted data to link/form targets
- Primary Sinks href, src, action
- Main Risks Redirects, phishing, data exfiltration
- Prevention Avoid dynamic assignment from untrusted sources
