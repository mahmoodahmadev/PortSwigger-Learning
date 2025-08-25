## Vulnerabilities in Multi-Factor Authentication

In this section, we'll look at some of the vulnerabilities that can occur in multi-factor authentication mechanisms. Interactive labs are available to demonstrate how these vulnerabilities can be exploited in practice.

Many websites rely exclusively on single-factor authentication using a password. However, some require users to prove their identity using multiple authentication factors.

Verifying biometric factors is impractical for most websites. It is increasingly common to see both mandatory and optional two-factor authentication (2FA) based on "something you know" and "something you have." This usually requires users to enter both a traditional password and a temporary verification code from an out-of-band physical device in their possession.

While it is sometimes possible for an attacker to obtain a single knowledge-based factor, such as a password, obtaining another factor from an out-of-band source is considerably less likely. For this reason, two-factor authentication is demonstrably more secure than single-factor authentication. However, as with any security measure, its effectiveness depends on robust implementation. Poorly implemented two-factor authentication can be bypassed or defeated, just as single-factor authentication can.

It is also important to note that the full benefits of multi-factor authentication are only achieved by verifying multiple different factors. Verifying the same factor in two different ways is not true two-factor authentication. For example, email-based 2FA requires a password and a verification code, but accessing the code only relies on knowing the login credentials for the email account. In this case, the knowledge factor is simply being verified twice, which does not provide the security benefits of true multi-factor

## Two-Factor Authentication Tokens

### Physical Devices

- Verification codes are often read by the user from a physical device.
- High-security websites may provide dedicated devices (e.g., RSA token, keypad device) for generating codes.
- These devices are purpose-built for security and generate codes directly.
- Dedicated mobile apps (e.g., Google Authenticator) are also commonly used for generating verification codes.

### SMS-Based Verification Codes

- Some websites send verification codes via SMS to the user's mobile phone.
- This method still verifies "something you have" but is vulnerable to abuse:
  - **Interception Risk:** The code is transmitted over SMS, which can be intercepted.
  - **SIM Swapping:** Attackers may fraudulently obtain a SIM card with the victim's phone number, receiving all SMS messages, including verification codes.

## Bypassing Two-Factor Authentication

- Sometimes, two-factor authentication (2FA) implementations are flawed and can be bypassed.
- If the login process prompts for a password first, then a verification code on a separate page, the user may be considered "logged in" after the first step.
- In such cases, test if you can access authenticated pages directly after entering the password, without completing the second step.
- Occasionally, websites do not properly check if the second authentication step was completed before granting access to protected resources.

## Flawed Two-Factor Verification Logic

Sometimes, flawed logic in two-factor authentication means that after a user completes the initial login step, the website doesn't adequately verify that the same user is completing the second step.

### Example Flow

1. **User logs in with credentials:**

   ```http
   POST /login-steps/first HTTP/1.1
   Host: vulnerable-website.com
   ...
   username=carlos&password=qwerty
   ```

   The server responds:

   ```http
   HTTP/1.1 200 OK
   Set-Cookie: account=carlos
   ```

2. **User proceeds to the second step:**

   ```http
   GET /login-steps/second HTTP/1.1
   Cookie: account=carlos
   ```

3. **User submits the verification code:**
   ```http
   POST /login-steps/second HTTP/1.1
   Host: vulnerable-website.com
   Cookie: account=carlos
   ...
   verification-code=123456
   ```

### The Vulnerability

- The website uses the cookie value to determine which account is being verified.
- An attacker can log in with their own credentials, then change the cookie to target any username:
  ```http
  POST /login-steps/second HTTP/1.1
  Host: vulnerable-website.com
  Cookie: account=victim-user
  ...
  verification-code=123456
  ```
- If the attacker can brute-force the verification code, they can access any account without knowing the password.

### Impact

This flaw is extremely dangerous. It allows attackers to log in to arbitrary accounts by manipulating cookies and brute-forcing codes, without ever needing the victim's password.
