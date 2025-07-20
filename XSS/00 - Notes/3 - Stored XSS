# Stored Cross-Site Scripting (Stored XSS)

## What Is Stored Cross-Site Scripting?

- Stored cross-site scripting (also known as persistent or second-order XSS) occurs when:

  - An application receives input from an untrusted source.

  - That input is stored and later embedded into HTTP responses without proper sanitization.

- Example Scenario

  - A user submits a comment:

    ```html
    POST /post/comment HTTP/1.1 Host: vulnerable-website.com Content-Length: 100
    postId=3&comment=This+post+was+extremely+helpful.&name=Carlos+Montoya&email=carlos%40normal-user.net
    ```

- This data appears directly in the response:

  ```html
  <p>This post was extremely helpful.</p>
  ```

- An attacker submits a malicious comment:

<script>/* Bad stuff here... */</script>

- Encoded as:

  ```html
  comment=%3Cscript%3E%2F*%2BBad%2Bstuff%2Bhere...%2B*%2F%3C%2Fscript%3E
  ```

- Resulting output:
  ```html
  <p>
    <script>
      /* Bad stuff here... */
    </script>
  </p>
  ```
- The script executes in the browser of any user who views the page.

## Impact of Stored XSS Attacks

- Attackers can control scripts executed in the victim's browser.

- They can steal cookies, hijack sessions, perform actions on behalf of users, etc.

## Key Differences from Reflected XSS

- Stored XSS payloads persist in the application.

- No need to trick users into making a special request.

- Automatically affects users who access the vulnerable page.

- More reliable for attacking users who are logged in.

## Stored XSS in Different Contexts

- The location where stored data appears affects:

  - The payload format needed

  - The impact of the attack

- Application validation or processing may also alter what payloads can be used.

## How to Find and Test for Stored XSS

### Using Automated Tools

    - Many stored XSS issues can be found with Burp Suite's vulnerability scanner.

### Manual Testing Overview

- Stored XSS testing involves finding links between:

- Entry points: where attacker-controlled input enters the application.

- Exit points: where stored data is later reflected in application responses.

- Common Entry Points

  - URL query parameters

  - Request bodies

  - URL file paths

  - HTTP headers

  - Out-of-band sources:

    - Emails (for webmail apps)

    - Third-party content (tweets, feeds)

    - External data (news aggregators)

- Exit Points

  - Any HTTP response returned to any user, in any context.

### Testing Strategy

- Map Entry → Exit Links

  - Identify connections where submitted input appears in future responses.

- Submit Unique Values

  - Inject identifiable test strings into each entry point and monitor for them in responses.

- Focus on Likely Vectors

  - Prioritize:

    - Blog comments

    - User profiles

    - Recent searches

    - Audit logs

## Differentiate Stored vs Reflected

- Confirm the value appears in responses to later requests, not just the initial response.

- Detecting Vulnerabilities

- Once a data flow link is identified:

  - Determine the output context (HTML, attribute, script, etc.).

  - Inject context-specific XSS test payloads.

  - If the payload is rendered without modification, a stored XSS vulnerability exists.

- This testing process is very similar to reflected XSS once the injection point is found.
