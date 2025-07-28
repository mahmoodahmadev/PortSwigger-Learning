# LAB: Stored DOM XSS

## Objective:

- Exploit the **Stored XSS vulnerability** in **post comment section** to display and `alert`

## Key Concepts:

## Key Concepts:

- **Stored XSS**: A type of Cross-Site Scripting where the malicious script is stored on the server (e.g., in a database) and served to users.
- **DOM XSS**: XSS that occurs when the vulnerability is in the client-side JavaScript code, which dynamically updates the page based on user input.
- **Payload Injection**: Crafting and submitting a payload (e.g., `<script>alert(1)</script>`) that gets stored and later executed in the browser.
- **Comment Section Attack Surface**: Exploiting input fields like comment forms that store and display user input.
- **JavaScript Sinks**: Functions or properties (like `innerHTML`, `document.write`, etc.) that can execute injected scripts if not properly sanitized.
- **Input Sanitization**: The importance (or lack) of filtering and escaping user input before rendering it in the

## Steps Taken:

1. Load the target website.
2. Open any post.
3. View page source code.
4. Observe that the comments are being loaded through a `loadComments` method in form a script file **_loadCommentsWithVulnerableEscapeHtml.js_**.
   ![](./Images/script%20on%20post%20details%20page.png)
5. Open Networks tab and reload the post details page.
6. Observe that there is a file loaded with same name as **_loadCommentsWithVulnerableEscapeHtml.js_**.
   ![](./Images/loadCommentsWithVulnurableEscapeHtml.js%20file%20in%20networks.png)
7. Click on that file to view its content.
8. Observe that there is an `escapeHTML` custom method being used to **sanitize** the comment data before `rendering` on `DOM`.
9. ![](./Images/escapeHtml%20method%20use%20in%20sanitizing%20comments.png).
10. Search for `escapeHTML` string in the js file, and see that its a custom method where JavaScript's `replace` method is being used.
11. View the `MDN Docs` for `replace` method and we can see that, it only replace the very first instance of specified string.
    ![](./Images/replace%20method%20docs.png)
12. We can craft a `POC` payload according to the `replace` method's behavior to bypass the `sanitization`, by entering a pair of `<>` which will be replaced by the `replace` method and the vulnerable payload afterwards `<>` will be stored as it is.
13. Since the `innerHtml` method is being used to render the comment data into the `DOM`, we have to use `POC` with **inline script**, as I have mentioned in the [DOM-based XSS notes](./../00%20-%20Notes/DOM-based%20XSS.md)
14. Use the below mentioned payload to bypass the `escapeHTML` method's sanitization and store a vulnerable payload in the comment section.
    ![](./Images/comment%20with%20POC.png)
15. Reload the post details section after submitting a comment with mock details and the mentioned payload as a comment.
16. An `alert` will be displayed an the lab is solved.

## Payloads Used:

```html
<><img src="0" onerror="alert()" />
```

## Issues Encountered:

- The javascript `protocol:` POC was not working in `href` attribute populated bt _website_ input field value.
- `<>` were being sanitized in the comment section.

## Solutions/Workarounds:

- Found the `loadCommentsWithVulnerableEscapeHtml.js` file, in which `escapeHTML` custom method was being used to escape `<>` brackets.

## Takeaways:

- Always analyze the following to gain information about how does the target site is working:
  - Page source code.
  - Networks tab.
  - external scrip files code.
