# LAB: User ID controlled by request parameter with data leakage in redirect

## Given:

- There is a vulnerability in a direct response from backend application.
- The credentials are give `wiener:peter`.
- 
## Objective:

- Submit the API key for user `carlos`.

## Key Concepts:

- **Horizontal Access Control:** Occurs when users can access resources belonging to other users at the same privilege level by manipulating identifiers (e.g., user IDs) in requests.
- **Data Leakage via Redirects:** Some web applications inadvertently expose sensitive data in responses before performing a redirect, especially when unauthenticated or unauthorized access is attempted.
- **Parameter Fuzzing:** Systematically modifying request parameters (such as user IDs) to test for unauthorized data exposure.

## Steps Taken:

1. **Configure Proxy:** Launch the target website in a Chromium-based browser and configure it to proxy all traffic through Burp Suite for interception and analysis.
2. **Access Account Page:** Navigate to the "My Account" page.
3. **Authenticate:** Log in using the provided credentials: `wiener:peter`.

   ![](./Images/my%20account%20page.png)

4. **Analyze Requests:** Since the vulnerability is related to direct responses, use Burp Suite's Site Map to review requests associated with the "My Account" page.

   ![](./Images/my%20account%20page%20request%20in%20burp%20Site%20map.png)

5. **Send to Repeater:** Identify the relevant request and send it to Burp Suite Repeater for manual testing.
6. **Parameter Manipulation:** Modify the `id` request parameter from the current user to `carlos`.
7. **Send Modified Request:** Submit the altered request and observe the server's response.

   ![](./Images/alter%20request%20in%20repeater.png)

8. **Review Response:** In the Repeater's "Render" tab, note that the response contains details for the `carlos` user, including the API key. However, accessing the same request in a browser results in a redirect to the login page, masking the data leak.

   ![](./Images/API%20key%20for%20carlos.png)

9. **Extract Sensitive Data:** Copy the API key for `carlos` from the Repeater response.
10. **Submit Solution:** Paste the extracted API key into the lab's "Submit Solution" prompt.
11. **Lab Completion:** The lab is successfully solved.

## Payloads Used:

```http

id=carlos
```

## Issues Encountered:

- No significant issues encountered during exploitation. The vulnerability was straightforward to identify and exploit using Burp Suite's tools.

## Takeaways:

- **Always test parameterized endpoints:** If a URL or request contains user-controllable parameters (such as IDs), attempt to modify them to access other users' data.
- **Inspect server responses in tools:** Sensitive data may be exposed in server responses before a redirect occurs, even if the browser hides this by immediately redirecting.
- **Professional Practice:** Regularly audit applications for horizontal access control flaws and ensure that sensitive data is never included in responses to unauthorized requests, even momentarily.
- **Security Controls:** Implement robust server-side authorization checks for every request, regardless of client-side controls or redirects..