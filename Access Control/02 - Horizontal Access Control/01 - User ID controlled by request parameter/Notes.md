# LAB: User ID controlled by request parameter

## Given:

- Credentials for user `weiner: peter`.

## Objective:

- Submit the API key of user `carlos`.

## Key Concepts:

- Horizontal Access control is a vulnerability where a user can gain access to resources of another user without getting more prevelages then he has.
- APIs can have no authentication enables. Which means, a user can access the data of another user just by changing request parameters.

## Steps Taken:

1. Load the target website.
2. Proxy the traffic for target website in Burp Proxy.
3. go to my account page.
4. Log in with `weiner:peter`.
5. analyze all the API calls requested when you signed in.
6. Observe that there is an `id` request parameter in the `my-account` API `GET` request.

![](./Images/my-account%20api%20request.png)

7. Send the request to repeater.
8. Change the `id` parameter value to the target user `carlos`.

![](./Images/my-acount%20API%20request%20with%20target%20user%20id.png)

9.  Send the request to server.
10. Observe that API key for user `carlos` is displayed.

![](./Images/Carlos%20API%20key.png)

11. Copy the API key.
12. Click on Submit Solution button.
13. Submit the API key in the prompt.
14. The lab is solved.

## Payloads Used:

```http
GET /my-account?id=carlos HTTP/
```

## Issues Encountered:

- No issues encountered.

## Takeaways:

- Sometimes, the application does not apply authentication to APIs where user can get his information to make sure he cannot access the information of other users.
- Always try to get the data with the `id` of other users.
