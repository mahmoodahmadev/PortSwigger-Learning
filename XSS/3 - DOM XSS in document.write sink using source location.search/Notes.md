# LAB: DOM XSS in document.write sink using source location.search

## Objective:

- Show an alert on the target website.

## Key Concepts:

- Understand how `document.write` can lead to DOM-based XSS vulnerabilities.
- Use `location.search` as a source to inject payloads.
- Learn how to manipulate the DOM using `document.write`.

## Steps Taken:

1. Open the target website.
2. View page source code for all the endpoints of the target application.
3. Observe that no inline, internal javascript can be found.
4. Find any input field where you can inject a POC payload.
5. Found a search input field on the main screen.
6. View page source code.
7. Observe that there is a script tag which generates an **img** tag and appends
  the query value next to its **src** attribute.
  ![](./Images/Search%20script.png)
8. Understand the context where and how the query is appended.
9. Prepare a payload acccording to the context and pass in the search query in
  URL or in search field.
10. The lab is solved.

## Payloads Used:

```html
">
<script>
  alert();
</script>
```

**NOTE:**

- As I have mentioned in the
  [DOM-based XSS Notes](./../00%20-%20Notes/DOM-based%20XSS.md) notes, the
  `document.write` sink accepts the script tags and treats it as a script rather
  plain text. So we can go with the following approach.
- As the query is inside an attribute, so first get out of the attribute using
  **"**.
- Then close the **img** tag.
- Call an `alert` method in the `script` tags.

## Issues Encountered:

mahmoo

- app source code does not show any inline, internal scripts before search.
- I could not find any img tag that was supposed to be generated after searching
  as per script in the source code.

## Solutions/Workarounds:

- Always try with available input fields, it can reveal scripts in page source.
- Source code shows only static code. You have to use Inspect the runtime code
  after script execution.

## Takeaways:

- Its not necessory that the scirpt will be visible in the page source code on
  opening the target side. Soemtimes, you have to first inject something in an
  input field to see if the application reveals any inline, internal scripting.
- Content added in DOM using javascrip DOM manipulation does not reflect in the
  page source code. Therefore, use Inspect to find all the occurances in the
  page where the query parameter or string searched in this case is reflected
  using a DOM manipulation script. Because inspect shows the application DOM at
  runtime with new values.
  ![Dom manipulation results in inspect tab](./Images/Dom%20manipulation%20results%20in%20inspect%20tab.png)
