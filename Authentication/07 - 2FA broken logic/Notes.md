# LAB: 2FA Broken Logic

## Given:

- The lab is vulnerable to flawed 2FA authentication logic.
- Credentials provided: `wiener: peter`.
- Target username: `carlos`.
- Access to Email server for receiving security codes.

---

## Objective

- Exploit broken logic in the 2FA implementation to log in as the target user `carlos` without knowing their password.

---

## Key Concepts

- 2FA should tightly bind both authentication steps to the same user session.
- Flawed logic can allow attackers to bypass password requirements and brute-force verification codes.
- Session management and request validation are critical for secure authentication.

---

## Steps Taken

1. Proxy traffic through Burp Suite to intercept and analyze requests.
2. Load the target website and log in as `wiener: peter`.
3. After entering credentials, the system prompts for a security code.

   ![](./Images/Security%20code%20verification%20page.png)

   - Use the Email server to retrieve the code for `wiener`.

   ![](./Images/Email%20Client%20.png)

4. After successful login, use Burp Suite's site map to identify all login-related requests:

   - `POST /login` (credentials)
   - `GET /login2` (security code generation)
   - `POST /login2` (security code submission)

   ![](./Images/Site%20map.png)

5. Attempt to generate a security code for `carlos` by manipulating the `verify` cookie in the `GET /login2` request.
   - No session cookie required; a 302 response confirms the vulnerability.
6. Send the request with `verify=carlos` to generate a security code for `carlos`.

   ![](./Images/get%20security%20code%20page%20for%20carlos%20user.png)

7. In the `POST /login2` request, submit the security code for `carlos` without a valid session cookie.
   - Again, no session required, confirming another logic flaw.
8. Test for brute-force protection by submitting multiple invalid codes for `carlos`.

   - No rate limiting or lockout is present; brute-forcing is possible.

   ![](./Images/get%20security%20code%20page%20for%20carlos%20user.png)

9. Use Burp Intruder to brute-force the 4-digit security code for `carlos` (10,000 combinations).

   ![](./Images/configuring%20brute%20force%20attack%20to%20find%20mfa%20code.png)

10. Upon success, receive a session cookie for `carlos`.

    ![](./Images/got%20session%20for%20user%20carlos%20.png)

11. Change the browser's URL to `/my-account` and use the new session cookie to access the account as `carlos`.

    ![](./Images/Change%20id%20to%20carlos.png)

12. Lab solved: full access to the target user's account.

---

## Payloads Used

- Manipulated `verify` cookie to target `carlos`.
- Brute-forced 4-digit security code using Burp Intruder.

---

## Issues Encountered

- No session validation for security code generation and submission.
- No brute-force protection on the 2FA code entry.

---

## Solutions/Workarounds

- Use Burp Suite to intercept and replay requests.
- Automate brute-forcing with Burp Intruder for rapid code guessing.

---

## Takeaways

- Always validate user sessions for every step of authentication, especially 2FA.
- Ensure security code generation and submission are tightly bound to authenticated sessions.
- Implement rate limiting and account lockout for repeated invalid 2FA code attempts.
- Test for logic flaws by manipulating cookies and replaying requests with different user values.
- Use interception tools like Burp Suite to analyze and exploit authentication flows.
- Brute-force protection is essential for short verification codes.

---
