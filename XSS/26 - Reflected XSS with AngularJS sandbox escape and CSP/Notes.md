# LAB: Reflected XSS with AngularJS sandbox escape and CSP

## Objective:

- Exploit a reflected XSS vulnerability in an AngularJS application protected by a strict Content Security Policy (`CSP`).
- Bypass `CSP` restrictions and input length limits to execute JavaScript and exfiltrate sensitive data (e.g., cookies).

## Key Concepts:

- **Content Security Policy (CSP):** A browser security feature that restricts sources from which scripts can be executed, blocking inline scripts and external scripts not from the same origin.
- **AngularJS Sandbox Escape:** Leveraging AngularJS expression injection to execute arbitrary JavaScript, even with `CSP` in place.
- **No-String/Short Payloads:** Crafting payloads that avoid quotes and minimize length to fit within strict input limits.
- **DOM Element Injection:** Injecting new `HTML` elements (e.g., `<input>`) with AngularJS directives to trigger code execution.
- **Event-Based Execution:** Using AngularJS event directives (like `ng-focus` or `ng-cut`) to execute payloads when the element is interacted with.
- **Fragment Identifier for Focus:** Using a `URL` fragment (e.g., `#x`) to automatically focus the injected element and trigger the event handler.

## Steps Taken:

1. Load the target website.
2. Inject a POC payload `{{1+1}}` in the search field.
3. Open the networks tab and observe the content-security-policy header value
   ![](./Images/CSP%20header%20in%20API%20header%20section.png)
4. As the CSP states that the script can only be executed from the website itself, and internal script through `<script></script>` tags are also not allowed.
5. It means, we have to inject an HTML element in the DOM. which will execute the inline script.
6. Open the XSS cheatsheet by Portswigger Academy and select the **angularJS CSP **policy payload which has the shortest length, as there is a limit of 80 characters for the search string.
7. Submit the payload in the search field which is **payload 1**.
8. I have altered the payload a bit as the lab requirement is to alert the cookies of the target site.
   ![](./Images/input%20field%20created.png)
9. Copy the URL.
10. Open the Exploit Server.
11. Paste the **payload 2** in body and deliver the exploit to the victim.

## Payloads Used:

```javascript
// Payload 1

<input ng-cut=$event.composedPath()|orderBy:'(y=alert)(1)'>
```

```javascript
// Payload 2

<script>

location ='[site-url]/?search=<input id=x ng-focus=$event.composedPath()|orderBy:'(z=alert)(document.cookie)'>#x';

</script>
```

## Explanation

- **Payload 1:** Injects an `<input>` element with an AngularJS directive. When the input is cut (`ng-cut`), the payload executes `alert(1)` via AngularJS's `orderBy` filter.
- **Payload 2:** Injects an `<input>` with `ng-focus` and a unique ID. The URL fragment `#x` focuses the input automatically, triggering the payload to alert `document.cookie`.
- The use of `$event.composedPath()` and `orderBy` filter allows code execution without needing quotes, fitting within the 80-character limit.
- CSP is bypassed because AngularJS evaluates expressions within the DOM, not as inline scripts.

## Issues Encountered

- Strict 80-character limit for the search field value.
- CSP blocks all inline and external scripts except those from the same origin.
- Standard AngularJS payloads were too long or blocked by CSP.

## Solutions/Workarounds

- Selected the shortest payload from the PortSwigger XSS cheatsheet.
- Injected a new DOM element (`<input>`) with an AngularJS directive to trigger code execution.
- Used URL fragments to focus the injected element and trigger the event automatically.

## Takeaways:

- When there is a** CSP** (content security policy) that you can only execute script from same source, then we have to insert a new element in the AngularJS.
- When inserting a new element in the dom, there is no need to use the AngularJS interpolation `{{}}`.
- to minimize the payload length, get rid of extra spaces and characters which browser can auto understand.
