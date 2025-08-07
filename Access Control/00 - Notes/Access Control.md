
# Access Control Vulnerabilities and Privilege Escalation

## What is Access Control?

Access control is the process of defining **who or what is allowed** to access or perform actions on specific resources.

### It involves:
- **Authentication**: Verifying the user's identity.
- **Session Management**: Maintaining the identity across requests.
- **Access Control**: Deciding whether the authenticated user is authorized for the requested action.

---

## Access Control Vulnerabilities

Broken access control occurs when users can perform actions they shouldn't be allowed to.

### Types of Access Control

#### 1. **Vertical Access Control**
- Restricts access to **functions** based on user roles.
- Example: Admins can delete users; normal users cannot.

#### 2. **Horizontal Access Control**
- Restricts access to **resources** based on ownership.
- Example: A user can only view their own bank account, not others'.

#### 3. **Context-Dependent Access Control**
- Access depends on **application state** or **workflow**.
- Example: Modifying a shopping cart is disabled after payment.

---

## Examples of Broken Access Controls

### Vertical Privilege Escalation
- A lower-privileged user gains **admin-level access**.
- **Example**:
  ```text
  User accesses: https://insecure-website.com/admin
  ```

### Unprotected Functionality
- Sensitive URLs are not protected.
- **Example**:
  ```text
  Found via: https://insecure-website.com/robots.txt
  ```

- Even obfuscated URLs like:
  ```text
  https://insecure-website.com/administrator-panel-yb556
  ```
  can be discovered via:
  - JavaScript files
  - Wordlist brute-forcing

### Parameter-based Access Control
- Role stored in:
  - Query parameters
  - Cookies
  - Hidden fields
- **Examples**:
  ```text
  https://insecure-website.com/login/home.jsp?admin=true
  https://insecure-website.com/login/home.jsp?role=1
  ```

### Platform Misconfiguration
- Access control enforced via platform config can be bypassed.
- **Example (header injection)**:
  ```http
  POST / HTTP/1.1
  X-Original-URL: /admin/deleteUser
  ```

- **HTTP method bypass**: GET instead of POST might work.

### URL-Matching Discrepancies
- Case sensitivity:
  ```text
  /ADMIN/DELETEUSER vs /admin/deleteUser
  ```
- Trailing slash:
  ```text
  /admin/deleteUser/ vs /admin/deleteUser
  ```
- Spring's `useSuffixPatternMatch` allows:
  ```text
  /admin/deleteUser.anything
  ```

---

## Horizontal Privilege Escalation

User accesses another user's data.

### IDOR (Insecure Direct Object Reference)
- Access resource by changing `id` in URL:
  ```http
  https://insecure-website.com/myaccount?id=456
  ```

### GUIDs are not always safe
- Even unpredictable IDs can be leaked in:
  - Messages
  - Reviews
  - Links

### Data leakage in redirects
- Redirects might leak sensitive data even if access is denied.

---

## Horizontal to Vertical Escalation

- Gain access to a user with higher privileges (like admin).
- If attacker accesses:
  ```http
  https://insecure-website.com/myaccount?id=456
  ```
  and it's an admin account, sensitive data or functionality might be exposed.

---

## IDOR Explained

- Application uses user input to access internal objects directly.
- If not verified properly, attacker can tamper with input.

---

## Access Control in Multi-Step Processes

- Important actions done in multiple steps.
- If one step lacks access control, attacker can jump directly to it.

### Example:
1. Load user edit form
2. Submit changes
3. Confirm changes 

Attacker skips steps 1 and 2, jumps to 3.

---

## Referer-Based Access Control

- System checks the `Referer` header to allow access.
- **Bypass**: Attacker forges request with fake Referer header.

---

## Location-Based Access Control

- Access restricted based on geolocation.
- **Bypass**:
  - VPNs
  - Proxies
  - Manipulating browser geolocation

---

## Preventing Access Control Vulnerabilities

Follow these best practices:

- Don't rely on obscurity (e.g., hiding URLs).
- Deny access by default unless explicitly allowed.
- Use a centralized access control mechanism.
- Enforce access policies at the code level.
- Regularly test and audit access controls.

---

## Practice Labs (Recommended)

- Unprotected admin functionality
- Parameter-based role control
- URL/header-based access control bypass
- IDOR vulnerabilities
- Multi-step flow exploitation

> Practice helps build real-world understanding of access control attacks.

---