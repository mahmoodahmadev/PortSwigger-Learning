# LAB: DOM XSS in jQuery selector sink using a hashchange event

## Objective:

- Exploit a DOM-based XSS vulnerability in a jQuery selector sink that is triggered by a hashchange event to call the `print()` function.
- Deliver a phishing link to the victim using the **exploit server** to solve the lab.

## Key Concepts:

- `hashchange` event: This event is triggered when the fragment identifier of the URL changes, allowing for dynamic updates to the page without a full reload.
- jQuery `$()` sink: A point in the code where user input is used in a jQuery selector, which can lead to DOM-based XSS if not properly sanitized.
- `onHashChange` event can only be triggered once the fragment is changes after the page load. So find a workaround to trigger the event after the page is fully loaded.
- `iframe` tag: Used to embed another site within the current page, can be used to trigger the `onHashChange` even when the page is completely loadded through `onload` attribute of the `iframe`.

## Steps Taken:

1. Load the target website.
2. View page source to identify any script.
3. Found a script that uses jQuery selector `$()` to find an `h2` element with the text that matched the **fragment identifier** value in the URL.
![](./Images/Script%20to%20scroll%20post%20heading%20into%20view.png)
4. The script listens for the `hashChange` event to scroll into view the `h2` element with the matching text.
5. `OnHashChange` event is triggered only when the fragment identifier value changes after the page load.
6. It means we need to find a way to trigger the `onHashChange` event after page load, which will requir victim interaction.
7. Observed that we are provided with th **exploit server** which means 
8. We can use the **exploit server** to deliver a phising link to the victim.
9. Use the `iframe` tag to ember the target website and use the `onload` attribute to change the `src` attribute of the `iframe` to include a fragment identifier to call the `onHashChange` event.
10. Use the payload below and deliver the exploit to the victim.
11. The lab is solved.
## Payloads Used:

```html
<iframe 
    src='https://0a72008b04e38e3e80cb7be200c40067.web-security-academy.net/#' 
    onload='this.src+="/#<img%20src=0%20onerror=print()>"' >
</iframe>
```

## Issues Encountered:

## Solutions/Workarounds:

## Takeaways:
