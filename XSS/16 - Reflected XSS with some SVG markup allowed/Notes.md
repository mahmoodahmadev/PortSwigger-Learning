# LAB: Reflected XSS with some SVG markup allowed

## Objective:

- Display an alert on the target website.

## Key Concepts:

## Steps Taken:

1. Load the target website.
2. Submit a POC payload such as **payload 1** in the search field.
3. Observe that the tag is not allowed.
   ![](./Images/tag%20is%20not%20allowed%20response.png)
4. Use Burp Suite's `intruder` to find all the tags that are allowed.
   ![](./Images/intruding%20to%20find%20allowed%20tag.png)

5. Observe that the `<svg>`, `<animateTransform>` tags are allowed with some other.
   ![](./Images/allowed%20tags.png)
6. Use **payload 2** as POC and observe that some events are also blocked.
   ![](./Images/event%20is%20not%20allowed%20response.png)
7. Repeat the step 4 to find all the attributes that are allowed.
   ![](./Images/intruding%20to%20find%20allowed%20attributes.png)
8. Observe that only `onbegin` attribute is allowed.
   ![](./Images/allowed%20attributes.png)
9. Check **internet** for the `onbegin` attribute and observe that this attribute is used to execute scripts in a few `svg` related tags, one of them which is `<animateTransform>`.
   ![](./Images/interent%20about%20onbegin%20attribute.png)
10. Craft a payload similar to the **payload 3**.
11. Submit the payload in the search field.
    ![](./Images/payload%20injected%20in%20DOM.png)
12. `Alert` is displayed and lab is solved.

## Payloads Used:

```html
<!--Payload 1-->
<img src="0" onerror="alert()" />
```

```html
<!--Payload 2-->
<svg onload="alert()" />
```

```html
<!--Payload 3-->

<svg>
  <animateTransform onbegin="alert()" />
</svg>
```

## Issues Encountered:

- Issue understanding how to use the `onbegin` event.

## Solutions/Workarounds:

- Checked **MDN Docs**,and some other sites, but at the end, the **copilot AI** from edge browser gave me a simple explanation of the event, for what purpose it is used and in what tags it can be used.

## Takeaways:

- take assistance from AI as well to understand things easily, in less time and to remember it more efficiently.
