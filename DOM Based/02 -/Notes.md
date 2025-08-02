# LAB:

## Objective:

- Exploit the `cookie` manipulation vulnurability to call a `print()` function on a different page on target website, using **Exploit Server**.

## Key Concepts:

## Steps Taken:

1. Load the target website.
2. Navigate around and view source code of each page.
3. Observe that there is a script on post details page.
   ![](./Images/script%20on%20post%20details%20page.PNG)
4. The script sets the cookies which includes the window.location value which is the URL string.
5. Now we have to find where does the cookie value reflects on the website.
6. Explore the target website again and search the post page URL on each page.
7. Observe that the cookie value is reflectd in an `<a>` tag.

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

## Issues Encountered:

## Solutions/Workarounds:

## Takeaways:
