# LAB: DOM XSS in AngularJS expression with angle brackets and double quotes HTML-encoded

## Objective:

- Perform a cross-site scripting attack that executes an AngularJS expression
  and calls the alert function.

## Key Concepts:

- AngularJS is a JavaScript library, that scans the contents of HTML nodes
  containing the `ng-app` attribute(also calle directive in angularJS).
- An `ng-app` directive can be used to inject JavaScript expressions as
  angularJS executes everything under **inteppolations** `{{}}` as an
  expression.

## Steps Taken:

- Load the target website.
- View page source code to find the `ng-app` directive.
- Find any input field that can be a potential source of XSS.
- Found a search field on the main screen.
- To check if the input is exploitable, enter a simple expression like `{{1+1}}`
  in the search field and submit.
- Observe that the results `2` is reflected on the page.
- It means the input is being processed as an AngularJS expression.
- Craft a payload mentioned below to execute the `alert` in in browser through
  search field.
- Enter the paayload in the search field and submit.
- The alert is called and lab is solved.

## Payloads Used:

```javascript
{
  {
    constructor.constructor("alert(1)")();
  }
}
```

**NOTES: **

- The first `constructor` is the constructor of whatever the current global
  object is.
- The second `constructor` is the used to access the `Function` constructor.
- The `Function` constructor is used to create a new function from a string of
  code.
- The `alert()` string in the payload is new function.
- The `()` at the last is used to call the newly created function from string
  `alert(1)`.

## Issues Encountered:

- Did not knew about if the target website was using AngularJS.
- Did not knew that why `{{alert()}}` was not working directly in th search
  field.

## Solutions/Workarounds:

- Read the source code of the target website and found the `ng-app` directive in
  the `<body>` tag, which indicated that the website is using AngularJS.
- Understoor that the AngularJS treats everything under `ng-app` directivee as
  an expression if placed inside `{{}}`.
- Read about the AngularJS **Sandbox** and how it prevents direct execution of
  certain JavaScript functions like `alert()`.
- Understood that the `constructor` property can be used

## Takeaways:

- If a website has `ng-app` directive/attribute in any of its tags, generally
  `<body>` tag, then its using **AngularJS**.
- If you find an input field that is being processed as an AngularJS expression,
  you may be able to exploit it for XSS.
- AngularJS **sandbox** is a security feature that restricts the execution of
  certain JavaScript code within AngularJS **interpolations**.
- The **sandbox** prevents the use of certain global objects and functions,
  including `window`, `document`, `eval()`, `setTimout()` and `alert()`.
- Use workarounds to access the desired methods. Like use constructor of
  whatever the global object is in AngularJS. Then use function constructor to
  create a method from string and call it immediately. Such as written in the
  payload section.
