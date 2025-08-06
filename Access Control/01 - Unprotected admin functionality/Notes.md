# LAB: Reflected XSS into HTML context with nothing encoded

## Objective:

- Delete a user `Carlos`.

## Key Concepts:

- `robots.txt` file can include some useful endpoints that can hold critical information.

## Steps Taken:

1. Load the target website.
2. Search for any `robots.txt` file hosted on the site by navigating to `[site-URL]/robots.txt`.
3. Observe that there is indeed a `robots.txt` file and there is another endpoint with the name of
   ![](./Images/content%20on%20robots.txt%20file.png)
4. Navigate to that path `/administrator-panel`.
5. An admin panel page will be opened from where you can delete the users.
   ![](./Images/administrative%20panel%20page.png)
6. Delete the user `Carlos`.
7. Lab is solved.

## Robots.txt file

- Please read the notes for it here: [robots.txt file](./../00%20-%20Notes/Robots.md)

## Issues Encountered:

- No issues enctounter for this lab.

## Solutions/Workarounds:

## Takeaways:

- Always look for a robots.txt file which can show useful pages of a website.
