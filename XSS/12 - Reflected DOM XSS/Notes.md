# LAB: Reflected DOM XSS

## Objective:

- Call an alert on target website.

## Key Concepts:

- Data can reflected on screen by a server response which is rendered in DOM
  using a client-side script.
- `XMLHttpsRequest` is an API which is used to make `AJAX` calls to not refresh
  the whole page and only re-render a specific part of page.
- `Eval` method in JavaScript is used to avaluate a string input as a JS
  statement.

## Steps Taken:

1. Load the target website.
2. Observe that there is an input search field.
3. View page source code.
4. Observe that a `search()` method is called in `DOM`.
5. Open the networks tab in **browser devtools**.
6. Search a uniqe string in the **search bar** and submit.
7. Observe that the browser loads a **_searchResults.js_** file along others.
   with a `search-results?search=[unique string]` API call.
8. As the **_searchResults.js_** file is a client side JS file for the target
   site, go to Sources tab, and expand the _**resources/js**_ folder.
9. Upon opening the **_searchResults.js_** file, we can see that an `XHR`
   request is made to server using the file's script.
10. The search field string is reflected in the `search query`, which can be
    extracted using the `location.search`.
11. The `XHR` request uses the `location.search` and makes an asynchronous call
    to the server.
12. Then evaluates the response from server in `eval` method input statement,
    where the response is set to a variable `searchResultsObj`.
13. `Eval` is our sink.
14. Now, we have to just exploit the response which is being evaluated in the
    `eval` method.
15. Open Burp Suite, and intercept the traffic for the target lab URL.
16. Observe that a `GET` call is made to `search-results?search=mahmood`
    endpoint.
17. Check the response of the request and boom, we are getting json format
    response with 2 key value pairs:
    - `results`
    - `searchTerm`
18. As the complete response is set to `searchResultObj` variable in `eval`
    method, so the **search field** is our source to inject payload.
19. Send the request to **repeater** and then use the **payload 1** to get an
    `alert` method in the `json` response.
20. Observe that the "" are escaped using backslash.
21. Again send a request on the searc-results endpoint, this time with already a
    backslash placed as in **payload 2**
22. This response with `alert` method will then get evaluated by `eval` method
    in **_searchResult.js_** file.
23. As soon as the `response` is evaluated, `alert` will popup.
24. The lab is solved.

## Payloads Used:

```javascript
// Payload 1

" - alert()};//


// Payload 2

\" - alert()};//

```

## Issues Encountered:

- Unable to find the definition for the **search method** I found on `DOM`.
- Unable to understand the `XHR` code.

## Solutions/Workarounds:

- Observed that the page is getting a **_searchResults.js_** file when loaded.
- Read the documentation on **MDN Docs**.

## Takeaways:

- Always observe the files that are requested by a website on the time of load.
  A certain script file could be useful.
- Always check networks for any `API calls` when submitting any payload in the
  response.
- Understand the XHR using the
  [MDN DOCS](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) or
  see my [XMLHttpRequest Notes](<./../00%20-%20Notes/XMLHttpRequest%20(XHR).md>)
  in the Notes folder
