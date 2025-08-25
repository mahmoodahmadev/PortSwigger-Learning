# LAB: Brute-forcing a stay-logged-in cookie

## Given:

- The user can stay logged in using the browser session.
- The cookie providing log in stay is vulnerable.
- Provided credentials `wiener: peter`.
- Victim username is `carlos1.
- Proviced list of canidate passwords.

## Objective:

- Brute force `carlos` cookie to login.

## Key Concepts:

## Steps Taken:

1. Proxy the browser traffic through Burp suite.
2. Load the target website
3. Login with `wiener: peter` and check the stay logged in checkbox.
4. Send the `POST` `/login` request to repeater.
5. Observe that the respone contains 2 cookies:
   1. `session`
   2. `stay-logged-in`
6. Remove the `session` cookie value and navigate to `/my-account` page to see if this cookie is required or not and its not. Which means, the main cookie is `stay-logged-in` which let's the user to stay logged in even afte exiting the browser.
7. Examine the cookie value.
8. Try to decode it as it includes `A-Z a-z 0-9 + /` so might be its a base64 encoded.

![](./Images/decoding%20the%20stay-logged-in%20cookie%20value.png)

9.  And indeed it is and we get `wiener: alphanumeric string`.
10. Try to decrypt the later part of the decoded cookie and we find that its `md5` hash of the password of the user `wiener`.

![](./Images/decrypting%20the%20alphanumeric%20part%20of%20session.png)

11. Send the request to Intruder.
12. Paste the candidate passwords list in the payload configuration.
13. Process the payload to first encrypt the p assword to `MD5` format and then add a prefix `carlos:` and then `base64` encode the whole string.

![](./Images/intruding%20with%20md5%20hashes%20of%20base64%20values%20of%20given%20password%20list.png)

14. Start the `sniper attack` on `/my-account` endpoint.
15. Analyse the attack results that there was a processed password which returned 200 status code and see that we are able to access `carlos`s `/my-account` page.

![](./Images/found%20the%20cookie%20which%20successfully%20get%20us%20into%20my%20account%20page.png)

16. Copy the cookie value and send a request to `/my-acount` page with this `stay-logged-in` cookie value.

![](./Images/send%20a%20request%20to%20my-account%20page%20using%20the%20found%20cookue.png)

17. You will see that the lab is solved.

## Payloads Used:

## Issues Encountered:

## Solutions/Workarounds:

## Takeaways:
