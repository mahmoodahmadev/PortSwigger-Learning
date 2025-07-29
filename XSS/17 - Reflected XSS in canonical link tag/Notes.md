# LAB: Reflected XSS in canonical link tag

## Objective:

- Inject an attribute in the canonical tag of target website to show an alert

## Key Concepts:

- **Canonical tags:** are HTML elements used to tell search engines which version of a web page is the "preferred" or canonical version when there are multiple pages with similar or duplicate content.

## Steps Taken:

1. Load the target website.
2. View page source code.
3. Observe that there is a canonical tag in the `<head>` tag.

![](./Images/canonical%20tag%20in%20source%20code.png)

4. Add a mock string after `?` in the URL so that `URL` wont break and browser will think that form this point, queries are getting inserting.
5. Insert the **payload 1** next to the target website `URL`.
6. the lab is solved.

## Payloads Used:

```javascript
?'accesskey='x'onclick='alert(1)
```

**NOTE:**

- Canonical tags reflect the value of the `URL`.
- Break out of the `href` attribute of the canonical link tag using '.
- We can use `accessKey` attribute to access or **focus/click** on an element as a shortcut click key.
- Define `x` as the **access key** for the canonical link tag.
- Now, set an `alert` function to be called on the `onclick` event of the `canonical` `link` tag.

## Issues Encountered:

- Unable to understand how to exploit the canonical tags.
- Did not understood about how to use shortcut keys as a trigger for calling `alert` function.

## Solutions/Workarounds:

- Read the relevant notes in portswigger's DOM XSS section and saw the walkthrough guide once.
- Read about shortcut keys on internet and found out that `accesskey` attribute can be used for this.

## Takeaways:

- We can exploit the canonical tags as the reflect the URL itself in their href attribute.
- there is no need to include a space between multiple attributes. It can only cause confusion or sometimes payload wont work.
