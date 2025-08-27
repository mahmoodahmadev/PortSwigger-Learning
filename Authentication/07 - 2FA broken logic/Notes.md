# LAB: 2FA broken logic

## Given:

- The lab is vulnerable to 2FA authentication flawed logic.
- Provided credentials `wiener: peter`.
- Provided target user's username `carlos`.
- Access to Email server to receive security code.

## Objective:

## Key Concepts:

## Steps Taken:

1. Proxy the target website traffic through Burp suite to log and intercept the requests.
2. Load the target website
3. Login with `wiener: peter`.
4. The system will ask for a security code after logging in with credentials.

![](./Images/Security%20code%20verification%20page.png)

5. Use the provided Email server to get the security code for `wiener`.

![](./Images/Email%20Client%20.png)

6. Now as the log in is completed, go to site map in burp suite for the target website.
7. Send all the login related requested to repeater. These requests will be
   1. POST /login
   2. GET /login2
   3. POST login2

![](./Images/Site%20map.png)

8. The 1st request seems normal, requiring credentials, as we dont have password for `carlos` so move forward to next requests.
9. 2nd request is used to generate the security code for the user specified in `verify` cookie.
10. Try to remove the session cookie and see if its required or not as we dont have session cookie for `carlos`.
11. Sending the 2nd request without session gives us 302 indicating another vulnerability.
12. We can generate the security code for `carlos` through 2nd request as it does not required session.
13. Send the 2nd request with `verify=carlos` to generate a security code for `carlos`.

![](./Images/get%20security%20code%20page%20for%20carlos%20user.png)

14. Moving to 3rd request, which sends the security code value along with 2 cookies
    1. verify=username
    2. session=value
15. We can again try to see if this one also requires user session cookie or not, and indeed it doesnt. Which is another vulnerability in itself.
16. Change the `verify` cookie value to `carlos` and send mulitple requests to see if there is any request limits implemented.
17. There seems to be no limit to invalid security code submisson attempts which is also a vulnerability and means we can brute force this security code.

![](./Images/get%20security%20code%20page%20for%20carlos%20user.png)

18. Send the request to intruder and setup the brute force for 4 digit security code as we saw while loggin in with `wiener` that the security code is of length 4 and only include digits.

![](./Images/configuring%20brute%20force%20attack%20to%20find%20mfa%20code.png)

19. This will be a 10000 request combinations, as we start the sniper attack on it.
20. Analyzing the results, we get a response with 302 response.
21. check the response of that request and boom! we got session cookie for user `carlos`.

![](./Images/got%20session%20for%20user%20carlos%20.png)

22. Change the browser's URL to endpoint `/my-account` while intercpeter is on.

![](./Images/Change%20id%20to%20carlos.png)

23. replace the session value with the one we got.
24. The `carlos` user is logged in and is able to access the `/my-account` page.
25. The lab is solved.

## Payloads Used:

## Issues Encountered:

## Solutions/Workarounds:

## Takeaways:
