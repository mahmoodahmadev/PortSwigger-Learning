# HTTP Basic Authentication – Notes

## What is HTTP Basic Authentication?

- A simple authentication method built into the HTTP protocol.
- Used to protect web resources by requiring a **username and password**.
- Credentials are sent with each request in a special header.

## How It Works (Step by Step)

1. **Client requests a resource** (e.g., `/admin`) without credentials:

   ```http
   GET /admin HTTP/1.1
   Host: example.com

   ```

2. **Server responds with 401 Unauthorized** and a WWW-Authenticate header:

```http
HTTP/1.1 401 Unauthorized
WWW-Authenticate: Basic realm="Restricted Area"
```

3. **Client retries the request**, adding an Authorization header:

```
GET /admin HTTP/1.1
Host: example.com
Authorization: Basic dXNlcm5hbWU6cGFzc3dvcmQ=
```

- The string after `Basic` is:

  ```http
      base64(username:password)
  ```

- Example:

  - Username: `admin`

  - Password: `secret`

  - Combined: `admin:secret`

  - Base64 encoded: `YWRtaW46c2VjcmV0`

So the header becomes:

```http

    Authorization: Basic YWRtaW46c2VjcmV0

```

4. **Server decodes Base64**, checks credentials, and if valid → grants access.

## Key Points to Remember

- **Not encrypted **→ credentials are only Base64 encoded.

-** Always use HTTPS** to secure credentials during transit.

- **Widely supported** (browsers, APIs, tools like Burp Suite, curl, Postman).

- **Less secure** than modern methods (OAuth, JWT, API keys).

#### Example Workflow

1. **Request without credentials:**

```http
GET /dashboard HTTP/1.1
Host: secure.example.com
```

2. **Server challenges:**

```http
HTTP/1.1 401 Unauthorized
WWW-Authenticate: Basic realm="User Area"
```

1. **Request with credentials:**

```http
GET /dashboard HTTP/1.1
Host: secure.example.com
Authorization: Basic dXNlcjpwYXNz
```

Where:

- `user:pass` → Base64 → `dXNlcjpwYXNz`

## Quick Testing Commands

#### Using `curl`

```bash
curl -u username:password https://example.com/protected
```

#### Using Burp Suite

1. Intercept the request.
2. Right-click → Change request method / Edit header.
3. Add manually:

```http
   Authorization: Basic <base64(username:password)>
```

## Summary

- **HTTP Basic Auth** = simplest form of authentication (username + password).

- Implemented via the `Authorization` header.

- Uses **Base64 encodin**g, NOT encryption → must be combined with HTTPS.

- Good for quick protection, but **not secure for modern applications.**
