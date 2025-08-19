# LAB: Username enumeration via account lock

## Given:

- The lab is vulnerable to username enumeration.
- User accounts will be locked after several invalid login attempts.
- Lists of candidate usernames and passwords are provided.

## Objective:

- Enumerate a valid username.
- Brute-force the user's password and login.

## Key Concepts:

- **Username Enumeration via Account Lock:** Detecting valid usernames by observing changes in error messages or account lock notifications after repeated failed login attempts.
- **Account Lockout Mechanism:** Security feature that locks user accounts after a set number of failed login attempts, which can inadvertently reveal valid usernames.
- **Response Analysis:** Comparing server responses to identify differences that indicate valid usernames or successful logins.
- **Burp Suite Intruder:** Automating login attempts and analyzing responses for enumeration and brute-force attacks.
- **Clusterbomb and Sniper Attacks:** Intruder attack types used for testing multiple payload combinations and single payload lists, respectively.

## Steps Taken:

1. **Setup burp proxy** to log and intercept the requests.
2. **Load the target website** in a Burp proxy-configured browser.
3. **Initial Login Attempts:**  
   Attempt to log in with invalid credentials repeatedly to observe error messages.
4. **Error Observation:**  
   Notice that no error is shown for non-existent users, indicating possible username enumeration.
5. **Send `/login` request to Burp Intruder:**  
   Prepare to automate login attempts.
6. **Configure Payloads:**  
   Add username and password fields as payload positions.
7. **Load Username List:**  
   Copy the provided username list into the username payload.
8. **Test Account Lock Limit:**  
   Use random values (e.g., null payloads) for the password and set the number of attempts to match the suspected account lock threshold (e.g., 5 attempts per username).
9. **Grep Error Message:**  
   Set up grep for the error message `Invalid username or password.` to help identify changes in responses.

   ![](./Images/Enumeration%20result%20%20for%20username.png)

10. **Start Clusterbomb Attack:**  
    Run the attack to test multiple combinations.
11. **Analyze Responses:**  
    Identify responses that do not contain the standard error message, indicating a valid username.

    ![](./Images/differene%20in%20response%20length.png)

12. **Account Lock Confirmation:**  
    Render the response and confirm the presence of an account locked message, verifying the username is valid.

    ![](./Images/Different%20error%20message.png)

13. **Password Brute-Force:**  
    Attack the `/login` endpoint with a sniper attack using the valid username and the candidate password list.
14. **Response Length Analysis:**  
    Observe the response lengths and identify the response that lacks any error message, indicating a successful login.

    ![](./Images/Password%20brute%20force%20result%20with%20different%20response%20length.png)
    ![](./Images/No%20account%20lock%20message.png)

15. **Login Verification:**  
    Log in to the application with the identified username and password.

    ![](./Images/Logged%20in%20successfully.png)

16. **Lab Completion:**  
    Confirm successful login and that the lab is solved.

## Payloads Used:

- Provided lists of candidate usernames and passwords.
- Null/random values for password field during enumeration.
- Grep for error messages to assist in response analysis.

## Issues Encountered:

- Account lockout mechanism may slow down brute-force attempts.
- Need to carefully analyze response messages and lengths to identify valid usernames and passwords.

## Solutions/Workarounds:

- Use clusterbomb attack to test multiple usernames and passwords efficiently.
- Grep for specific error messages and analyze response lengths to pinpoint valid credentials.
- Use sniper attack for targeted password brute-forcing once a valid username is identified.

## Takeaways:

- Account lockout mechanisms can inadvertently aid in username enumeration if error messages differ for valid and invalid usernames.
- Careful response analysis is crucial for identifying valid usernames and passwords.
- Automated tools like Burp Suite Intruder are essential for efficient enumeration and brute-forcing.
- Always test for logic flaws in authentication and account lockout implementations
