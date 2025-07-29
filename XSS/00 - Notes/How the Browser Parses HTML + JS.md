# How the Browser Parses HTML + JS

1. **HTML is parsed first, top to bottom**

   The browser starts reading the raw HTML as plain text from top to bottom, treating it as a tree of elements `<html>`, `<head>`, `<script>`, etc.

2. **When it encounters a `<script>` tag, it:
   Pauses HTML parsing.**

   - Switches to JavaScript execution mode.

   - Executes everything inside the script block as code.

- When it hits </script>, it returns to HTML parsing mode.

## XSS Trick: Abuse the switch between HTML and JavaScript parsing

Take this payload:

```html
</script><img src=0 onerror=alert()>
```

This is HTML that pretends to "close" the `<script>` tag early. So what happens?

**Suppose this is rendered as:**

```javascript
<script>
var searchTerms = '</script><img src=0 onerror=alert()>';

    document.write('<img src="/track.gif?q=' + searchTerms + '">');

</script>
```

Now look at this step-by-step:

1. Browser starts in HTML parsing mode

2. Sees `<script>` → switches to JavaScript execution

3. Reads:

```javascript
var searchTerms = "</script><img src=0 onerror=alert()>";
```

JavaScript is happy here — it thinks it's just a string.

4. But when this is written to the DOM using document.write() without encoding, what gets written is:

```html
</script><img src=0 onerror=alert()>
```

Now, HTML parsing resumes, and:

- `</script>` is seen → browser exits script mode

- `<img src=0 onerror=alert()>` is seen as HTML → `onerror` triggers when `src=0` fails to load

- `alert()` executes — this is XSS

## In Summary

**The browser does:**

- Parse HTML first, top to bottom

- Switch to JavaScript when it sees `<script>`

- Execute JS

- Go back to HTML parsing after </script>

- Malicious input can manipulate these mode switches

## Why This Matters

- HTML and JS are parsed in different modes

- Injection attacks like XSS exploit the boundaries between these modes

- That’s why even a single </script> can be dangerous in untrusted input
