# LAB: Password reset broken logic

## Given:

- Target website's reset password functionality is vulnerable.
- Provided credentials for `wiener: peter`.
- Provided target user's username is `carlos`.
- Email client for user `wiener`

## Objective:

- Login and access `/my-account` page with user `carlos`.

## Key Concepts:

## Steps Taken:

1. Setup Burp proxy to log and intercept browser's traffic.
2. Laod the targt website in the browser.
3. Login with `wiener: peter`.
4. Explore the `/my-account` page, forgot password feature, and also the update email feature as well.
5. Go to Burp suite's site map and send all the Password related `POST` requests to repeater.
   1. `POST` request to generate password reset email for user
   2. `POST` request to set the new password for user

![](./Images/send%20all%20the%20password%20reset%20requests%20to%20repeater.png)

6. Observe the first request, that is requires `username` parameter to generate reset password email for the user.
7. Try to send the request for user `carlos` as username, and by removing the session as we dont have the session for this user.
8. The response returns 200 and generates the password reset email for user `carlos` which is a vulnerability itself as not checking session.

![](./Images/generate%20email%20request%20without%20session.png)

1. Now, move to the next `POST` request and observe that it needs a unique `temp-forgot-password-token` and the URL also has it along with `username`, `new-password-1` and `new-password-2` parameters.
2. As we don't have access to the email client for `carlos` but we do have it for `wiener`. Generate a password reset email for `wiener` and copy the `temp-forgot-password-token` from the link and copy that in the repeater request in the URL.

![](./Images/Email%20Client.png)

11. Now, as the URL needs to be a valid one, doesnt matter for which user it is for, but the `temp-forgot-password-token` parameter needs the right parameter if proper valiation is applied. We can change the `username` to `carlos` give a new password, and send the request by removing the token value to see if system let us in or not.

![](./Images/removed%20the%20token%20value%20and%20changed%20username%20to%20carlos%20for%20password%20reset%20final%20request.png)

12. And indeed, there was no validation on the token parameter on server side, resulting in `carlos` user's password being reset.
13. Now login to `carlos: new password` and you will be redirected to `my-account` page.
14. the lab is solved.

## Payloads Used:

## Issues Encountered:

## Solutions/Workarounds:

## Takeaways:
