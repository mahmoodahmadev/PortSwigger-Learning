# DOM-Based Cross-Site Scripting (DOM XSS)

## What Is DOM-Based XSS?

DOM-based cross-site scripting occurs when client-side JavaScript takes data from a controllable source (such as `location.search`) and passes it to a sink (such as `innerHTML` or `eval()`) in an unsafe way, resulting in arbitrary JavaScript execution.

Unlike reflected or stored XSS, DOM XSS happens entirely on the client side, without any involvement from the server in processing the malicious input.

**Characteristics**

- The vulnerability exists in JavaScript code executed in the browser, not in server-side rendering.

- The data does not need to be reflected by the server; it can be injected directly into the URL.

- DOM XSS relies on the flow of data from sources to sinks.

## Sources in DOM XSS

Sources are attacker-controllable JavaScript properties or functions that can supply input:

### Source Description

- `location.search` Query string (e.g., `?q=test`)
- `location.hash` Fragment identifier (e.g., `#section`)
- `document.URL` Full URL
- `document.documentURI` Current document URI
- `document.referrer` Referring URL
- `window.name` User-defined window property
- `localStorage`, `sessionStorage` Persistent storage controlled by JS
- `history.pushState()` State data manipulable by attacker
- `HTML5 APIs` Some provide attacker-controlled values

These sources can be influenced by the attacker via URLs, frames, or redirections.

### Sinks in DOM XSS

Sinks are JavaScript functions or DOM properties where attacker-supplied data can cause JavaScript execution if not handled securely.

## Dangerous Sinks

#### HTML Injection Sinks

##### Sink Description

- `element.innerHTML` Inserts raw HTML into an - element
- `element.outerHTML` Replaces element and inserts raw HTML
- `element.insertAdjacentHTML` Inserts raw HTML relative to existing content
- `document.write()` Writes directly to the DOM
- `document.writeln()` Writes with newline
- `element.onevent` E.g., `element.onclick = ...`

#### JavaScript Execution Sinks

##### Sink Description

- `eval()` Executes arbitrary JavaScript code
- `Function()` Constructs and executes code
- `setTimeout(string)` Evaluates the first argument if it’s a string
- `setInterval(string)` Same as above
- `window.setTimeout()` Global timer-based evaluator

#### jQuery Sinks

##### jQuery Function Behavior

- `html()` Sets HTML contents
- `append()`, `prepend()` Inserts HTML before/after
- `attr()` Sets an attribute; exploitable for href, src
- `$()` Selector that could be interpreted as HTML
- `wrap()`, `wrapAll()` Inserts HTML wrapping elements
- `after()`, `before()` Inserts elements after/before
- `replaceAll()`, `replaceWith()` Replaces nodes

## How DOM XSS Happens

DOM XSS vulnerabilities appear when there is an unfiltered flow from a source to a sink, allowing execution of arbitrary scripts.
**Example**

```javascript
// Vulnerable code
const search = new URLSearchParams(window.location.search).get("q");
document.body.innerHTML = `<div>${search}</div>`;
```

If a user visits:

```javascript
https://site.com/?q=<script>alert(1)</script>
```

The malicious script gets inserted and executed.

## How to Test for DOM-Based XSS

Manual testing involves tracking data flow from source to sink and determining if the input can be controlled to execute arbitrary JS.
**Tools Required**

- Chrome Developer Tools

- JavaScript debugger

- Burp Suite (with DOM Invader)

#### Step-by-Step Manual Testing

##### 1. Identify Sources

Start by reviewing the JavaScript code for references to sources like `location.search`, `location.hash`, `document.URL`, etc.

In Chrome Developer Tools:

- Open Sources tab

- Use `Ctrl+Shift+F` (or `Cmd+Alt+F` on Mac) to search JavaScript code globally

- Look for lines like:

```javascript
var userInput = location.search;
```

##### 2. Inspect HTML Sinks

To test HTML sinks (like `innerHTML`):

- Inject a unique string via the source (e.g., `?test=abc123xyz`)

- Open the Elements tab

- Use `Ctrl+F` (or `Cmd+F`) to search the DOM for your test string

Once found, determine the injection context:

- Inside an HTML tag?

- Inside an attribute?

- Escaped?

Then, craft a payload based on that context:

- Break out of HTML: `html "><img src=x onerror=alert(1)>`

- Break out of attributes: `html " onmouseover=alert(1) x=" `

##### 3. Analyze JavaScript Execution Sinks

These sinks (e.g., `eval`, `Function`) do not modify the visible DOM, so your string won’t show up in the page.

You must:

- Use the Debugger

- Set breakpoints at the location where the source is read

- Track how the value is assigned and passed

- See if it reaches any dangerous sink

When the value is about to be passed to a sink, inspect it and try inserting payloads like:

```javascript
");alert(document.domain);//
```

##### 4. Use DOM Invader (Burp Suite Browser)

- Automatically identifies DOM XSS flows
- Maps sources to sinks
- Highlights possible injection vectors
- Can insert and test payloads

## Exploiting DOM XSS with Different Sinks

#### `document.write()`

Simple payload:

`javascript document.write('<script>alert(1)</script>');`

May require escaping:

```html
</select><script>alert(1)</script>
```

#### `innerHTML`

`<script>` tags are not executed. Use `img`, `iframe`, or `svg` with event handlers:

```javascript
element.innerHTML = "<img src=1 onerror=alert(document.domain)>";
```

#### jQuery `attr()`

```javascript
$("#backLink").attr(
  "href",
  new URLSearchParams(location.search).get("returnUrl")
);
```

Exploit:

```javascript
?returnUrl=javascript:alert(document.domain)
```

#### jQuery selector `$()`

Used in vulnerable hashchange handlers:

```javascript
$(window).on("hashchange", function () {
  var element = $(location.hash);
  element[0].scrollIntoView();
});
```

Exploit with iframe:

```html
<iframe
  src="https://vulnerable.com#"
  onload="this.src+='<img src=1 onerror=alert(1)>'"
></iframe>
```

#### DOM XSS in AngularJS

Angular templates allow code execution inside **`{{ }}`**:

```javascript
<div ng-app>{{constructor.constructor('alert(1)')()}}</div>
```

Can be injected via URL if the page reflects URL input into the template.

## Reflected and Stored DOM XSS

#### Reflected DOM XSS

The server reflects data from the request, and a client-side script processes it insecurely.

**Example:**

```javascript
const data = "{{param}}";
eval(`var x = "${data}"`);
```

#### Stored DOM XSS

User input is stored on the server and reflected into the DOM later, where a script processes it unsafely:

**Example:**

```javscript
element.innerHTML = userProfile.description;
```

## Full List of DOM XSS Sinks

#### Native JavaScript

- `document.write()`
- `document.writeln()`
- `document.domain` (for security boundary manipulation)
- `element.innerHTML, element.outerHTML`
- `element.insertAdjacentHTML()`
- `element.onevent`
- `eval()`
- `Function()`
- `setTimeout(string)`
- `setInterval(string)`

#### jQuery Sinks

- `html()`
- `append()`
- `prepend()`

- `attr()`
- `after()`
- `before()`

- `wrap()`
- `wrapInner()`
- `wrapAll()`

- `replaceAll()`
- `replaceWith()`

- `add(), has()`
- `constructor()`
- `init()`

- `$.parseHTML()`
- `jQuery.parseHTML()`

## How to Prevent DOM-Based XSS

#### 1. Avoid Dangerous Sinks

- Do not use `innerHTML`, `document.write`, `eval`, etc., with untrusted input.

- Use safer alternatives:

  - `textContent` or `innerText` instead of `innerHTML`

  - `setAttribute()` for specific attributes (not generic HTML injection)

#### 2. Sanitize and Encode Input

- Use a robust sanitization library (e.g., DOMPurify)

- Encode content before injecting into the DOM:

  - HTML encode

  - Attribute encode

  - JavaScript encode (if embedding into scripts)

#### 3. Use Frameworks Carefully

- Be aware of how frameworks (jQuery, AngularJS, React) handle DOM rendering

- Avoid using unsafe templating features like Angular's `ng-bind-html` without sanitization

#### 4. Implement Content Security Policy (CSP)

- Use a strict CSP to block inline scripts and mitigate XSS even if it exists
