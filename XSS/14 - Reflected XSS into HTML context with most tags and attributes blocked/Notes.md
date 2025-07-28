# LAB: Reflected XSS into HTML context with most tags and attributes blocked

## Objective:

- Bypass a WAF(web application firewall)

## Key Concepts:

## Key Concepts:

- **Reflected XSS**: A type of XSS where the payload is reflected from the server into the page and executed in the victim's browser.
- **Web Application Firewall (WAF)**: A security filter that blocks or sanitizes potentially dangerous input, such as certain HTML tags or attributes.
- **Tag and Attribute Filtering**: WAFs may block specific HTML tags and attributes to prevent XSS, but some may still be allowed.
- **Payload Crafting**: Testing which tags and attributes are allowed, then building a payload that works within those constraints.
- **Burp Suite Intruder**: A tool used to automate testing of multiple payloads to discover which tags/attributes are permitted.
- **Event Handler Attributes**: Attributes like `onresize` that can execute JavaScript when certain events occur, useful for bypassing restrictions.
- **Bypassing WAFs**: Using allowed tags and attributes in creative ways to execute JavaScript despite

## Steps Taken:

1. Load the target website.
2. Try a POC with **payload 1**.
3. Observe that the `WAF` has blocked the content.
   ![](./Images/tag%20not%20allowed.png)
4. Use Burp Suite's history to get the search API.
5. Send the API to repeater and use Intruder to check all the HTML tags which are allowed.
   ![](./Images/tag%20sniper%20attack.png)
6. After the execution is completed, we can see that the `<body>` tag is allowed.
   ![](./Images/body%20tag%20allowed.png)
7. Now try a POC with `<body>` mentioned in **payload 2**.
8. the `WAF` again have some restrictions on the attributes as well.
   ![](./Images/attribute%20not%20allowed.png)
9. Repeat the step `4`, `5`, `6` for **attributes** this time.
10. The final results shows many attributes are still allowed.
    ![](./Images/onresize%20tag%20allowed.png)
11. onresize attribute is the one that can be used to craft a payload as we have to use a phishing link.
    ![](./Images/onresize%20attribute%20docs.png)
12. Use the **payload 3** to append a `<body>` tag in the `DOM` with a `print` method that will be triggered on resizing the page.
13. Now, after submitting the payload in the **search** field, copy the site **URL** and paste in the `src` attribute of the `<iframe>` tags in exploit server `Body` field.
14. change the size of webpage when its fully loaded using the `onload` attribute.
15. The final payload will look like **payload 4**.
16. Deliver the exploit to victim.
17. The lab is solved.

## Payloads Used:

```html
<!--Payload 1-->

<script>
  print();
</script>
```

```html
<!--Payload 2-->
<body tabindex="1" autofocus onfocus="print()"></body>
```

```html
<!--Payload 3-->

<body onresize="print()"></body>
```

```html
<!--Payload 4-->

<iframe
  src='https://[target-website-link]/?search=
<body onresize="print()"></body>'
  onload="this.style.width='800px';"
></iframe>
```

## Issues Encountered:

- Almost every tag & attribute I tried was blocked by the WAF.

## Solutions/Workarounds:

- Utilized Burp Suite's `Intruder` to do brute-force all the tags/attributes and later analyzed the response status.

## Takeaways:

- WAF can be used on a site to block certain tags and attributes.
- Use brute-force methods to find any tag/attribute which is still allowed.
- Utilize Burp Suite's intruder feature to automate the brute-force attack.
- Always try to craft a payload from list of what tags/attributes you have in the allowed bucket.
