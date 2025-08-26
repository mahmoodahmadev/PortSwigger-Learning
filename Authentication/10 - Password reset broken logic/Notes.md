# LAB: Password reset broken logic

## Given:

- The target website's password reset functionality is vulnerable to logic flaws.
- Credentials provided for `wiener: peter`.
- Target username: `carlos`.
- Email client access available for user `wiener`.

## Objective:

- Successfully log in and access the `/my-account` page as user `carlos` by exploiting the broken password reset logic.

## Key Concepts:

- Password reset mechanisms must validate both the user and the reset token to prevent unauthorized resets.
- Failing to check session or token validity can allow attackers to reset passwords for arbitrary users.
- Attackers can leverage access to their own email client to obtain valid tokens and manipulate requests for other users.

## Steps Taken:

1. Set up Burp Suite to intercept and log browser traffic.
2. Load the target website in the browser and log in as `wiener: peter`.
3. Explore `/my-account`, the password reset feature, and the update email feature.
4. In Burp Suite, send all password-related `POST` requests to Repeater for manual testing:

   - Request to generate password reset email for a user.
   - Request to set a new password using a reset token.

   ![](./Images/send%20all%20the%20password%20reset%20requests%20to%20repeater.png)

5. Observe that the first request only requires a `username` parameter to generate a password reset email. No session validation is performed.
6. Send the request for user `carlos` (without a valid session) and confirm that a password reset email is generated—this is a vulnerability.

   ![](./Images/generate%20email%20request%20without%20session.png)

7. For the second request, note that it requires a `temp-forgot-password-token` (from the reset link), `username`, and new password fields.
8. Since you have access to `wiener`'s email client, generate a password reset email for `wiener` and copy the token from the link.

   ![](./Images/Email%20Client.png)

9. In Repeater, use the valid token from `wiener`'s email, but change the `username` parameter to `carlos` and provide a new password. Remove the token value to test server-side validation.

   ![](./Images/removed%20the%20token%20value%20and%20changed%20username%20to%20carlos%20for%20password%20reset%20final%20request.png)

10. The server does not validate the token, allowing you to reset `carlos`'s password without authorization.
11. Log in as `carlos` with the new password and access `/my-account`.
12. Lab is solved.

## Payloads Used:

- Password reset requests with manipulated parameters (username, token, new password).
- No special payloads required; logic flaw exploited via manual request manipulation.

## Issues Encountered:

- Ensuring the reset token was accepted for a different user.
- Confirming lack of server-side validation for the token and session.

## Solutions/Workarounds:

- Use Burp Suite Repeater to manually craft and test requests.
- Leverage access to your own email client to obtain valid tokens for testing.

## Takeaways:

- Password reset logic must validate both the user and the reset token for every request.
- Never allow password resets without proper session and token validation.
- Attackers can exploit logic flaws by manipulating request parameters and tokens.
- Always test password reset flows for broken logic and missing validation.
- Secure password reset mechanisms are critical for account protection.
