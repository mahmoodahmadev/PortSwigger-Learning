# DOM-Based JavaScript Injection

## What is DOM-Based JavaScript Injection?

DOM-based JavaScript injection occurs when client-side JavaScript executes attacker-controlled data as code. This vulnerability allows an attacker to construct a malicious `URL` which, when visited by another user, results in the execution of arbitrary JavaScript within the context of that user’s browser session.

This form of injection is often delivered via the same vectors as reflected XSS (e.g., links in emails, social media, or other phishing methods).

## Impact of DOM-Based JavaScript Injection

If successful, the attacker can:

- Steal session tokens or login credentials
- Perform actions on behalf of the victim
- Exfiltrate sensitive data
- Log keystrokes
- Load additional malicious scripts or redirect the user

## Common Vulnerable JavaScript Sinks

The following functions and APIs are commonly associated with DOM-based JavaScript injection when used with untrusted input:

- `eval()`
- `Function()`
- `setTimeout()` (when using string arguments)
- `setInterval()` (when using string arguments)
- `setImmediate()`
- `execCommand()`
- `execScript()`
- `msSetImmediate()`
- `range.createContextualFragment()`
- `crypto.generateCRMFRequest()`

## Sink examples

**eval()**

```javascript
// Dangerous: Executing input from URL fragment
const userInput = location.hash.slice(1); // e.g., #alert(1)
eval(userInput);
```

**Function()**

```javascript
// Dangerous: Creating a new function from input
const code = location.search.slice(1); // e.g., ?alert(1)
const fn = new Function(code);
fn();
```

**setTimeout()** [string version]

```javascript
// Dangerous: Executing input as string after delay
const payload = location.hash.slice(1); // e.g., #alert(1)
setTimeout(payload, 1000);
```

**setInterval()** [string version]

```javascript
// Dangerous: Repeatedly executing input string
const payload = location.search.slice(1); // e.g., ?alert(1)
setInterval(payload, 2000);
```

**setImmediate()**

```javascript
// Dangerous if used with dynamic function calls
const attackerInput = "alert('Executed via setImmediate')";
setImmediate(() => eval(attackerInput)); // Still indirect use of eval
```

**execCommand()**

```javascript
// Dangerous if input is used to construct a command
const userCommand = location.hash.slice(1); // e.g., #insertHTML
document.execCommand(userCommand, false, "<img src=x onerror=alert(1)>");
```

**execScript()** [IE-only]

```javascript
// Dangerous in older IE versions
const payload = location.search.slice(1); // e.g., ?alert(1)
window.execScript(payload);
```

**msSetImmediate()** [IE-only]

```javascript
// Similar to setImmediate in IE
const attackerCode = location.hash.slice(1); // e.g., #alert(1)
msSetImmediate(() => eval(attackerCode));
```

**range.createContextualFragment()**

```javascript
// Dangerous: Converts string to HTML and inserts into DOM
const payload = location.hash.slice(1); // e.g., #<img src=x onerror=alert(1)>
const range = document.createRange();
const frag = range.createContextualFragment(payload);
document.body.appendChild(frag);
```

**crypto.generateCRMFRequest()**

```javascript
// Used in some Firefox crypto operations
const attackerInput = location.hash.slice(1); // if vulnerable code uses it
crypto.generateCRMFRequest(attackerInput, ...); // Dangerous if passed unvalidated
```

## Prevention Techniques

- Never execute data from untrusted sources using functions like `eval()`, `setTimeout()`, or `Function()`.
- Avoid using DOM data sources such as `location.hash`, `location.search`, or `document.URL` directly in dynamic code execution functions.
- Use strict **Content Security Policies** (CSP) to reduce the impact of possible injections.
- Apply input sanitization and output encoding where applicable.
- Use modern JavaScript frameworks and libraries that abstract or eliminate the need for manual DOM manipulation and dynamic code execution.

## Summary

DOM-based JavaScript injection is a high-risk vulnerability that allows an attacker to execute arbitrary code in the victim's browser. Avoid executing or injecting any part of the DOM or user input into JavaScript functions capable of code execution.
