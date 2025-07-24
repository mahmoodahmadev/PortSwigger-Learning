# LAB: Reflected XSS into attribute with angle brackets HTML-encoded

## Objective:

- Display a JavaScript alert on the target site despite angle brackets `(<, >)` being HTML-encoded

## Key Concepts:

- Understanding how XSS behaves in an HTML attribute context.
- Bypassing limitations when **angle brackets** are **HTML-encoded** and cannot be used to inject new tags.
- Leveraging attribute-based payloads to achieve code execution without needing `<script>` or `<img>`.

## Steps Taken:

1. Load the target site.
2. Observe that an input field is present on the main screen.
3. Enter a unique value in the input field to observe the behaviour afterwards.
4. Observe that the input value is reflected in a `<h1>` tag.
5. Open inspect and search for the input value placed in the input field.
6. Found another place where the input value is reflected and that is in the **value** attribute of the `<input>` field.
![](./Images/input%20field%20where%20search%20value%20is%20reflected.png)
7. Try with a POC payload to first break out of the attribute value then the close the tag and then execute an inline script with let's say **payload 1**.
8. Observe that the angle brackets are HTML-encoded in the attribute value, so the payload is not executed.
9. Try with a payload which only break out of the attribute value and then executes the script.
10. Use the payload 2 below to show an alert on the target site.
11. The lab is solved.

## Payloads Used:
``` html
<!-- payload 1 -->
 <img src=x onerror=alert()>
```

``` html
<!-- payload 2 -->
" autofocus onfocus=alert() "

```
## Issues Encountered:

- angle brackets are HTML-encoded in the attribute value, so we cannot use tag payloads like `<img>`, `<script>` etc.

## Solutions/Workarounds:

## Takeaways:

- use `autofocus` or similar attribute payloads when you cannot escape an existing tag using **angle brackets**.