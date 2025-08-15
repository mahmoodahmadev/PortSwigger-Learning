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

3. **Send Request to Intruder:**  
   Capture the `/login` POST request and send it to Burp Suite Intruder.

4. **Configure Intruder Positions:**  
   Mark the username field as the payload position.

5. **Load Username Wordlist:**  
   Insert the provided wordlist of usernames into Intruder.

6. **Execute Sniper Attack:**  
   Use the sniper attack type to brute-force usernames.

7. **Analyze Responses:**  
   Observe the length of all responses. Identify any response with a different length.

8. **Identify Valid Username:**  
   Render the anomalous response and note the error message `Incorrect Password`, indicating a valid username.

   ![](./Images/brute%20force%20username%20result.png)

9. **Note Valid Username:**  
   Record the valid username from the identified request.

10. **Brute-Force Passwords:**  
    Repeat steps 4 to 7, this time marking the password field and using the valid username found earlier.

11. **Analyze Password Responses:**  
    Observe the status codes for each response. Identify the response with a `302` status code, indicating a successful login.

    ![](./Images/bruthe%20force%20pasword%20result.png)

12. **Note Valid Password:**  
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

- Always attempt to brute-force usernames and passwords if the target website does not implement login rate limiting or account lockout mechanisms.
- Pay close attention to differences in server responses, such as length, error messages, and status codes, as these can reveal valid credentials.
- Automated tools like Burp Suite Intruder are invaluable for efficiently identifying authentication
