# LAB: DOM-based open redirection

## Objective:

- Redirect the victim to the **Exploit Server** by exploiting a DOM-based open redirection vulnerability.

## Key Concepts:

- **DOM-Based Open Redirection:** Occurs when client-side JavaScript reads a URL from user input (e.g., query parameters) and redirects the browser without proper validation.
- **Regular Expression Validation:** The script uses a regular expression `/url=(https?:\/\/.+)/` to check if the `url` parameter starts with `http` or `https`.
- **window.location Object:** The `location` object in JavaScript contains information about the current URL. Changing its `href` property causes the browser to navigate to a new URL.
- **Exploit Server:** A controlled server used to demonstrate and verify the vulnerability by redirecting victims to a known endpoint.

## Steps Taken:

1. Load the target website.
2. Open the details page of any post.
3. View page **source code**.
4. Observe that there is a script in `<a>` tag to redirect the client to the query parameter `url` if it has a valid `http` `URL`.
   ![](./Images/Script%20in%20post%20details%20page%20source%20code.png)
5. Open the **Exploit Server** in `new tab`.
6. Copy the **Exploit Server** `URL`.
7. Append the payload below which includes the **Exploit Server** `URL`.

## Payloads Used:

```javascript
&url=[Exploit Server URL]
```

## Explanation

- The script used **regular expression** ` /url=(https?:\/\/.+)/`, which checks if there is any string that has initials `https` and comes afterwards string `url=`.
- If string exists, then change the `href` key value of `location` property of global `window` object to that string.
- `location` is the object which stores information about the `URL`.
  ![](./Images/location%20object.png)
- the `href` property has the `URL` string.
  ![](./Images/location.href%20key%20value%20pair.png)
- Changing the href value of location object will result in client redirecting to the new `URL`.

## Issues Encountered:

- Difficulty understanding the regular expression.

## Solutions/Workarounds:

- Used external resources (e.g., ChatGPT) to clarify the regular expression logic.

## Takeaways:

- Always review client-side scripts for unsafe handling of user-supplied URLs.
- Query parameters used for redirection are a common sink for open redirect vulnerabilities.
- Proper validation and whitelisting of redirect URLs are essential to prevent abuse.
