# Authentication Notes

## What is Authentication?

Authentication is the process of verifying the identity of a user or client. Websites are potentially exposed to anyone who is connected to the internet, making robust authentication mechanisms integral to effective web security.

## Types of Authentication

1. **Something you know**

   - Examples: Password, answer to a security question
   - Also known as "knowledge factors"

2. **Something you have**

   - Examples: Physical object such as a mobile phone or security token
   - Also known as "possession factors"

3. **Something you are or do**
   - Examples: Biometrics (fingerprint, face scan), patterns of behavior
   - Also known as "inherence factors"

Authentication mechanisms rely on a range of technologies to verify one or more of these factors.

## Authentication vs Authorization

- **Authentication:**  
  The process of verifying that a user is who they claim to be.  
  _Example:_ Checking if someone logging in as `Carlos123` is actually the owner of that account.

- **Authorization:**  
  The process of verifying what actions a user is allowed to perform after authentication.  
  _Example:_ Determining if `Carlos123` can access personal information about other users or perform actions such as deleting another user's account.

Authentication establishes identity, while authorization determines permissions and access levels.

## How Do Authentication Vulnerabilities Arise?

Most vulnerabilities in authentication mechanisms occur in one of two ways:

1. **Weak Authentication Mechanisms:**

   - The mechanisms fail to adequately protect against brute-force attacks, allowing attackers to guess credentials and gain unauthorized access.

2. **Logic Flaws or Poor Coding (Broken Authentication):**
   - Flaws in the implementation or logic allow attackers to bypass authentication entirely.
   - These issues are often referred to as "broken authentication".

In many areas of web development, logic flaws may cause unexpected behavior, which may or may not be a security issue. However, because authentication is critical to security, flawed authentication logic almost always exposes the website to significant security risks.

## What is the Impact of Vulnerable Authentication?

The impact of authentication vulnerabilities can be severe:

- If an attacker bypasses authentication or brute-forces their way into another user's account, they gain access to all the data and functionality that the compromised account has.
- Compromising a high-privileged account, such as a system administrator, can allow the attacker to take full control over the entire application and potentially access internal infrastructure.
- Even compromising a low-privileged account might still grant an attacker access to data they otherwise shouldn't have, such as commercially sensitive business information.
- Low-privileged accounts may also allow attackers to access additional internal pages, increasing the attack surface.  
  Often, high-severity attacks are not possible from publicly accessible pages, but may be possible from internal pages accessible only after authentication.

Robust authentication is essential to prevent unauthorized access and protect both user data and application integrity.

## Vulnerabilities in Password-Based Login

For websites that adopt a password-based login process, users either register for an account themselves or are assigned an account by an administrator. This account is associated with a unique username and a secret password, which the user enters in a login form to authenticate themselves.

In this scenario, the fact that a user knows the secret password is taken as sufficient proof of their identity. This means that the security of the website is compromised if an attacker is able to either obtain or guess the login credentials of another user.

Attackers can achieve this in several ways, including:

- **Brute-force attacks:** Systematically guessing passwords until the correct one is found.
- **Credential stuffing:** Using leaked username/password pairs from other breaches.
- **Phishing or social engineering:** Tricking users into revealing their credentials.

The following sections will cover how attackers use brute-force attacks, common flaws in brute-force protection, and vulnerabilities in HTTP

## Brute-forcing Usernames

Usernames are especially easy to guess if they conform to a recognizable pattern, such as an email address. For example, it is very common to see business logins in the format `firstname.lastname@somecompany.com`. However, even if there is no obvious pattern, sometimes even high-privileged accounts are created using predictable usernames, such as `admin` or `administrator`.

During auditing, check whether the website discloses potential usernames publicly. For example, are you able to access user profiles without logging in? Even if the actual content of the profiles is hidden, the name used in the profile is sometimes the same as the login username. You should also check HTTP responses to see if any email addresses are disclosed. Occasionally, responses contain email addresses of high-privileged users, such as administrators

## Brute-forcing Passwords

Passwords can similarly be brute-forced, with the difficulty varying based on the strength of the password. Many websites adopt some form of password policy, which forces users to create high-entropy passwords that are, theoretically at least, harder to crack using brute-force alone. This typically involves enforcing passwords with:

