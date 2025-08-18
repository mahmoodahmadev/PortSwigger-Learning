# LAB: Username enumeration via response timing

## Given:

- The lab demonstrates vulnerabilities related to user enumeration by returning different response.
- A wordlist is provided to facilitate brute-forcing of usernames and passwords.

## Objective:

- Successfully brute-force the login by identifying a valid username and password using the provided wordlists.

## Key Concepts:

- **Username Enumeration:** Identifying valid usernames by analyzing differences in server responses, such as response length, error messages, or status codes.
- **Password Brute-Forcing:** Systematically attempting passwords for a known username until the correct one is found.
- **Response Analysis:** Using tools to compare server responses and identify anomalies that indicate valid credentials.
- **Burp Suite Intruder:** Automating the process of sending multiple payloads and analyzing responses for successful brute-force attacks.

## Steps Taken:

1. **Setup burp proxy**
   To intercept all the requests.

2. **Load the target website**
   in burp proxy configured browser.

3. **Initial Testing:**  
   With Burp running, submit an invalid username and password, then send the POST `/login` request to Burp Repeater. Experiment with different usernames and passwords.

![](./Images/intercept%20the%20login%20request%20with%20found%20credentials.png)

4. **IP Blocking Detection:**  
   Notice that your IP will be blocked if you make too many invalid login attempts.

![](./Images/too%20many%20invalid%20login%20requests.png)

5. **IP Spoofing:**  
   Identify that the `X-Forwarded-For` header is supported, which allows you to spoof your IP address and bypass the IP-based brute-force protection.

![](./Images/request%20intercpeted%20through%20repeater%20with%20long%20invalid%20password.png)

6. **Response Time Analysis:**  
   Continue experimenting with usernames and passwords. Pay particular attention to the response times. When the username is invalid, the response time is roughly the same. When you enter a valid username (your own), the response time increases depending on the length of the password entered.

7. **Intruder Setup:**  
   Send this request to Burp Intruder and select Pitchfork attack from the attack type drop-down menu. Add the `X-Forwarded-For` header.

8. **Payload Positioning:**  
   Add payload positions for the `X-Forwarded-For` header and the username parameter. Set the password to a very long string of characters (about 100 characters).

9. **Payload Configuration:**  
   In the Payloads side panel, select position 1 from the Payload position drop-down list. Select the Numbers payload type. Enter the range 1 - 100 and set the step to 1. Set the max fraction digits to 0 (for IP spoofing).

10. **Username Enumeration Attack:**  
    Select position 2 from the Payload position drop-down list, then add the list of usernames. Start the attack.

11. **Response Time Analysis:**  
    When the attack finishes, at the top of the dialog, click Columns and select the Response received and Response completed options. These two columns are now displayed in the results table.

12. **Identify Valid Username:**  
    Notice that one of the response times was significantly longer than the others. Repeat this request a few times to make sure it consistently takes longer, then make a note of this username.

![](./Images/username%20enumeration%20results.png)

13. **Password Brute-Force Setup:**  
    Create a new Burp Intruder attack for the same request. Add the `X-Forwarded-For` header again and add a payload position to it. Insert the username that you just identified and add a payload position to the password parameter.

14. **Password Attack Configuration:**  
    In the Payloads side panel, add the list of numbers to payload position 1 and add the list of passwords to payload position 2. Start the attack.

15. **Identify Valid Password:**  
    When the attack is finished, find the response with a `302` status. Make a note of this password.

![](./Images/password%20brute%20force%20results.png)

16. **Login and Verification:**  
    Log in using the username and password that you identified and access the user account page to solve the lab.

## Payloads Used:

- Provided wordlists for usernames and passwords.
- Numbers payload for IP spoofing via `X-Forwarded-For`.

## Issues Encountered:

- No issues encountered during the exploitation process.

## Takeaways

- Delays in response more than usual can mean the enumerated credentials might be the right ones.
- The `X-Forwarded-For`, `X-Real-IP` headers can be used to bypass IP-based brute-force protection.
- Response timing analysis is a powerful technique for identifying valid usernames and
