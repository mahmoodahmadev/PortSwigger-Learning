# LAB: DOM-based cookie manipulation

## Objective:

- Exploit the `cookie` manipulation vulnurability to call a `print()` function on a different page on target website, using **Exploit Server**.

## Key Concepts:

- Exploit cookies to execute arbitrary javascript.
- Use of conditionals to avoid infinite reload of target page redirection in an `<iframe>` tag.

## Steps Taken:

1. Load the target website.
2. Navigate around and view source code of each page.
3. Observe that there is a script on post details page.
   ![](./Images/script%20on%20post%20details%20page.PNG)
4. The script sets the cookies which includes the window.location value which is the `URL` string.
5. Now we have to find where does the cookie value reflects on the website.
6. Explore the target website again and search the post page `URL` on each page.
7. Observe that the cookie value is reflectd in an `<a>` tag on home page, which only became visibile after the cookie value was set.
   ![](./Images/cookie%20reflect%20on%20home%20page%20latest%20viewed%20products%20link.PNG)
8. Open `Exploit Servr`.
9. Deliver the following payload to the vicitim.
10. The lab is solved.

## Payloads Used:

```html
<iframe
  src="[post-details-page-link]&'><script>print()</script>"
  onload='if(!window.x){window.location="[home-page-link]"};window.x=1;'
></iframe>
```

## Payload Explanation

- The `URL` of **post details** page is set as `cookie`.
- As the `cookie` is set when user visits the** post details** page. And the `cookie` value is then reflected in a link on **home page**.
- Therefore, we have to first make the vicitim, visit the **details page** to set mailicious `cookie`. Then redirect him to the **home page** to execute the malicious script injected in the `cookie`.
- As we have the **Exploit Server**, we can use `<iframe>` tag to navigate the victim to **details page**, and when the page is loaded and `cookie` is set to our payload, we can change the `window.location` to **home page**. It will redirect the victim to **home page**.
- Looking at the first URL vicitm will navigate to, we have used `&'/><script>print()</script>`.
- `&` is inserted so that the URL will still be valid when we append our malicious payload.
- `'` is used to break out of `href` attribute.
- `/>` is used to close the `<a>` tag where `cookie` value is set.
- `<script>print()</script>` is going to call the `print()` method.
- When the `<iframe>` loads the XSS payload, it triggers `onload`, which redirects to the home page.
- The redirection reloads the outer page (and its iframe).
- The iframe loads again, triggers the same logic, and redirects again...
- As a result of this, the page is stuck in an infinity loop and page is redirected again and again.
- That is why we used a condition `!indow.x` and then after 1st time changing the `location` value, we set the `window.x =1`, to **false** the `if` condition. 

## Issues Encountered:

- Double quotes did not break out of the href attribute as expected; single quotes worked instead.

## Solutions/Workarounds:

- I tried single inverted comma and it worked.

## Takeaways:

- Browsers may display double quotes in the DOM even if single quotes are used in the code. Always test with single quotes for attribute injection.
