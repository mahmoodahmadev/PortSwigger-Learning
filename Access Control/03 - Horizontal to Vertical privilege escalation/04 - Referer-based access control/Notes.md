# LAB: Referer-based access control

## Given:

- The application implements access control for certain administrative features based on the `Referer` HTTP header, rather than robust authentication and authorization mechanisms.
- Credentials provided:
  - Administrator: `administrator:admin`
  - Regular user: `wiener:peter`

## Objective:

- Exploit the flawed access control to promote the user `wiener` to administrator by manipulating the `Referer` header.

## Key Concepts:

- **Referer-based Access Control:** Relying on the `Referer` header for access control is insecure, as this header can be easily manipulated by an attacker. Proper access control should always be enforced server-side based on user roles and authentication.
- **Privilege Escalation:** Gaining higher privileges (e.g., administrator) by exploiting weaknesses in access control mechanisms.
- **Session Management:** Using valid session tokens to impersonate users and replay requests.
- **Professional Security Testing:** Systematic analysis of all access control mechanisms, including those based on HTTP headers, to identify and exploit weaknesses.

## Steps Taken:

1. **Proxy Setup:**  
   **Load** the target website in Burp Suite's browser to intercept and analyze all HTTP traffic.

2. **Administrator Actions:**  
   **Log in** as `administrator:admin`.  
   **Navigate** to the admin panel.  
   **Upgrade** any user other than `wiener` to administrator to observe the workflow and capture relevant requests.

3. **Request Analysis:**  
   **Open** Burp Suite's Site Map and **identify** the `/admin` and `/admin-roles` endpoints.  
   **Send** these requests to Burp Suite Repeater for further testing.

   ![](./Images/site%20map.png)

4. **Session Switching:**  
   **Log out** and **log in** as `wiener:peter`.  
   **Copy** the session cookie for the `wiener` user.

5. **Privilege Escalation Attempt:**  
   **Send** requests to `/admin` and `/admin-roles` using `wiener`'s session value in Repeater.  
   **Modify** the `Referer` header in the `/admin-roles` request to `https://[siteURL]/admin`.  
   **Observe** that the response returns a `302` status, indicating the privilege escalation was successful.

   ![](./Images/alter%20the%20request.png)

6. **Verification:**  
   **Access** the admin panel as `wiener` to confirm administrator privileges.  
   **Confirm** that the lab is marked as solved.

## Payloads Used:

```http
GET /admin-roles?username=wiener&action=upgrade HTTP/2
Host: [siteURL]
Cookie: session=[wiener_session_cookie]
Referer: https://[siteURL]/admin
```

## Payload Explanation:

- The application checks only the `Referer` header to determine if the request is coming from the admin page, rather than verifying the user's actual privileges.
- By setting the `Referer` header to the admin page URL, a non-admin user can perform administrative actions, such as upgrading their own account.

## Issues Encountered:

- Unable to access the admin panel directly as a non-admin user, even with a forged `Referer` header.

## Solutions/Workarounds:

- This is expected, as the admin panel itself is protected by authentication, but the vulnerable endpoint `/admin-roles` relies solely on the `Referer` header

## Takeaways:

- **Server-side authentication:** Always set server side authentications for all the endpoints and do not depend on the `referer` header.
- **Test all administrative endpoints:** For weak access controls, especially those that rely on HTTP headers or other client-controlled data.\*\*
- **Professional Practice:** Regularly audit access control mechanisms and ensure that sensitive actions require proper authentication and authorization checks on the server.
- **Security Controls:** Implement robust role-based access control (RBAC) and avoid using easily manipulated headers for security decisions.
