# LAB: DOM XSS using web messages and a JavaScript URL

## Objective:

- The objective of the lab is to exploit the open-redirection vulnerability in the lab that is triggered by the `postMessage` API to call a `print()` function.

## Key Concepts:
- **postMessage API:** Enables cross-origin communication between windows or iframes. Vulnerable implementations may allow attackers to control navigation or script execution.
- **Open Redirection via postMessage:** If a script sets `location.href` based on attacker-controlled messages, it can be abused for redirection or XSS.
- **JavaScript URLs:** Using the `javascript:` protocol in URLs allows direct execution of JavaScript code in the browser context.
- **Condition Bypass:** The script checks for `http:` or `https:` in the message. Appending `//http:` to a `javascript:` URL satisfies this check and enables code execution.

## Steps Taken:

1. Load the target website.
2. View the page source code of home page.
3. Observe that there is a script to receive a ``postMessage`` and if the message includes `http:` or `https:` then set the `location.href` to the message value.
![](./Images/script%20on%20home%20page%20source%20code.png)
4. Open the `Exploit Server`.
5. Deliver the following payload to the victim.
6. The lab is solved.
## Payloads Used:
```html
<iframe src="https://0afe0015049064ac81d52b8e001700a3.web-security-academy.net/"
    onload="this.contentWindow.postMessage('javascript:print()//http:','*')">
</iframe>
```
## Payload Explanation

- As the script on target website looks for a post message.
- We can use the Exploit server to deliver an iframe, and in the `onload` event of the iframe, we can call the `postMessage` API to send a message to the target website.
- Now, the script on target site checks if the message contains `http:` or `https:` and sets the `location.href` to the message value.
- As its an href attribute, we can use the `javascript:` URL to execute javascript code.
- Include the``http:`` or ``https:`` in the message and also use ``javascript:print()``
 to call the `print()` method and also fulfil the condition of the script.
- The final message will be `javascript:print()//http:`.
- 
## Issues Encountered:

- I was missing `:` at the end of ``http`` and ``https``. That is why the message never went beyond the condition checks in the script

## Solutions/Workarounds:

- Added the `:` at the end of the ``https`` or ``https`` in the message.

## Takeaways:


- Always review the exact string checks in vulnerable scripts to craft effective payloads.
- The `postMessage` API can be a powerful vector for DOM-based XSS and open redirection if not properly validated.
- Combining protocol checks with JavaScript URLs can bypass naive validation and enable code execution.
