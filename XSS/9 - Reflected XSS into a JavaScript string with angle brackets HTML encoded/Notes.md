# LAB: Reflected XSS into a JavaScript string with angle brackets HTML encoded

## Objective:

- Call an alert on the target website.

## Key Concepts:

- Understand the context when user input is reflected in a variable definition.
-

## Steps Taken:

- Load the target website.
- Observe that there is a search input field.
- Enter a unique string and search for it.
- Inspect the page source.
- Observe that there is a script which defines a variable `searchTerm` with the
  value of the search input.
  ![](./Images/script%20that%20reflects%20user%20input.png)
- Craft a payload that will break out of the variable definition and call the
  `alert` function.
- Enter the crafted payload into the search input field and search for it.
- The `alert` function is callled and the lab is solved.

## Payloads Used:

```javascript
';alert();//
```

## Issues Encountered:

- I was trying to inject the XSS payload into the img src attribute, in the
  second line of script.

## Solutions/Workarounds:

- I realized that there is no need to go to second line, the first line is
  perfect to inject the payload.

## Takeaways:

- When user input is reflected in a variable definition, it can be exploited to
  execute `JavaScript` code.
