# LAB: Username enumeration via different responses

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

1. **Proxy Setup:**  
   Proxy browser traffic through Burp Suite to intercept and analyze requests.

2. **Access Target:**  
   Load the target website and navigate to the login page.

3. Login with the provided user `wiener; peter` and check the response time in browser to get a general idea of how much time the login can take for valid credentials.

![](./Images/successful%20login%20response%20time.png)

4. **Send Request to Intruder:**  
   Capture the `/login` POST request and send it to Burp Suite Intruder.

5. **Configure Intruder Positions:**  
   Mark the username field as the payload position.

6. **Load Username Wordlist:**  
   Insert the provided wordlist of usernames into Intruder.

7. **Execute Sniper Attack:**  
   Use the sniper attack type to brute-force usernames.

8. **Analyze Responses:**  
   Observe the response time and see which response is taking more time than required for a failed attempt.

9. **Identify Valid Username:**  
   Render the anomalous response and note the error message `Incorrect Password`, indicating a valid username.

   ![]()

10. **Note Valid Username:**  
    Record the valid username from the identified request.

11. **Brute-Force Passwords:**  
    Repeat steps 4 to 7, this time marking the password field and using the valid username found earlier.

12. **Analyze Password Responses:**  
    Observe the status codes for each response. Identify the response with a `302` status code, indicating a successful login.

![]() 12. **Note Valid Password:**  
 Record the password from the successful request.

13. **Login to Application:**  
    Use the valid username and password to log in via the browser.

14. **Verify Success:**  
    Confirm that the user is logged in and the lab is solved.

## Payloads Used:

- Provided wordlists for usernames and passwords.

## Issues Encountered:

- No issues encountered during the exploitation process.

## Takeaways

- Delays in response more than usual can mean the enumerated credentials might be the right ones.
