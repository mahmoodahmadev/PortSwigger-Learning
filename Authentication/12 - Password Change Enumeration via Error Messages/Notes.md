# LAB: Password Change Enumeration via Error Messages

## Given:

- There is a vulnerability in the target labs's password reset feature.
- Provided credentials for `wiener: peter`.
- Provided target user's username `carlos`.

## Objective:

- Enumerate the correct password for the target user (`carlos`) by exploiting error messages in the password change process.
- Log in as `carlos` and access the account page to solve the lab.

## Key Concepts:

- Error messages can leak information about password validity.
- Enumeration attacks can be performed by automating requests and analyzing responses.
- Burp Intruder can be used to automate brute-force and enumeration attacks.

## Steps Taken:

1. Log in and experiment with the password change functionality.
2. Observe that the username is submitted as a hidden input in the request.

   ![](./Images/setup%20intruder%20attack%20to%20change%20password.png)

3. Notice the behavior when entering the wrong current password:

   - If new passwords match, the account is locked.
   - If new passwords do not match, error message: "Current password is incorrect."
   - If current password is valid but new passwords do not match, error message: "New passwords do not match."

   ![](./Images/error%20messsage%20when%20current%20password%20value%20is%20not%20right.png)
   ![](./Images/error%20message%20when%20new%20passwords%20do%20not%20match.png)

4. Use the "New passwords do not match" message to enumerate correct passwords.
5. Enter your correct current password and two new passwords that do not match. Send this POST `/my-account/change-password` request to Burp Intruder.
6. In Burp Intruder, change the username parameter to `carlos` and add a payload position to the `current-password` parameter. Set the new password parameters to two different values (e.g., `123` and `abc`).

   ![](./Images/brute%20force%20passwords.png)

7. In the Payloads panel, enter a list of passwords to try.
8. In Settings, add a grep match rule for responses containing "New passwords do not match." Start the attack.
9. When the attack finishes, note the password that triggers the "New passwords do not match" message.
10. Log out and log in as `carlos` using the identified password.
11. Click My account to solve the lab.

## Payloads Used:

- List of possible passwords for brute-forcing the current password field.

## Issues Encountered:

- Ensuring error messages are distinct and can be used for enumeration.
- Automating the attack efficiently in Burp Intruder.

## Solutions/Workarounds:

- Use Burp Intruder's grep match feature to flag informative error messages.
- Carefully craft payloads and request parameters for effective enumeration.

## Takeaways:

- Error messages can leak sensitive information and enable enumeration attacks.
- Always test password change and reset functionality for information leakage.
- Use automation tools like Burp Intruder to efficiently exploit such vulnerabilities.
