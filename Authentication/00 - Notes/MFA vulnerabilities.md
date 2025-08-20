## Vulnerabilities in Multi-Factor Authentication

In this section, we'll look at some of the vulnerabilities that can occur in multi-factor authentication mechanisms. Interactive labs are available to demonstrate how these vulnerabilities can be exploited in practice.

Many websites rely exclusively on single-factor authentication using a password. However, some require users to prove their identity using multiple authentication factors.

Verifying biometric factors is impractical for most websites. It is increasingly common to see both mandatory and optional two-factor authentication (2FA) based on "something you know" and "something you have." This usually requires users to enter both a traditional password and a temporary verification code from an out-of-band physical device in their possession.

While it is sometimes possible for an attacker to obtain a single knowledge-based factor, such as a password, obtaining another factor from an out-of-band source is considerably less likely. For this reason, two-factor authentication is demonstrably more secure than single-factor authentication. However, as with any security measure, its effectiveness depends on robust implementation. Poorly implemented two-factor authentication can be bypassed or defeated, just as single-factor authentication can.

It is also important to note that the full benefits of multi-factor authentication are only achieved by verifying multiple different factors. Verifying the same factor in two different ways is not true two-factor authentication. For example, email-based 2FA requires a password and a verification code, but accessing the code only relies on knowing the login credentials for the email account. In this case, the knowledge factor is simply being verified twice, which does not provide the security benefits of true multi-factor
