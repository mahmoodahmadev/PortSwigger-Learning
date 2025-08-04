# LAB: DOM XSS using web messages and JSON.parse

## Objective:

- Exploit the web messaging script on victim website and deliver a malicious HTML page on Exploit Server to call the `print()` function.

## Key Concepts:

- **Web Messaging (`postMessage`): API** Allows cross-origin communication between windows or iframes. Vulnerable implementations may process attacker-controlled messages without proper validation.
- **JSON Parsing:** The script expects messages in JSON format and parses them using `JSON.parse`. If the message contains specific keys and values, it triggers navigation.
- **Dynamic URL Assignment:** The script sets the `src` attribute of an `<iframe>` to the value of the `url` key in the received JSON message.
- **JavaScript URLs:** Using the `javascript:` protocol in the `url` value allows direct execution of JavaScript code in the browser context.

## Steps Taken:

1. Load the target website.
2. View the page source code.
3. Observe that there is a web message script, which receives a json, and if the `type` key of json has value `load-channel`, it will set the `url` key value of the json message to the src attribute of an `<iframe>` tag.
   ![](./Images/script%20on%20home%20page%20source%20code.png)
4. Open the Exploit Server.
5. Paste the

## Payloads Used:

```html
<iframe
  src="https://0ae40067039950b880e9036b00b9004b.web-security-academy.net/"
  onload='this.contentWindow.postMessage(" { \"type\" : \"load-channel\" , \"url\" : \"javascript:print()\" }","*")'
>
</iframe>
```

## Payload Explanation:

- As the target website listens for a web message that should be in a json format. Our initial payload would be `<iframe src='target-website' onload='this.contentWindow.postMessage("{}","*")' />`.
- We need to set the href value to a javascript: URL and to target that, we have to set the url key to script `javascript:print()`.
- The href value will only be set when a key ``type` has value `load-channel` in the message json.
- Change the message json accordingly to `{ "type":"load-channel","url":"javascript:print()"}`

## Issues Encountered:

- Issue understanding the iframe definition where scripts define the `iframe`, `ACMEplayer` and declare the `d` variable.

## Solutions/Workarounds:

- Used ChatGPT to analyze and clarify the script's behavior and the required message format.

## Takeaways:

- Always analyze the expected message format and required keys/values for web messaging vulnerabilities.
- Targeting `src` or `href` attributes with `javascript:` URLs can lead to code execution if not properly validated.
- JSON-based message handling can be abused if the script trusts attacker-controlled input.
- Browser behavior with `javascript:` URLs allows direct execution of code, not navigation.
