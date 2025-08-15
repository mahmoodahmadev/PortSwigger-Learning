# LAB: Username enumeration via subtly different responses

## Given:

- The target website is subtly vulnerable to username enumeration.

## Objective:

- Enumerate a valid username and brute-force through a list of password wordlists to login with the username.

## Key Concepts:

- **Subtle Username Enumeration:** Identifying valid usernames by detecting minor differences in error messages or server responses.
- **Password Brute-Forcing:** Systematically attempting passwords for a known username until the correct one is found.
- **Response Analysis:** Using tools to compare server responses and identify anomalies that indicate valid credentials.
- **Burp Suite Intruder:** Automating the process of sending multiple payloads and analyzing responses for successful brute-force attacks.

## Steps Taken:

- **Load the target website.**

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

6. **Grep the General Error:**  
   Set up grep for the general error message `Invalid username and password.`.

![](./Images/general%20error%20message.png)

7. **Execute Sniper Attack:**  
   Use the sniper attack type to brute-force usernames.

8. **Analyze Responses:**  
   Observe the grep results and identify the response where the mentioned error message is not found.

![](./Images/Enumerated%20username%20results.png)

9. **Identify Valid Username:**  
   Render the anomalous response and note that there is no dot `.` at the end of the error message.

![](./Images/slightly%20different%20error%20message.png)

![](./Images/brute%20force%20username%20result.png)

10. **Note Valid Username:**  
    Record the valid username from the identified request.

11. **Brute-Force Passwords:**  
    Repeat steps 4 to 7, this time marking the password field and using the valid username found earlier.

12. **Analyze Password Responses:**  
    Observe the status codes for each response. Identify the response with a `302` status code, indicating a successful login.

![](./Images/Brute%20forced%20password%20results.png)

    ![](./Images/bruthe%20force%20pasword%20result.png)

13. **Note Valid Password:**  
    Record the password from the successful request.

14. **Login to Application:**  
    Use the valid username and password to log in via the browser.

15. **Verify Success:**  
    Confirm that the user is logged in and the lab is solved.

## Payloads Used:

- Provided wordlists for usernames and passwords.

## Issues Encountered:

- No issues encountered during the exploitation process.

## Takeaways:

- Always check for exact error message content, as sometimes the error message for invalid login credentials can be slightly changed, revealing valid usernames.
- Subtle differences in server responses can be leveraged for effective username enumeration and brute
