# LAB: Reflected XSS in a JavaScript URL with some characters blocked

## Objective:

- Display an alert with the content `1337` by exploiting a reflected XSS vulnerability in a JavaScript URL, despite restrictions on certain characters (e.g., parentheses).

## Key Concepts:

- **JavaScript URL XSS:** Exploiting the `javascript:` protocol handler to execute arbitrary JavaScript in the context of the page.
- **Character Restrictions:** Some characters, such as `(` and `)`, are filtered or removed, requiring creative payload construction.
- **Method Overriding:** Changing the behavior of built-in JavaScript methods (e.g., `toString`) to execute custom code.
- **Error Handling Abuse:** Leveraging the `onerror` handler and forced errors (via `throw`) to trigger code execution.
- **Fetch API Parameters:** Understanding that the `fetch` API can accept multiple parameters, which can be used to inject and execute code.
- **Type Coercion:** Forcing JavaScript to call overridden methods (like `toString`) by triggering type conversions (e.g., adding `window` to a number).

## Steps Taken:

1. Load the target website.
2. Open details page of any post.
3. View page source.
4. Observe that there is a script in the go back `<a>` tag.

![](./Images/script%20in%20post%20details%20page%20source%20code.png)

5. Inject the **payload 1** in the `URL`.
6. The lab is solved.

## Payloads Used:

```javascript
// Payload 1 (inject in URL)

&'},x=_=>{onerror=alert;throw 1337},toString=x,window+1,{'':'

```

```javascript
// Final script

fetch(
  '/analytics',
  { method: 'post', body: '/post%3fpostId%3d4&' },
  (x = _ => {
    onerror = alert;
    throw 1;
  }),
  (toString = x),
  window + 1,
  { '': '' }
).finally(_ => (window.location = '/'));
```

**NOTE:**

- Copy the script only starting from `javascript:` protocol into a `.js` file in visual studio code.
- Observe that its a `fetch API`.

  ![](./Images/original%20script.png)

- Try the `&()` and observe that the () brackets are removed.

  ![](<./Images/()%20brackets%20are%20removed.png>)

- we cannot insert `()` brackets, so what we can do here is

- Alter the definition of `toString` method in JavaScript.
- Set the definition to our custom function.
- in the custom function, we can first change what method will be called when an error is thrown in the code.

  ![](./Images/alter%20definition%20on%20onerror%20method.png)

- Then we can throw an error manually using `throw` keyword.

  ![](./Images/manually%20throw%201%20as%20error.png)

- The final function will be an arrow function as we cannot use `()` brackets. Therefore we use `\_=>` syntax here.
  ![](./Images/custom%20method.png)
- Now, we have our custom function ready.
- the `fetch API` can accept multiple parameters.

  ![](./Images/fetch%20api.png)

- So we can just first define our custom method with the key `x`.

  ![](./Images/custom%20method%20as%20value%20of%20key%20x%20in%20fetch%20api.png)

- Then we can add another parameter which will be an assignment expression, changing the definition of `toString` method, so that every time the `toString` method is called, our custom method will be called instead of its pre-build definition.

  ![](./Images/alter%20toString%20method.png)

- Now we have to find a way to call the `toString` method.
- We can simply use the `window` object and add it into a number.

![](./Images/window%20function%20to%20call%20toString%20method.png)

- JS will call `toString` method to convert `1` to a string and our custom method `x` will be called, resulting in alert.
- Now as there is `'}` we have to take care of, so add another partial argument `{'':'`. Which will concat with the `'}` and will create a valid syntax `{'':''}`
  ![](./Images/handle%20the%20remaining%20syntac.png)

## Issues Encountered:

- Parentheses `(` and `)` were stripped, preventing normal function calls.
- Needed to maintain valid JavaScript syntax despite injected code fragments.
- Required a way to trigger custom code execution without direct invocation.

## Solutions/Workarounds:

- Used arrow function syntax (`_=>{}`) to define functions without parentheses.
- Overrode `toString` and forced its invocation via type coercion (`window + 1`).
- Used object literal `{ '': '' }` to close the syntax cleanly.

## Takeaways:

- Even with severe character restrictions, JavaScript's flexibility allows for creative XSS payloads.
- Overriding built-in methods and leveraging type coercion are powerful techniques for code execution.
- Always analyze the context and script logic to find alternative execution paths when standard payloads are blocked.
