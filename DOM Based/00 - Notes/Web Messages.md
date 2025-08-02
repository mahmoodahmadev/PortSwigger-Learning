# What is a Web Message?

A Web Message refers to a mechanism for secure communication between different browsing contexts, such as:

- Between an iframe and its parent

- Between a popup and its opener

- Between different tabs (if explicitly allowed)

This is done using the `window.postMessage()` API, which is part of the HTML5 Web Messaging specification.

## Why Do We Need Web Messaging?

Normally, due to the Same-Origin Policy, scripts from different origins (e.g., different domains) cannot directly interact with each other.
`postMessage()` provides a safe way to send messages across origins, while still maintaining security controls.

Basic Syntax

```javascript
// Sender (e.g., inside an iframe or popup)
window.postMessage('hello', 'https://trusted-site.com');

// Receiver (e.g., in the parent window)
window.addEventListener('message', event => {
  if (event.origin !== 'https://trusted-site.com') return; // validate origin
  console.log('Received:', event.data);
});
```

## Parameters

- `message`: The data you want to send (can be a string or object).

- `targetOrigin`: The domain that is allowed to receive the message.

  - Always set this to a specific origin (never use `"*"` unless absolutely safe).

## Real-World Use Cases

- Embedding widgets from another domain (e.g., chatbox)

- Communicating with iframes (e.g., payment gateways, ads)

- Popup login flows (e.g., OAuth, SSO)

- Cross-tab communication in the same browser

## Security Considerations

- Always validate the event.origin on the receiving end.

- Avoid using "\*" as the targetOrigin unless you trust all possible recipients.

- Sanitize and validate the message content (event.data) before acting on it.

- Do not assume the sender is who they claim to be—always verify the origin.

Example Exploit Scenario (If Misused)

If an application listens to `postMessage()` without checking the sender origin:

```javascript
window.addEventListener('message', event => {
  eval(event.data); // ❌ extremely dangerous
});
```

An attacker could open the vulnerable site in an iframe and send:

```javascript
frame.postMessage("alert('XSS')", '*');
```
