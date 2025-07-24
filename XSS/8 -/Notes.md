# LAB: Stored XSS into anchor href attribute with double quotes HTML-encoded

## Objective:

- Display and **alert** on the target site when victim clicks on **author** of a
  comment.

## Key Concepts:

- **Stored XSS**: A type of cross-site scripting attack where the malicious
  script is stored on the server and executed when a user accesses the affected
  page.
- Use of `javascript` protocol in `href` attributes to execute JavaScript code
  as soon as the page loads.

## Steps Taken:

1. Open the target website.
2. Observe if there is any input field where you can submit any POC payload.
3. Find the comment section under posts details page.
4. Submit a comment with mock data to observe how the comment data is displayed
   on the page.
5. Observe that the website link string is reflected in the `href` attribute of
   the anchor tag.
   ![](./Images/website%20link%20reflected%20in%20href%20attribute%20of%20anchor%20tag.png)
6. Sbmit another comment with a payload that includes the below payload as
   website URL.
7. Go back to the post details.
8. Lab is solved.

## Payloads Used:

```html
javascript:alert()
```

## Issues Encountered:

- I was inserting the payload in the email field rather then the website field.

## Solutions/Workarounds:

- I inspected the code and realized that the website field value is reflected in
  the `href` attribute of the anchor tag.

## Takeaways:

- browser executes the script in the `href` attribue when the `javascrip:`
  protocol is used.
- Use `javascript:` protocol in `href` attributes to execute scripts without
  user interaction.
