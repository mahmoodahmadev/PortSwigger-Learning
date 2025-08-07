# robots.txt

## What is `robots.txt`?

- A plain text file placed at the root of a website (e.g., `https://example.com/robots.txt`)
- Provides instructions to web crawlers (bots) about which parts of the site they can or cannot access
- Based on the Robots Exclusion Protocol (REP)
- Not a security mechanism — just a guideline for compliant bots

---

## Syntax of `robots.txt`

- `User-agent`: Identifies the web crawler
- `Disallow`: Specifies which paths are off-limits
- `Allow`: Specifies exceptions to `Disallow`

### Example:

```txt
User-agent: *
Disallow: /admin/
Disallow: /private/
Allow: /public/
```

---

## Why is `robots.txt` Important in Pentesting?

- Can expose hidden or sensitive areas of a web application
- Useful during reconnaissance (information gathering)
- Often misused by developers for "security by obscurity"
- Attackers and pentesters can use it to identify:
  - Admin panels
  - Test or dev environments
  - Backups or hidden scripts

---

## What Pentesters Look For

- Paths that lead to:
  - `/admin/` – Admin login or dashboard
  - `/backup/` – Backup files (`.zip`, `.sql`)
  - `/dev/` or `/test/` – Staging or development environments
  - `/config/` or `/includes/` – Server-side includes or sensitive configs

---

## Example of Risky `robots.txt`

```txt
User-agent: *
Disallow: /admin/
Disallow: /config/
Disallow: /db/
```

- May reveal important structure of the web app
- Encourages attackers to manually access those directories

---

## How to View `robots.txt`

- Use a browser:

  ```
  https://targetsite.com/robots.txt
  ```

- Use curl:
  ```bash
  curl https://targetsite.com/robots.txt
  ```

---

## Common Pentester Use Cases

- Feed discovered paths into tools like:
  - `gobuster`
  - `dirb`
  - `ffuf`
- Manually explore the paths
- Check for hidden functionalities or endpoints

---

## Security Considerations

- Never rely on `robots.txt` to hide sensitive resources
- Anything listed in `robots.txt` is **publicly accessible**
- It **does not prevent** access — only requests bots not to index or crawl
- Attackers do **not** respect `robots.txt`

---

## Summary

- `robots.txt` is a recon treasure for pentesters
- Helps discover hidden paths and weak configurations
- Should **never** be used as a security control
- Always inspect and test URLs listed in `robots.txt`
