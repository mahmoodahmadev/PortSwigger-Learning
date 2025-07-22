# LAB: DOM XSS in innerHTML sink using source location.search

## Objective:

- Show and alert on the target side.


## Key Concepts:

- Understand how `innerHTML` can lead to DOM-based XSS vulnerabilities.
- Use `location.search` as a source to inject payloads.
- Learn how to manipulate the DOM using `innerHTML`.
- Execute JavaScript through inline event handlers.
- Understand the limitations of `innerHTML` and how to bypass them.

## Steps Taken:

1. Go to the target site.
2. View page source of each page in the site.
3. Found no internal, external or inline javascript code.
4. Look for any input fields where you can inject XSS payload.
5. Found a search field on the UI.
6. Search a unique POC string in the search field.
7. Observe that the string is reflected on the page right above search field.
  ![](./Images/search%20string%20reflected%20on%20the%20page..png)
8. View page source code and observe that there is an internal script which takes
  search query value from URL and append it in the HTML element with id
  _searchMessage_ using the `innerHTML` method.
  ![](./Images/Script%20to%20insert%20search%20string%20using%20innerHTML%20method.png)
9. As I have mentiond in the **[DOM-based XSS notes](./../00%20-%20Notes/DOM-based%20XSS.md)** that the `innerHTML` method does not treat `script` tags as executables rather plain
  text. Therefore, we have to use inline script execution for this using the
  mentioned payloads.
10. Prepare a payload according to the context and pass it in the search field.
11. The lab is solved.

## Payloads Used:

```html
<img
  src="x"
  onerror="alert()" />
```

```html
<svg
  autofocus
  tabindex="1"
  onfocus="alert()"></svg>
```

## Issues Encountered:

- I could not find any inline, internal scripts before search.
- I was not able to insert a payload which could execute the alert method in the query variable statement.
![Query variable identify statement](./Images/Query%20variable%20identify%20statement.png)

## Solutions/Workarounds:

- Always try with available input fields, it can reveal scripts in page source.
- Source code shows only static code. You have to use Inspect the runtime code
  after script execution.
- Use the `innerHTML` method to insert the payload in the HTML element.

## Takeaways:

- Always check the page source code for any scripts that can be used to execute XSS payloads.
- Understand the context of how the input is being used in the script.
- If `innerHTML` is used, remember that it treats script tags as plain text, so you need to use inline event handlers or other methods to execute scripts.