# LAB: DOM XSS using web messages

## Objective:

- Exploit a DOM-based web message vulnerability to call the `print()` method on the target website by leveraging insecure message handling and DOM injection.

## Key Concepts:

- `Web messages:` Mechanism for communication between browser windows, iframes, tabs, and popups using postMessage.
- `Iframes:` Used to embed and interact with other web pages, and to send cross-origin messages.
- `Eval() method:` Sometimes used in vulnerable scripts, but in this lab, the focus is on DOM injection via innerHTML.
- `DOM injection:` Directly inserting attacker-controlled data into the DOM, especially via `innerHTML`.

## Steps Taken:

1. Load the target website.
2. View page source code.
3. Observe that there is a script which listens for a web message and paste the message content without any sanitization to the DOM using innerHTML method.
   ![](./Images/script%20on%20home%20page%20source%20code.PNG)
4. Open the Exploit Server.
5. Paste the following paylaod and deliver to the victim.
6. The lab is solved.

## Payloads Used:

```javascript
<iframe
  src='https://0a4100f004b7a01c80815317000500c7.web-security-academy.net/'
  onload="this.contentWindow.postMessage(
  '<img src=0 onerror=print()>',
  'https://0a4100f004b7a01c80815317000500c7.web-security-academy.net/'
);"
></iframe>
```

## Payload Explanation

- As I have mentione in the [Web Messages Notes](./../00%20-%20Notes/Web%20Messages.md) web messages are used to communicate between browser contents, like:
  - From iframe to src website
  - From parent to child Iframe.
  - Between a popup and its opener.
  - Betweem different tabs.
- We can use an iframe to send a malicious message to the target site.
- And deliver a phishing link to a victim so that as soon as he opens the link, the iframe, which will be showing the target website, will generate a web message to the target website.
- The messag will include a malicious payload, and XSS will be achieved.
- As can be seen in the paylaod, I have send a web message from iframe to its child content(website) using `this.contentWindow.postMessage('message'. 'origin')`.
- As soon as the target website opens, the message is sent to it.
- The target website, directly appends the message to a DOM element using `innerHTML`.
- `innerHTML` does not allow internal scripts using script tags, but supports inline script execution.
  Therefore, I used `<img src=0 onerror=print()>` payload.
- As soon as this is rendered in the target element, the `print()` method will be called.

## Issues Encountered:

- Initially unsure how to send a message from an iframe to its child content using JavaScript.

## Solutions/Workarounds:

- Used ChatGPT for guidance and explored VS Code's autocomplete and documentation to understand the usage of `postMessage` and related APIs.

## Takeaways:

Web messages are a powerful vector for injecting arbitrary JavaScript code into a website if not properly handled.
Always validate and sanitize message content before inserting it into the DOM.
Using `innerHTML` with untrusted data is dangerous and can lead to XSS vulnerabilities.
