# LAB: Password reset poisoning via middleware

## Given:

- The lab is vulnerable to password reset poisoning.
- Provided credentials `wiener: peter`.
- Email client for user `wiener`.
- Target user `carlos` will click on any emails having a link.

## Objective:

- Login as `carlos`.

## Key Concepts:

## Steps Taken:

1. Proxy browser traffic through burp suite to log and intercept the requests.
2. Load the target website.
3. Click on forgot password and send a reset password email to `wiener`'s email.
4. Login as `wiener` and go to email client.
5. Examine the reset password link and see that the origin is as same as the website link.
6. Try again but this time with `X-Forwarded-Host` header and a value to check if this can override the origin.
7. And by examining the link, we can see that the reset password link has the domain value specified in `X-Forwared-host`
8. Reset the password for `wiener` to get all the `POST` requests.
9. Now send all the `POST` requests to repeater.
10. Go to burp repeater and send the 
11. Try to create a reset email request for `carlos` 

## Payloads Used:

## Issues Encountered:

## Solutions/Workarounds:

## Takeaways:
