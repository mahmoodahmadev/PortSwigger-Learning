# LAB: Reflected XSS into a JavaScript string with angle brackets and double quotes HTML-encoded and single quotes escaped

## Objective:

## Key Concepts:

- **Single Quote Escaping**: Single quotes (`'`) are escaped with a backslash, making it harder to break out of the string.
- **Expression Injection**: Injecting JavaScript expressions (e.g., `'-alert();//`) to execute code within the string context.
- **Operator Abuse**: Using operators like `-` or `+` to concatenate or trigger JavaScript execution after breaking out of the string.
- **Understanding JavaScript Parsing**: Knowing how JavaScript evaluates expressions and handles string concatenation or arithmetic with injected code.

## Steps Taken:

1. Load the target website.
2. Submit the POC payload to break out of script such as **payload 1**.
3. Observe that the `angle` brackets and `'` are **encoded** and **escaped** respectively.
4. Check if the comma escaping can be taken care of using `\`.
5. As the **escaping** can be achieved, but we cannot use any tag because of `<>` getting encoded.
6. We have to use the **payload 2** here.
7. Submit the payload in the search field.
8. The alert method is called and lab is solved.

## Payloads Used:

```html
<!--Payload 1-->

</script><img src=0 onerror=alert() />
```

```javascript
// Payload 2

\'-alert();//
```

**NOTE:**

- `alert()` executes because `JavaScript` evaluates the expression from left to right. Even though you're using it in a string concatenation, it still runs the `alert()` function to get its return value (undefined), which is then added to the string. So the alert box appears when the line is executed.

![](./Images/javascript%20handling%20expressions%20with%20alert%20method.png)

- The `+` operator can also be used but because its very common, that is why we used `-` operator.

## Issues Encountered:

- Unable to find a way to execute `JavaScript` inside an expression

## Solutions/Workarounds:

- Understood the expression execution process in `JavaScript`.

## Takeaways:

- Always try to break out of the `backslash` escape.
- Try to exploit the `JavaScript` expression execution process by inserting malicious script when there is an assignment being done.
