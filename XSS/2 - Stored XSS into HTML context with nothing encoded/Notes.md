# LAB: Stored XSS into HTML context with nothing encoded

## Objective:

- call an alert fucntion thtough the vulnurable comment section using stored xss.

## Key Concepts:

- Stored XSS.

## Steps Taken:

1. Open the target website.
2. Explore the site to find any input field where xss can be tried.
3. Found comment section in every post details page with some input fields.
   ![](./Images/Comment%20form.PNG)
4. Submit a comment with mock data.
5. Go back to the post details page.
   ![](./Images/Go%20back%20to%20post%20page.PNG)
6. View page source code and see how the comment data is reflected and displayed on the page.
   ![](./Images/page%20source.PNG)
7. Observed that the comment string is displayed in a **p** tag.
8. Submit another comment with POC payload as a comment.
   ![](./Images/Submit%20POC.PNG)
9. The lab is solved.

## Payloads Used:

```html
<script>
  alert(1);
</script>
```

## Issues Encountered:

- Found no search field like previous tab on main screen.

## Solutions/Workarounds:

- Always explore the application before starting XSS.

## Takeaways:

- Submit mock data in a form to observe how the submitted content is displayed.
- Try with a simple POC using **script** tag to show an alert.
