# LAB: Reflected XSS with event handlers and href attributes blocked

## Objective:

- Find a way to show an `alert` when all the **events** and `href` attribute is blocked.

## Key Concepts:

## Steps Taken:

1. Load the target website.
2. Try a POC payload with `<img>` or `<script>` tags.
3. Observe that the tags are not allowed.
4. Use the Burp intruder and find all the allowed tags & events.

![](./Images/allowed%20events.png)

5. No event is allowed, and only the following tags are allowed.

   - animate
   - a
   - title
   - image

![](./Images/allowed%20tags.png)

6. Use the following payload to exploit the search field.
7. Lab is solved.

## Payloads Used:

```html
<svg>
  <a>
    <animate attributeName="href" values="javascript:alert()" />
    <text x="20" y="20">Click me</text>
  </a>
</svg>
```

**NOTE:**

- animate tag has `attributeName` & `values` attributes, which can be used to insert an `href` attribute with malicious value.
- As the lab demands that there should be **Click me** text in the payload, we have used `text` tag, which is used to give a label to the `svg` elements.

## Issues Encountered:

- `Text` tag content was not appearing on UI.

## Solutions/Workarounds:

- The issue was that, we have to self-close the `animate` tag, and `text` tag should have `x` & `y`dimensions to show the content inside it.

## Takeaways:

- Alway self-close the tag that are self closing.
- Always add `/>` at the end of self-closing tags to close them.
