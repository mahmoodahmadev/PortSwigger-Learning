# LAB: Reflected XSS into a template literal with angle brackets, single, double quotes, backslash and backticks Unicode-escaped

## Objective:

## Key Concepts:

- **Template Literals**: JavaScript strings enclosed in backticks (`` ` ``) that support embedded expressions using `${}`.
- **Expression Injection**: Injecting `${}` into a template literal allows execution of arbitrary JavaScript expressions.
- **Context Awareness**: Understanding the context (template literal) is crucial for crafting a working payload.
- **innerText Rendering**: Even if the output is rendered with `innerText`, the injection point in the script can still be exploited before rendering.

## Steps Taken:

1. Load the target website.
2. Submit a unique string in the search field.
3. Observe that the string is reflected on the page in an `<h1>` tag.
4. View the page source code.
5. Notice the script visible, which shows that JavaScript's template literal are used to assign the search string to a variable using backticks ` `` `.
   ![](./Images/script%20in%20source%20code.png)
6. Submit the payload below in the search field.
7. The alert is executed and the lab is solved.

## Payloads Used:

```javascript
${alert()}
```

**NOTE:**

- Template literals in `JavaScript` are a way to use expressions, variables in a string.
- We can use `${}` syntax in the template literal to insert any `expression`, `variable` or call a `method`.
- The expression will be processed and:
  - If its an arithmetic expression, the final result will be appended in the string.
  - If its a variable, then variable's value will be replaces with variable name.
  - If its a method, then method will be called first, and if it returns anything or undefined will be appended in th string.

![](./Images/template%20literal%20process.png)

## Issues Encountered:

- A lot of escaping and encoding is applied, and the `innerText` method is used to display the search string on screen, making direct HTML/JS injection difficult.

## Solutions/Workarounds:

- Focused on the variable definition part in the script, exploiting the template literal before the string is rendered in the DOM.

## Takeaways:

- Always check for template literals in scripts as potential XSS vectors.
- Even with heavy escaping, unescaped sequences like `${}` can be leveraged for code execution.
- Understanding the execution context and browser parsing behavior is key to successful exploitation.
