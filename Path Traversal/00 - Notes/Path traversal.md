# Path Traversal

## What is Path Traversal?

Path traversal (also known as directory traversal) is a vulnerability that allows an attacker to read arbitrary files on the server running an application. This can expose:

- Application code and data
- Credentials for back-end systems
- Sensitive operating system files

In some cases, attackers may also be able to write to arbitrary files, modify application data or behavior, and potentially take full control of the server.

---

## How Path Traversal Attacks Work

Suppose a shopping application displays images using a URL like:

```html
<img src="/loadImage?filename=218.png" />
```

The backend appends the `filename` parameter to a base directory, e.g. `/var/www/images/`, and reads the file:

```
/var/www/images/218.png
```

If there are no defenses, an attacker can request:

```
https://insecure-website.com/loadImage?filename=../../../etc/passwd
```

This causes the application to read:

```
/var/www/images/../../../etc/passwd
```

The `../` sequence steps up one directory. Three in a row escapes to the root, so the file read is `/etc/passwd` (on Unix). On Windows, both `../` and `..\` work:

```
https://insecure-website.com/loadImage?filename=..\..\..\windows\win.ini
```

---

## Common Obstacles and Bypasses

Many applications try to block path traversal, but these defenses can often be bypassed:

- **Absolute path bypass:** Use a full path like `filename=/etc/passwd`.
- **Nested traversal:** Use sequences like `....//` or `....\/` which revert to `../` if inner sequences are stripped.
- **URL encoding:** Encode or double-encode `../` as `%2e%2e%2f` or `%252e%252e%252f`. Non-standard encodings like `..%c0%af` or `..%ef%bc%8f` may also work.
- **Base folder requirement:** If the filename must start with a base folder, include it then traverse out: `filename=/var/www/images/../../../etc/passwd`.
- **File extension requirement:** If the filename must end with `.png`, use a null byte to terminate: `filename=../../../etc/passwd%00.png`.

> **Tip:** Burp Suite Professional's Intruder has a payload list `Fuzzing - path traversal` with encoded traversal sequences.

---

## Example Labs and Scenarios

- **Simple case:** No defenses, direct traversal works.
- **Traversal sequences blocked:** Use absolute path bypass.
- **Traversal sequences stripped non-recursively:** Use nested traversal.
- **Traversal sequences stripped with superfluous URL-decode:** Use encoded or double-encoded traversal.
- **Validation of start of path:** Include base folder then traverse out.
- **Validation of file extension:** Use null byte bypass.

---

## How to Prevent Path Traversal

The best defense is to avoid passing user input to filesystem APIs. If you must, use two layers of defense:

1. **Validate user input:**
   - Compare input to a whitelist of permitted values, or
   - Ensure input contains only permitted characters (e.g., alphanumeric only)
2. **Canonicalize and check the path:**
   - Append input to the base directory
   - Use a platform filesystem API to canonicalize the path
   - Verify the canonicalized path starts with the expected base directory

**Example (Java):**

```java
File file = new File(BASE_DIRECTORY, userInput);
if (file.getCanonicalPath().startsWith(BASE_DIRECTORY)) {
    // process file
}
```

---

## Further Practice

If you want to practice exploiting path traversal, try the labs in this topic for hands-on experience with different scenarios and defenses.
