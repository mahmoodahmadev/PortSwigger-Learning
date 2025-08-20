# LAB: 2FA Simple Bypass

## Given:

The lab environment is set up with two-factor authentication (2FA) enabled for user accounts. You are provided with credentials for two users:

- `wiener: peter`
- `carlos: montoya`
  Your goal is to understand and exploit a flaw in the 2FA implementation.

## Objective:

Successfully log in as user `carlos` by bypassing the 2FA step, demonstrating how a logic flaw can allow access without completing the second factor.

## Key Concepts:

- Two-factor authentication should require both steps before granting access to protected resources.
- Flawed implementations may treat users as authenticated after only the first step (password entry), exposing sensitive pages.
- Session cookies set before 2FA completion can be abused to access restricted endpoints.

## Steps Taken:

1. Set up Burp Suite as your proxy to intercept and analyze all HTTP requests and responses between your browser and the target site.
2. Load the target website and explore the available features. Notice that an Email Client is provided for receiving 2FA codes.

![](./Images/Email%20client%20provided.png)

3. Access the email client and confirm it is configured for user `wiener`.

![](./Images/Email%20client%20for%20wiener.png)

4. Go to the accounts page and log in using `wiener: peter`.
5. When prompted for the 4-digit code, retrieve it from the Email Client and complete the login process.

![](./Images/Email%20Client%20receives%20the%20security%20code%20message.png)

6. After successful 2FA, observe that you now have access to the `/my-account` page, which was previously restricted.

![](./Images/redirected%20to%20my%20account%20page%20after%202FA.png)

7. Log out from user `wiener` and repeat the login process with `carlos: montoya`.
8. Using Burp Suite, observe that after entering the credentials for `carlos`, a session cookie is issued and the user is redirected to `/login2` for the 2FA code.

![](./Images/Got%20cookies%20from%20entering%20credentials.png)

9. Since you already have a valid session cookie for `carlos` (even before completing 2FA), attempt to directly access `/my-account` by changing the URL in your browser or sending a request via Burp.
10. You will find that you can access the `my-account` page for `carlos` without ever entering the 2FA code, confirming the bypass.
11. The lab is solved by demonstrating this logic flaw.

## Payloads Used:

No special payloads were required; the bypass was achieved by manipulating session cookies and URLs after the initial login step.

## Issues Encountered:

No major issues encountered. The main challenge was identifying the point at which the session cookie was set and confirming access to protected resources before 2FA completion.

## Solutions/Workarounds:

If you encounter issues accessing protected pages, ensure you are using the correct session cookie and that you are navigating to the right endpoints. Use Burp Suite to replay requests if needed.

## Takeaways:

- Always check if a session cookie is issued after the first authentication step and before 2FA is completed.
- Attempt to access authenticated pages after each phase of login to identify logic flaws.
- Flawed 2FA implementations can allow attackers to bypass the second factor entirely, making the system vulnerable to unauthorized access.
- Proper 2FA should enforce both steps before granting access to any sensitive resources.
