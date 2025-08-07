=

# What is DOM-Based Open Redirection?

DOM-based open-redirection vulnerabilities occur when client-side scripts write attacker-controlled data into a sink that can trigger cross-domain navigation.  
**Example vulnerable code:**

```javascript
let url = /https?:\/\/.+/.exec(location.hash);
if (url) {
  location = url[0];
}
```

An attacker can craft `URL` that, when visited, causes the browser to redirect to an arbitrary external domain.

## Impact

- **Phishing Attack:** Attackers can use authentic-looking `URLs` to trick users, leveraging the website's domain and valid `TLS` certificate for credibility.
- **JavaScript Injection:** If the attacker controls the start of the string passed to the redirection API, they may escalate the vulnerability to JavaScript injection using the `javascript:` pseudo-protocol.

## Common Sinks Leading to DOM-Based Open Redirection

- `location`
- `location.host`
- `location.hostname`
- `location.href`
- `location.pathname`
- `location.search`
- `location.protocol`
- `location.assign()`
- `location.replace()`
- `open()`
- `element.srcdoc`
- `XMLHttpRequest.open()`
- `XMLHttpRequest.send()`
- `jQuery.ajax()`
- `$.ajax()`

## How to Prevent DOM-Based Open Redirection

- Avoid dynamically setting redirection targets using data from untrusted sources.
- Validate and whitelist redirect URLs to ensure only safe destinations are allowed.
- Implement general DOM security measures as described in the DOM vulnerabilities topic.
