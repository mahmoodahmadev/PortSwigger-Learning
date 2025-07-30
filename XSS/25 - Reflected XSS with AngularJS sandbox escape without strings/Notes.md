# LAB: Reflected XSS with AngularJS sandbox escape without strings

## Objective:

- Exploit the AngularJS sandbox to execute `alert()` without using single or double quotes, as both are encoded and unavailable for payload construction.

## Key Concepts:

- **AngularJS Sandbox**: AngularJS uses a sandbox to restrict what expressions can do, but certain techniques can escape this sandbox and achieve code execution.
- **No-String Payloads**: When quotes are filtered or encoded, payloads must avoid using string literals and instead rely on JavaScript object properties and methods.
- **Prototype Pollution**: Overriding or manipulating JavaScript prototypes (e.g., `toString().constructor.prototype.charAt`) to change the behavior of built-in functions.
- **AngularJS Filters**: Filters like `orderBy` can be abused to execute arbitrary JavaScript code within AngularJS expressions.
- **fromCharCode**: Allows construction of strings from character codes, enabling payloads without direct use of quotes.
- **Expression Injection**: Injecting AngularJS expressions (e.g., `{{expression}}`) to trigger code execution.
- **Bypassing Input Restrictions**: Using URL parameters or other vectors when input fields have character limits or restrictions.

## Steps Taken:

1. Load the target website.
2. Try an arithmetic expression {{1+1}} to see if we can exploit the interpolation in angularJS.
3. Submit the **payload 1** in the search field.
4. Observe that there is a character limit for the search field
5. Append the **payload 2** in the `URL`. (using the portswigger's academy's XSS cheatsheet)
6. The lab is solved.

## Payloads Used:

```javascript

// Payload 1

toString().constructor.prototype.charAt=[].join;
[1,2]|orderBy:toString().constructor.fromCharCode(120,61,97,108,101,114,116,40,49,41)
```

```javascript
// Payload 2

toString().constructor.prototype.charAt=[].join;
/?search=1&[1,2]|orderBy:toString().constructor.fromCharCode(120,61,97,108,101,114,116,40,49,41)=1
```

**Explanation:**

- As we have a character limit for the search input string, we cannot directly insert the payload.
- We have to exploit JavaScript's way of parsing expression.
- the final result of `1&code=1` can be **true** or **false**. Which will be the final string submitted in the search field.
- For the `AngularJS` expression, we have fooled the `isIdent()` method by setting the `charAt[]` method to join.

## Issues Encountered

- Character limit in the search input prevented direct payload injection.
- Single and double quotes were encoded, making string-based payloads impossible.

## Solutions/Workarounds

- Used JavaScript property and method manipulation to avoid the need for quotes.
- Leveraged URL parameters to bypass input length restrictions.

## Takeaways:

- URL encode the payload is adding in the URL of the target website, as any character such as `=` can break the URL, resulting in payload not working.
- When quotes are filtered, use JavaScript methods like `fromCharCode` to construct strings.
- Prototype pollution and filter abuse are powerful techniques for escaping AngularJS sandboxes.
- Always check for alternative injection points (e.g., URL parameters) if input fields are restricted.
- Understanding the underlying JavaScript and AngularJS internals is crucial for crafting advanced XSS payloads.