- A minimum number of characters
- A mixture of lower and uppercase letters
- At least one special character

However, while high-entropy passwords are difficult for computers alone to crack, attackers can exploit common human behaviors that introduce vulnerabilities. Instead of creating truly random passwords, users often choose memorable passwords and modify them to fit the required policy. For example, if `mypassword` is not allowed, users may use variations like `Mypassword1!` or `Myp4$$w0rd`.

When password policies require regular changes, users frequently make minor, predictable adjustments to their preferred password, such as changing `Mypassword1!` to `Mypassword1?` or `Mypassword2!`.

This understanding of likely credentials and predictable patterns enables attackers to conduct more sophisticated and effective brute-force attacks, rather than simply

## Username Enumeration

Username enumeration occurs when an attacker can observe changes in a website's behavior to determine whether a given username is valid.

This typically happens on login pages (when entering a valid username but incorrect password) or registration forms (when entering a username that is already taken). Username enumeration greatly reduces the time and effort required to brute-force a login, as attackers can quickly generate a shortlist of valid usernames.

When testing for username enumeration, pay attention to:

- **Status codes:**  
  Most brute-force attempts will return the same HTTP status code for invalid credentials. If a different status code is returned for a particular guess, it strongly indicates that the username is valid. Best practice is to always return the same status code, but this is not always implemented.

- **Error messages:**  
  Sometimes the error message differs depending on whether both the username and password are incorrect, or only the password is wrong. Ideally, websites should use identical, generic messages in both cases, but even a small difference (such as a typo) can reveal valid usernames.

- **Response times:**  
  If most requests have similar response times, but some take longer, it may indicate that the website is performing additional checks (such as verifying the password only if the username is valid). Attackers can amplify this delay by entering an excessively long password, making the timing difference more noticeable.

Identifying these subtle differences can help attackers enumerate valid usernames and significantly improve the efficiency of brute-force

## Flawed Brute-force Protection

Brute-force attacks typically involve many failed guesses before an account is compromised. Effective brute-force protection aims to make automation difficult and slow down the rate of login attempts. The two most common defenses are:

- **Account Lockout:** Locking the targeted account after too many failed login attempts.
- **IP Blocking:** Blocking the remote user's IP address if they make too many login attempts in quick succession.

While these methods offer some protection, they are not foolproof, especially if implemented with flawed logic.

**Example of flawed logic:**  
Some systems reset the failed attempt counter if the IP owner logs in successfully. An attacker can exploit this by periodically logging in to their own account during an attack, preventing the limit from being reached.

By including their own valid credentials at regular intervals in the wordlist, attackers can bypass these protections and continue brute-forcing without triggering account lockouts or IP blocks.

## Account Locking

One way in which websites try to prevent brute-forcing is to lock the account if certain suspicious criteria are met, usually a set number of failed login attempts. Just as with normal login errors, responses from the server indicating that an account is locked can also help an attacker to enumerate usernames.

Locking an account offers a certain amount of protection against targeted brute-forcing of a specific account. However, this approach fails to adequately prevent brute-force attacks in which the attacker is just trying to gain access to any random account they can.

**Attackers can work around account locking by:**

1. Establishing a list of candidate usernames that are likely to be valid. This could be through username enumeration or simply based on a list of common usernames.
2. Deciding on a very small shortlist of passwords that are likely to be used by at least one user. The number of passwords selected must not exceed the number of login attempts allowed before lockout (e.g., if the limit is 3 attempts, pick 3 passwords).
3. Using a tool such as Burp Intruder to try each selected password with each candidate username. This approach allows brute-forcing across all accounts without triggering account lockouts. If just one user uses one of the selected passwords, the attacker can successfully compromise an account without being blocked by account locking.

Account locking also fails to protect against credential stuffing attacks. This involves using a massive dictionary of username:password pairs, composed of genuine login credentials stolen in data breaches. Credential stuffing relies on the fact that many people reuse the same username and password on multiple websites and, therefore, there is a chance that some of the compromised credentials in the dictionary are also valid on the target website. Account locking does not protect against credential stuffing because each username is only being attempted once. Credential stuffing is particularly dangerous because it can sometimes result in the attacker compromising many different accounts with just a single automated
