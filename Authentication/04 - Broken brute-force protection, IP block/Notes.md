# LAB: Broken brute-force protection, IP block

## Given:

- There is a logical flaw in the target lab's login feature.
- Provided credentials: `wiener:peter`.
- Victim user: `carlos`.
- Passwords list is provided.

## Objective:

- Brute-force the password list and log in to the user account `carlos`.

## Key Concepts:

- **Brute-force Protection:** Mechanisms designed to prevent automated guessing of credentials, such as account lockouts or IP blocking.
- **Logical Flaws in Rate Limiting:** Weaknesses in how login attempt limits are enforced, allowing attackers to bypass protections.
- **Payload Manipulation:** Crafting username and password lists to avoid triggering brute-force defenses.
- **Burp Suite Intruder:** Automating login attempts and analyzing responses to identify valid credentials.
- **Pitchfork Attack:** A Burp Intruder attack type that allows simultaneous iteration through multiple payload lists.

## Steps Taken:

1. **Proxy Setup:**  
   Proxy the target website in Burp Suite to log and intercept requests.

2. **Initial Login Attempts:**  
   Attempt to log in as `carlos` with random passwords from the provided list.  
   Observe that after several failed attempts, an error message appears for too many requests.

   ![](./Images/valiadation%20for%20too%20many%20attempts.png)

3. **IP Spoofing Attempt:**  
   Add the `X-Forwarded-For` header to the login request.  
   Observe that the application does not accept this header for IP-based rate limiting.

   ![](./Images/header%20not%20accepted.png)

4. **Logic Flaw Discovery:**  
   Log in with a valid username (`wiener`) before exceeding the failed login limit.  
   Notice that this resets the invalid login attempt counter, allowing further brute-force attempts.

5. **Payload Preparation:**  
   Use a Python script to generate two files:

   - `usernames.txt`: Inserts the `wiener` username after every two entries to avoid exceeding invalid login limits.
   - `passwords.txt`: Contains all passwords, mapping the correct password for `wiener` (`peter`).

6. **Intruder Configuration:**  
   Send the `/login` POST request to Burp Suite Intruder.  
   Add payload positions for the username and password fields.

   ![](./Images/pointers%20added%20to%20username%20and%20password.png)

7. **Payload Assignment:**  
   Paste the contents of `usernames.txt` into payload position 1 (username).  
   Paste the contents of `passwords.txt` into payload position 2 (password).

   ![](./Images/pitchfork%20attack.png)

8. **Attack Execution:**  
   Start a Pitchfork attack in Burp Suite Intruder.

9. **Response Analysis:**  
   After the attack completes, look for a request with a `302` status code and the username `carlos`.

   ![](./Images/302%20response%20code%20for%20carlos%20user.png)

10. **Credential Identification:**  
    Note the valid credentials for `carlos` from the successful request.

11. **Login Verification:**  
    Log in with the identified credentials for `carlos`.  
    Confirm successful login.

## Payloads Used:

- Custom username and password lists generated to bypass brute-force protection.

## Issues Encountered:

- The application enforces a limit on invalid login attempts, resulting in temporary blocks.

## Solutions/Workarounds:

- Bypassed the rate limit by periodically logging in with a valid user (`wiener`) to reset the counter.
- Used a Python script to automate the creation of payload lists for efficient brute-forcing.

## Takeaways:

- Brute-force protections can be bypassed if the logic for tracking failed attempts is flawed.
- Periodically submitting valid credentials can reset counters and allow continued brute-forcing.
- Automated tools and custom payloads are essential for testing and exploiting authentication logic flaws.
- Always test for logic flaws in rate limiting and account
