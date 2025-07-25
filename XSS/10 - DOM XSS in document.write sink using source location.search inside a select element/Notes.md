# LAB: DOM XSS in document.write sink using source location.search inside a select element

## Objective:

- Display and alert on the target website.

## Key Concepts:

- Understand how the `location.search` can be manipulated to inject JavasScript
  into the page.
- Learn how to exploit the `document.write` method to execute arbitrary
  JavaScript code.

## Steps Taken:

1. Load the target website.
2. Observe that there is no search field on main page.
3. View source code to find any `script` on the page that can be exploited.
4. No `script` found on main page.
5. Open products page for a specific product.
6. Observe that the page has a `select` element.
7. View the page source code.
8. Observe that there is a script on this page.
   ![](./Images/product%20page%20internal%20script.png)
9. The script uses `document.write` to write the content of `location.search` by
   getting the value of `storeId` from the URL.
10. Modify the URL to include `storeId` with a mock parameter `1` and load the
    page. ![](./Images/URL%20with%20storeId.png)
11. Observe that the `select` element is populated with value `1`.
    ![](./Images/Select%20tag%20with%20storeId%20value.png)
12. Inspect the `select` element and find that the `storeId` value is appended
    in an `option` tag.
    ![](./Images/Select%20tag%20after%20storeId%20insertion.png)

13. Modify the URL to include `storeId` with the malicious payload mentioned
    below, to break out of `option` tag and execute JavaScript.
    ![](./Images/URL%20with%20POC%20payload.png)
14. Load the page with the modified URL.
    ![](./Images/Select%20tag%20with%20injectde%20script.png)
15. Alert is displayed.
16. Lab is solved.

## Payloads Used:

```html
1</option><script>alert()</script>
```

**NOTE:**

- As the sink is `document.write`, which executes `<script>` tags, we can use
  the payload with `<script>` tags to execute arbitrary JavaScript code. I have
  mentioned this in my
  _[DOM-basex XSS notes](./../00%20-%20Notes/DOM-based%20XSS.md)_
- First, we have 1 mock value for storeId.
- Then we close the `option` tag.
- Then inject a script using the `script` tags to call and alert.

## Issues Encountered:

- Unable to find any `script` on the main page.
- Difficulty in understanding how `location.search` can be used to inject
  JavaScript into a web page.

## Solutions/Workarounds:

- Explored the products page to find **internal script**.
- Understood the `location.search` from internet. Then went through the products
  page **script** to understand how it is inserted on page DOM using
  `document.write` sink.

## Takeaways:

- The `location.search` can be used to inject JavaScript into a web page.
- The `document.write` method can be exploited to execute arbitrary JavaScript
  on a web page.
