# LAB: Multi-step process with no access control on one step

## Given:

- The application implements a multi-step process for changing a user's role, but lacks proper access control on one of the steps.
- Credentials provided:
  - Administrator: `administrator:admin`
  - Regular user: `wiener:peter`

## Objective:

- Log in as `wiener` and escalate your privileges to administrator by exploiting the access control flaw in the multi-step process.

## Key Concepts:

- **Multi-step Process Vulnerabilities:** Applications often split sensitive actions into multiple steps (e.g., initiation and confirmation). If access control is not enforced on every step, attackers may bypass restrictions.
- **Horizontal to Vertical Privilege Escalation:** Exploiting a flaw that allows a regular user to perform actions reserved for administrators, thereby gaining higher privileges.
- **Session Management:** Understanding and manipulating session tokens to replay or forge requests as different users.
- **Professional Security Assessment:** Systematic analysis of all endpoints and steps in sensitive workflows to ensure consistent enforcement of authentication and authorization.

## Steps Taken:

1. **Proxy Setup:**  
   **Launch** the target website in Burp Suite's browser to intercept and analyze all HTTP traffic.

2. **Administrator Actions:**  
   **Log in** as `administrator:admin`.  
   **Navigate** to the admin panel.  
   **Select** any user (other than `wiener`) and **initiate** an upgrade to administrator rights.

   ![](./Images/admin%20panel.png)

3. **Observe Workflow:**  
   **Notice** the application redirects to a confirmation page after initiating the upgrade.  
   **Confirm** the change to complete the process.

   ![](./Images/are%20you%20sure%20page.png)

4. **Analyze Requests:**  
   **Identify** and **send** both the "initiate upgrade" and "confirm upgrade" API requests to Burp Suite Repeater for further testing.  
   **Send** the login request for later use.

5. **Session Switching:**  
   **Log out** and **log in** as `wiener:peter`.  
   **Copy** the session cookie for the `wiener` user.

6. **Privilege Escalation Attempt:**  
   **Replay** the "initiate upgrade" API request using `wiener`'s session—this should fail with an unauthorized response.  
   **Replay** the "confirm upgrade" API request using `wiener`'s session—this step lacks proper access control and returns a `302` status, indicating success.

   ![](./Images/alter%20the%20confirmation%20API.png)

7. **Verification:**  
   **Open** the lab website in the browser as `wiener`.  
   **Confirm** that `wiener` now has administrator privileges and the lab is marked as solved.

## Payloads Used:

```http

// Endpoint

/admin-roles


// query parameters

action=upgrade&confirmed=true&username=wiener
```

## Issues Encountered:

- No issues encountered; the vulnerability was straightforward to exploit once the multi-step process was analyzed.

## Takeaways:

- **Comprehensive Access Control:** Every step in a multi-step process must enforce proper authentication and authorization. Missing checks on any step can lead to privilege escalation.
- **Test All Workflow Steps:** Security assessments should include testing each API endpoint and step in sensitive workflows, not just the initial or final actions.
- **Professional Practice:** Regularly review and audit multi-step business logic for consistent security controls. Use automated tools and manual testing to identify gaps.
- **Security Controls:** Implement server-side access control checks for every sensitive operation, regardless of the process stage or client-side restrictions.
