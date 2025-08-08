# LAB: Unprotected admin functionality with unpredictable URL

## Objective:

- Find the admin panel endpoint that is hidden somewhere in the application codebase.
- Delete the user `Carlos` from the target website using admin panel.

## Key Concepts:

- Scripts on the websites can reveal the important endpoints.

## Steps Taken:

1. Load the target website.
2. View the page source code.
3. Observe that there is a script that sets the **admin-panel** endpoint to an `<a>` tag's `href` attribute.
   ![](./Images/script%20on%20page%20source%20code.png)
4. Copy the admin panel's link and visit it.
   ![](./Images/admin%20panel.png)
5. Admin panel will be opened from where you can delete the `Carlos` user.
6. Delete the user and the lab is solved.

## Payloads Used:

admin-pub8g0

## Issues Encountered:

- No issue encountered.

## Takeaways:

- Check the scripts on the page source code to see if application reveals any endpoints.
