# LAB: DOM XSS in jQuery anchor href attribute sink using location.search source

## Objective:

- Show and alert on the target site.

## Key Concepts:

- XSS in jQuery anchor href attribute.
- Using `location.search` as a source.
- Understanding how jQuery manipulates the DOM.
- Using `href` attribute to execute JavaScript.

## Steps Taken:

1. Open the target site.
2. View page source of each page in the site.
3. Found a script in the **submit feedback** page which uses jQuery to set the `href` attribute of an anchor tag to the value of `returnPath` query parameter value.
   ![jQuery script](./Images/jQuery%20script.png)
4. Understand that the browser will execute the `href` attribute to check if it is a valid URL.
5. Use `javascript:` protocol to execute JavaScript code in the `href` attribute.
6. Prepare a payload using `javascript:` protocol and pass it in the `returnPath` query parameter.
![Payload in URL](./Images/Payload%20in%20URL.png)
7. The lab is solved.


## Payloads Used:

```html
javascript:alert()
```

##### NOTES: 

- The `javascript:` protocol allows you to execute JavaScript code directly in the `href` attribute of an anchor tag.
- The browser will execute the code when the anchor tag is clicked, allowing you to execute arbitrary JavaScript code.

## Issues Encountered:

- Did not know about how the browser executes the `href` attribute.
- Did not know about the `JavaScript:` protocol and how it can be used to execute JavaScript code in the `href` attribute.

## Solutions/Workarounds:

- Read the documentation on how the browser executes the `href` attribute.
- Understand how jQuery manipulates the DOM and how it can be used to set the `href` attribute of an anchor tag.

## Takeaways:

- `JavaScript:` protocol can be used to execute JavaScript code in the `href` attribute of an anchor tag.