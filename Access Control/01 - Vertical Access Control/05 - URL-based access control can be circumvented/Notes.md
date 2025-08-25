# LAB: URL-based access control can be circumvented

## Given:

- The admin panel page URL is /admin.
- Some frontend system is blocking the access to the URL if user is not an admin.
- The backend application/server supports the `X-Original-URL` header.

## Objective:

- Delete the user `carlos` from admin panel.

## Key Concepts:

- `X-Original-URL` & `X-Rewrite-URL` headers are used by some backend frameworks to override the main URL.

## Steps Taken:

1. Load the target website.
2. Proxy the traffic from the target website to Burp Interceptor.

![](./Images/admin%20panel%20API%20call.png)

3. Add the home page to the Burp repeater.
1. Add an additional header `X-Original-URL` with value of admin panel endpoint `/admin`.

![](./Images/admin%20panel%20access%20denied%20overwrite.png)

2. hit the Send button.
3. The admin panel is accessed.
4. Observe that there is a URL in the `<a>` tag's `href` value of user `carlos`.

![](./Images/href%20value%20in%20user%20carlos%20anchor%20tag.png)

5. Copy the endpoint from there and append next to the `X-Original-URL` header value. The final endpoint will be `/admin/delete`.
6. Append the query to main URL and it will be `/?username=carlos`.

![](./Images/final%20endpoint.png)

7. Send the request.
8. The user `carlos` is deleted.
9. Lab is solved.

## Payloads Used:

```http

POST /?username=carlos HTTP/1.1
X-Original-URL: /admin/deleteUser
```

## Payload explanation:

- Some backend frameworks accept `X-Original-URL` or `X-Rewrite-URL` headers.
- These are non HTTPS standard headers, which can override the original request URL.
- Its like at the time of validation, the server checks the original request URL and when processing the request, it checks the `X-Original-URL` header value.
- This way, the validation is passed.

## Takeaways:

- Always check if the server side application responds to non-HTPP standard headers like `X-Original-URL` or `X-Rewrite-URL` which can override the original request headers.
