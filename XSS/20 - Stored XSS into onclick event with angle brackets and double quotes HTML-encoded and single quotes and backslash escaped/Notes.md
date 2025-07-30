# LAB: Stored XSS into onclick event with angle brackets and double quotes HTML-encoded and single quotes and backslash escaped

## Objective:

- Exploit a stored XSS vulnerability by injecting a payload into the `onclick` event, bypassing filters that HTML-encode angle brackets (`<`, `>`) and double quotes (`"`), and escape single quotes (`'`) and backslashes (`\`).
- Demonstrate successful XSS by triggering an `alert()` on the target website.

## Key Concepts:

- **Stored XSS**: Malicious input is stored on the server (e.g., in a database) and later rendered in the browser, leading to script execution.
- **Attribute Context XSS**: Exploiting vulnerabilities within HTML attributes, such as `href` or `onclick`.
- **HTML Encoding**: The server encodes certain characters (angle brackets and double quotes) to prevent breaking out of attributes or tags.
- **Escaping Characters**: Single quotes and backslashes are escaped, making it difficult to break out of string contexts.
- **HTML Entities**: Using entities like `&apos;` to bypass escaping and inject special characters.
- **JavaScript Expression Injection**: Injecting JavaScript expressions into event handler attributes to execute code.
- **Browser Parsing Behavior**: Understanding how browsers decode HTML entities and execute JavaScript in event handlers.
- **Multiple Sinks**: If one injection point (e.g., `href`) is filtered, look for alternative sinks (e.g., `onclick`).

## Steps Taken:

1. Load the target website.
2. Open the details page of any post.
3. Submit a mock comment to observe how the comment is displayed in the DOM.
4. Reload the post details page and view the page source to see how the comment is rendered.
5. Observe that the website URL is populated in the `href` attribute and the `onclick` event of an `<a>` tag.
   ![](./Images/mock%20comment%20rendered%20in%20DOM.png)
6. Attempt to break out of the `href` attribute using a POC payload, but angle brackets and double quotes are encoded, and single quotes are escaped.
7. Identify that the `onclick` event is a viable sink for injection.
8. Use HTML entities (e.g., `&apos;`) to encode single quotes, bypassing the server's escaping.
   ![](./Images/HTML%20encode%20single%20comma.png)
9. Submit the payload below as a comment.
   ![](./Images/payload%20in%20comment%20saved.png)
10. Observe that the payload executes and triggers an alert, solving the lab.

## Payloads Used:

```html
http:something?&apos;-alert()-&apos;
```

**NOTE:**

- As there is a tracker method being used, which is likely to track the given website somehow, we still have the argument as XSS source.
- Javascript executes methods in an expression, so if I pass `'string1'+alert()+string2` to a function as an argument, then:
  - `alert()` method will be called first.
  - It will return undefined.
  - Final expression will be `'string1' + undefined + 'string2'`.
  - The resulting string argument will be `string1undefinedstring2`
- but since single comma is backslash escaped, I can use HTML entity of single comma, which is `&apos;`.
- Browser will parse the HTML entities into its special character value and the payload `http:something?&apos;-alert()-&apos;` will be parsed as `http:something?'-alert()-';`, which is a valid html.
- the `?` is inserted at last of the mock `URL` because it just add an extra layer of validity that the `URL` is valid along with the query string. Browser might consider the `URL` invalid if query string `?` is not used.

## Issues Encountered:

- Unable to break out of the `href` attribute due to server encoding of angle brackets and double quotes.
- Single quotes were backslash-escaped, preventing direct injection.

## Solutions/Workarounds:

- Focused on the `onclick` event as an alternative injection point.
- Used `HTML entities` to encode single quotes and bypass escaping.

## Takeaways:

- If the server is escaping some characters, try to use `HTML` entities.
- Always enumerate all possible sinks for injection, not just the obvious ones.
- Understanding both server-side filtering and browser-side parsing is key to successful exploitation.
