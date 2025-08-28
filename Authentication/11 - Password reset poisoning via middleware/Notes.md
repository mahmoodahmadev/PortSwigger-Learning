# LAB: Password reset poisoning via middleware

## Given:

- The lab is vulnerable to password reset poisoning via HTTP headers.
- Credentials provided: `wiener: peter`.
- Email client access for user `wiener`.
- Target user `carlos` will click on any email links received.

## Objective:

- Successfully log in as `carlos` by exploiting the password reset poisoning vulnerability.

## Key Concepts:

- Password reset poisoning occurs when an attacker manipulates headers (like `X-Forwarded-Host`) to control the domain in password reset links.
- Middleware that trusts user-supplied headers can be abused to generate malicious reset URLs.
- Attackers can intercept or redirect password reset tokens to themselves, allowing them to reset other users' passwords.

## Steps Taken:

1. Proxy browser traffic through Burp Suite to intercept and analyze requests.
2. Load the target website and initiate a password reset for `wiener`.
3. Log in as `wiener` and access the email client to retrieve the reset link.
4. Observe that the reset link uses the website's domain as the origin.
5. Repeat the password reset request, this time adding an `X-Forwarded-Host` header with a custom value to test for header poisoning.
6. Confirm that the reset link in the email now uses the value from the `X-Forwarded-Host` header as its domain.
7. Reset `wiener`'s password to capture all relevant POST requests for later use.
8. Send all POST requests to Burp Repeater for manual manipulation.
9. Generate a unique Burp Collaborator link for exfiltration.
10. Send a password reset request for `carlos`, including the `X-Forwarded-Host` header set to the Burp Collaborator domain.
11. Monitor Burp Collaborator for incoming requests from the target server, looking for the password reset token in the query parameters.
12. Extract the `temp-forgot-password-token` value from the Collaborator request.
13. Use this token in a password reset confirmation request to set a new password for `carlos`.
14. Observe a `302` redirect, indicating the password was successfully reset.
15. Log in as `carlos` using the new password to confirm the exploit worked.
16. Lab is solved.

## Payloads Used:

- Custom `X-Forwarded-Host` header to poison the password reset link domain.
- Burp Collaborator link for exfiltrating the password reset token.

## Issues Encountered:

- Ensuring the header was accepted and reflected in the reset link.
- Extracting the correct token from Collaborator requests.

## Solutions/Workarounds:

- Use Burp Suite's Repeater and Collaborator to automate and monitor the attack steps.
- Carefully analyze all requests and responses for token leakage and header reflection.

## Takeaways:

- Always validate and sanitize user-supplied headers in middleware and backend logic.
- Password reset links should be generated using secure, server-side logic, not influenced by client headers.
- Monitor for header poisoning vulnerabilities in password reset and other sensitive flows.
- Use unique, high-entropy tokens for password resets and ensure they are only sent to the legitimate user's email.
- Regularly test password reset functionality for security flaws, especially in multi-layered applications.
