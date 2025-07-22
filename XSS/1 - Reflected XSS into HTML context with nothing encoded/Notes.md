# LAB: Reflected XSS into HTML context with nothing encoded

## Objective:

- Generate an alert using reflective XSS

## Key Concepts:

- Understanding how to find and exploit reflected XSS vulnerabilities in web applications
- Learn how to manipulate HTML context to execute JavaScript
- Identify and use input fields to inject XSS payloads
- Understand the importance of viewing page source and inspecting elements

## Steps Taken:

1. Explore the applications
2. View page source for any internal javascript code in script tags
3. Find any input field where user can search something
4. Found a search field in the main page.
   ![Search Field](./Images/Search%20field.PNG)
5. Open the networks tab from inspect to see if there is any API call made for search.
   ![search API call](./Images/search%20API%20call.PNG)
6. Search a unique value in the search field.
7. Observered that the searched term is reflected on the page right above input field.
   ![alt text](./Images/Search%20Results.PNG)
8. View page source code.
9. Notice that there is an **h1** tag in which the searched term is reflected in **""** quotes.
   ![Search Content in page source code](./Images//Search%20content%20in%20page%20source%20code.PNG)
10. Try a POC payload using **script** tag or **img** tag to see if the input field is vulnurable to any XSS.
    ![Typed POC in search field](./Images/Typed%20POC%20in%20search%20field.PNG)
11. Hit **Enter** and the alert will pop up.
    ![Searched the POC paylaod in search field](./Images/Searched%20the%20POC%20payload%20in%20search%20field.PNG)
12. The lab is solved!

## Payloads Used:

```html
<script>
  alert();
</script>
```

```html
<img src="0" onerror="alert()" />
```

## Issues Encountered:

- No script tags or any javascript source was found from where the javascript could be executed.
- Found an input search field but did not found any internal, external or inline javascript attached to the input search field.

## Solutions/Workarounds:

- If there is no javascript code exuection from the client side, then maybe the server is sending the response after processing the search field content.
- Inspect the networks tab and you will see, an API call is made to get the resutls against the search value

## Takeaways:

- Always check the networks tab if no javascript code is found in client side.
- Always try with a POC. It helps and avoids any further effort
