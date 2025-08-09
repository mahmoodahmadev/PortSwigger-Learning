# LAB: User ID controlled by request parameter, with unpredictable user IDs

## Given:

- Credentials for user `wiener: peter`.
- Application used GUID (randomly generated id) to get information about a user.

## Key Concepts:

- GUIDs are randomly generated long alphanumeric IDs.
- The applications can reveal the sensitive information about the target user in any page of the website.

## Steps Taken:

1. Load the target website.
2. Proxy the traffic using Burp proxy.
3. View page source code to find `carlos` user id.
4. No clue found.
5. Explore all the posts details page one by one.
6. Observe that there comes a post which is writtern by the user `carlos`.
7. Inspect the `carlos` anchor tag.
8. Observe that the userid is in the `href` attribute.

![](./Images/carlos%20user%20ID.png)

9.  Login with user `wiener: peter`.
10. Now check the API requests in burp proxy for any parameters accepting user ID.
11. Observe that there is a `/my-account` API request which has a request parameter `id` accepting a GUID to show accounts page which holds the API key.
12. Replace the logge in user's API key with the `carlos` user's API key in the request in repeater.
13. Send the request to the server.
14. View the render of the response and you will see that the API key for user `carlos` is displayed.
15. Copy the API key.
16. Click on the Submit Solution button.
17. Submit the API key.
18. Lab is solved.

## Issues Encountered:

- No issue encountered.

## Takeaways:

- Alway explore the full application to see any data belonging to or inlcuded by the target user to get any information about the target user.
- For blog websites, always check if there is any post, comment or any other traces left behind by the target user in the whole application.
