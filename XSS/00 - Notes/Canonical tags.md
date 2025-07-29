# Canonical Tags

## Overview

Canonical tags are HTML elements that help search engines understand which version of a page should be considered the "original" or preferred version, especially when multiple URLs have the same or similar content. They are crucial for SEO to prevent duplicate content issues and to consolidate ranking signals.

## Key Concepts

- **Duplicate Content**: When similar or identical content exists at multiple URLs.
- **Canonical URL**: The "main" or "original" version of a page that search engines should index and rank.
- **SEO Consolidation**: Canonical tags help consolidate link equity and search engine ranking signals.
- **HTML Element**: Implemented using the `<link rel="canonical" href="...">` tag in the `<head>` section.

## Entry Point According to XSS

Canonical tags are **not directly exploitable** through XSS (Cross-Site Scripting), but incorrect handling of dynamic canonical URLs in templating engines (e.g., using unescaped user input in the `href`) could introduce **XSS vectors**. Example risk:

```html
<!-- UNSAFE: Injected via user input -->
<link rel="canonical" href="https://example.com/<script>alert(1)</script>" />
```

#### Mitigation:

- Sanitize and escape dynamic values.
- Never allow user input to directly modify `<head>` metadata without validation.

## Examples

### Basic Usage

```html
<link rel="canonical" href="https://example.com/blog/my-article" />
```

### Multiple URLs, One Canonical

- /product?id=123
- /product/123
- Canonical tag on both:

```html
<link rel="canonical" href="https://example.com/product/123" />
```

### In React

```html
<Helmet>
  <link rel="canonical" href={`https://example.com${location.pathname}`} />
</Helmet>
```

## Vulnerabilities & Exploits

### Notable Issues:

- Open Redirects: If user input can modify the canonical URL and it points to a malicious domain.
- XSS via unescaped attributes: Poor handling of user input inside the `<link />` tag.
- SEO Manipulation: Competitors or bad actors trying to inject or override
  canonical tags to harm your SEO.

## Prevention:

- Validate and encode all dynamic values in canonical tags.
- Use frameworks or sanitization libraries when rendering HTML from user content.
- Monitor for unexpected changes via SEO tools
  or server-side logging.
