# Topic: Content Security Policy

## Overview

- A browser security security mechanism.
- restrict the loading of images, scripts allowed from a specific source only.
- Restrict the page loading in iframes.

## Key Concepts

- CSP can be applied using the HTTP response header called
  **Content-Security-Policy** from the server.
- The header value will be one or multiple directives separated by semicolons.
- Use nonce & Hashses to add extra security layer on CSP.

## Entry point

- Many CSPs do allow image tags to make requests. Try **img** tag as POC to
  disclose the **CSRF tokens** from target sites.
- Although chrome blocks dangling markups, raw unencoded new lines, angle
  brackets, you can still use some html to enclose and send the target part

## Example CSP directives

- **script-src 'self'**: It will allow the scripts to be loaded only from the
  same origin as page.
- **script-src https://scripts.normal-website.com**: This directive will allow
  scripts form specified source.

## Vulnerabilities & Exploits

- Use of public sources for scripts/images cna lead to xss.
- XSS can be used using victim's browser through a phising link if CSP is not
  applied properly.

## Mitigations

- Only allow scripts from trusted public CDNs or public sources.
- Use nonce, which are random strings included in the CSP header response each
  time a page load. The scripts must contain the same nonce value or it will not
  be executed. For reference take example no.
- Use hash values of the source content. If the hash value does not match for a
  fetched content, the browser will not accept it. Make sure to update the hash
  when any change is made in the source.

## Useful Resources

- [Same Origin Policy](https://portswigger.net/web-security/cors/same-origin-policy)
- [Evading CSP with DOM-based dangling markup]()

## Personal Notes

- Insights, challenges, or things to remember.

## Examples

### CSP example

```html
Content-Security-Policy: script-src https://scripts.example.com
```

```javascript
<!-- ✅ Allowed -->
<script src="https://scripts.example.com/main.js"></script>

<!-- ❌ Blocked -->
<script src="https://evil.com/xss.js"></script>
```

### NONCE example

```html
Content-Security-Policy: script-src 'nonce-r4nd0m123'
```

```javascript
<!-- ✅ Allowed: Nonce matches -->
<script nonce="r4nd0m123">
  console.log("Safe script");
</script>

<!-- ❌ Blocked: No nonce -->
<script>
  alert("Hacked!");
</script>
```

### HASH example

```html
Content-Security-Policy: script-src
'sha256-vUq+K9aLzRkDw9+q7GcEyZqj4I5oVZ8HlraTu6Dl3R8='
```

```javascript

<!-- ✅ Allowed if hash matches -->
<script>
  console.log("Trusted static script");
</script>


```
