# HSTS (HTTP Strict Transport Security) Notes

## What is HSTS?

- **HTTP Strict Transport Security (HSTS)** is a security mechanism that forces web browsers to interact with a site only over HTTPS.
- It protects users from attacks such as:
  - **SSL stripping** (downgrade attacks where HTTPS is forced back to HTTP)
  - **Cookie/session hijacking** over insecure HTTP

## How HSTS Works

1. A user visits a website via HTTPS.
2. The server responds with a special HTTP response header:

   ```
   Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
   ```

3. The browser remembers this policy for the duration of `max-age` (in seconds).
4. During this time, the browser will automatically upgrade any future HTTP requests to HTTPS before they are sent — even if the user types `http://`.

## Example Header

```
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
```

### Meaning of Directives

- `max-age=31536000`: Enforce HTTPS for 1 year (value in seconds)
- `includeSubDomains`: Apply rule to all subdomains
- `preload`: Request inclusion in browser preload lists (built into Chrome, Firefox, Edge, etc.)

## Benefits

- Prevents attackers from downgrading connections to HTTP
- Secures cookies and authentication tokens
- Ensures users always connect over HTTPS, even if they type `http://`

## Limitations

- HSTS works only after the first HTTPS connection (unless the site is on a preload list)
- Misconfiguration can lock you out of your site if HTTPS isn’t working
- Doesn’t protect against other HTTPS issues (expired certificates, weak ciphers, etc.)

## Preload List

- Major browsers maintain an HSTS preload list
- If a site is added to this list, browsers know from the start to enforce HTTPS (no chance for downgrade attacks, even on first visit)
- Submit sites for preload: [https://hstspreload.org](https://hstspreload.org)

## Summary

- HSTS = Strict HTTPS enforcement policy
- Implemented via `Strict-Transport-Security` HTTP response header
- Protects users from SSL stripping & insecure connections

**Best Practices:**

- Use `max-age=31536000` (1 year)
- Add `includeSubDomains`
- Apply for preload in
