## How to Find and Test for Reflected XSS Vulnerabilities

### Automated Testing

    Use Burp Suite Scanner
    The majority of reflected XSS vulnerabilities can be quickly and reliably discovered using Burp Suite's web vulnerability scanner.

### Manual Testing Steps

1.  Test Every Entry Point

    Identify and test every possible input in the application’s HTTP requests:

    - URL query strings

    - Message body parameters

    - URL file paths

    - HTTP headers (Note: header-based XSS is often non-exploitable)

2.  Submit Random Alphanumeric Values

    - For each entry point, submit a unique random alphanumeric string.

    - Requirements:

      - Short (to bypass basic validation)

      - Alphanumeric (to survive filtering)

      - Long enough (~8 characters) to avoid accidental response matches

    - Tools:

      - Use Burp Intruder with number payloads (e.g. random hex values)

      - Use Burp Intruder's grep settings to detect reflected values in responses

3.  Determine the Reflection Context

    - For every reflection found, analyze its context:

      - Inside HTML content?

      - Inside an HTML attribute? (quoted/unquoted)

      - Inside a JavaScript string?

      - Inside script or style tags?

    - This determines which payload types might work

4.  Test a Candidate XSS Payload

    - Based on the context, insert a suitable test payload that triggers JavaScript execution if unfiltered

    - Process:

      - Send the request to Burp Repeater

      - Insert the payload before/after the original random string

      - Set the random value as the search term in the response to easily find reflections

      - Example payload:

        -<script>alert(document.domain)</script>

5.  Test Alternative Payloads

    - If the first payload is blocked or modified, try other techniques:

      - Context-specific encoding

      - Using event handlers (onerror=...)

      - JavaScript URI schemes (javascript:)

      - Obfuscated or broken-up scripts

    - Refer to a comprehensive XSS context guide to adapt payloads effectively

6.  Test in a Browser

    - If the payload appears to work in Burp, validate it in a real browser:

      - Paste the attack URL directly into the browser’s address bar

      - Or modify the request using Burp Proxy Intercept

      - Use a simple script to verify:

      - alert(document.domain)

      - A visible popup confirms successful JavaScript execution

### Summary Checklist

- Identify all input points (URL, body, headers)

- Inject unique random alphanumeric value

- Detect reflected values in the response

- Analyze reflection context

- Craft and inject context-appropriate payload

- Try alternative payloads if needed

- Verify success in a real browser
