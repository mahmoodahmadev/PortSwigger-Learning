# LAB: User Role Controlled by Request Parameter

## Objective

- Gain access to the `/admin` page by manipulating a cookie value, then delete the user `Carlos` while logged in as `wiener:peter`.

---

## Key Concepts

- **Privilege Escalation via Cookies:** Some applications use cookies to store user roles or privileges. If these values are not securely validated server-side, they can be manipulated to escalate privileges.
- **Parameter Tampering:** Modifying request parameters (including cookies) to test for insecure access controls.
- **Burp Suite Proxy:** Essential for intercepting and modifying HTTP requests and cookies.

---

## Steps Taken

1. **Load the Target Website:** Open the lab environment.
2. **Login:** Go to the account page and log in as `wiener:peter`.
3. **Intercept Requests:** Use Burp Suite Proxy to capture HTTP requests.
4. **Navigate to `/admin`:** Attempt to access the admin panel.
   ![](./Images/admin%20page%20request%20in%20burp%20proxy.png)
5. **Modify Cookie:** In the intercepted request, change the cookie value from `admin=false` to `admin=true`.
   ![](./Images/admin%20cookie%20in%20request.png)
6. **Forward the Request:** Send the modified request to the server.
7. **Access Granted:** The `/admin` panel becomes accessible due to the forged cookie value.
   ![](./Images/admin%20panel%20.png)
8. **Delete User:** Use the admin panel to delete the user `Carlos`.
9. **Lab Solved:** The objective is complete.

---

## Payloads Used

```http
Cookie: admin=true
```

---

## Issues Encountered

- No issues encountered during the exploitation process.

---

## Takeaways

- **Always inspect cookies** for privilege or role indicators; they may be vulnerable to tampering.
- **Never trust client-side data** for access control decisions—always validate privileges server-side.
- **Burp Suite** is invaluable for identifying and exploiting insecure direct object references and privilege escalation vulnerabilities.
- **Simple manipulations** like changing a boolean value in a cookie can sometimes lead to full admin access if the application is not securely