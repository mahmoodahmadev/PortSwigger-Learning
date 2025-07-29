# LAB: Reflected XSS into a JavaScript string with single quote and backslash escaped

## Objective:

- Find a way to escape the script and show an alert on the target website.

## Key Concepts:

## Key Concepts:

- **JavaScript String Injection**: The vulnerability occurs when user input is placed inside a JavaScript string in the page source.
- **Escaping Characters**: Single quotes (`'`) and backslashes (`\`) are escaped, making direct string breaking difficult.
- **Script Tag Context**: Understanding how browsers switch between parsing JavaScript and HTML when encountering `<script>` and `</script>` tags.
- **Breaking Out of Script Context**: Using a closing `</script>` tag in the payload to exit the JavaScript context and inject HTML/JavaScript.
- **Payload Crafting**: Building a payload that closes the script tag and injects an XSS vector (e.g., `<img src=0 onerror=alert()>`).
- **Browser Parsing Behavior**: Knowing how browsers interpret and switch between HTML and JavaScript contexts is crucial for exploiting this type of XSS.

## Steps Taken:

1. Load the target website.
2. Observe that there is an search field.
3. Submit a unique string to this field.
4. Inspect the page source.
5. Observe that there is a script where the input string is assigned to a variable `searchTerm`.

![](./Images/script%20on%20page%20source.png)

6. As the single quotes are escaped through backslash, close the script tag first.
7. The browser first renders HTML and then where script tag starts, it starts processing everything as JavaScript until it encounters `</script>` tag.
8. Submit the payload.
9. The lab is solved.

## Payloads Used:

```html
</script><img src=0 onerror=alert()>
```

**NOTE:**

- As soon as the browser encounter opening `script` tag, it processes everything as `JavaScript` code from that point.
- When the browser encounters closing `script` tag, it again treats everything as `HTML`.
- Therefore, we closed the `script` tag, and then places an `img` tag payload.
- Check my notes on [how does the Browser Parses HTML + JS ](./../00%20-%20Notes/How%20the%20Browser%20Parses%20HTML%20+%20JS.md)

## Issues Encountered:

- Felt lot as I could not get out of the statement by **single inverted commas**.

## Solutions/Workarounds:

- Studied about how browser parses `HTML` & `JavaScript`.

## Takeaways:
