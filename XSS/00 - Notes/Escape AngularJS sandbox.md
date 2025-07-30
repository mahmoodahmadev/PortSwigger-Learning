# AngularJS Sandbox

## What is a sandbox?

A sandbox is a safety box. AngularJS uses it to try to stop dangerous code (like alert(1), or worse).

For example:

```javascript
{
  {
    someExpression;
  }
}
```

AngularJS looks inside `someExpression` and blocks bad stuff, like:

- constructor

- alert

- Function

It uses a helper function like `isIdent(char)` to check each character and say:

    Is this a safe letter?

### The trick

The trick is to fool AngularJS into thinking a dangerous expression is just a bunch of normal letters.

Here's how:

**1. Modify how characters are checked**

AngularJS uses something like this:

```javascript
isIdent = function (ch) {
  return (
    ("a" <= ch && ch <= "z") ||
    ("A" <= ch && ch <= "Z") ||
    ch === "_" ||
    ch === "$"
  );
};
```

It expects to be checking one letter at a time, like `'a'` or `'Z'`.

But what if we broke that rule?

**2. Replace `.charAt()` with `.join()`**
This line does it:

```javascript
"a".constructor.prototype.charAt = [].join;
```

What does that mean?

- `'a'.constructor` → gives you String

- `String.prototype.charAt` → used by AngularJS to get one letter at a time

- `[].join` → joins an array into a full string

So now:

```javascript
"a".charAt(0); // Instead of 'a', returns 'a'
"a".charAt(1); // Instead of '', returns the whole string
```

After you overwrite `charAt` with `[].join`, this happens:

```
'a'.charAt(0) → returns `'a'`
'a'.charAt(1) → returns `'a'` // Still okay
But...
'x=alert(1)'.charAt(0) → becomes 'x=alert(1)'
```

So **instead of getting one character**, AngularJS gets the whole string.

**3. Fooling isIdent(ch)**

Now Angular runs:

```javascript
isIdent("x=alert(1)");
```

That shouldn't be allowed — because it includes:

- =

- (

- )

All bad in an expression. But because `charAt()` returns the whole string, Angular thinks:

    Oh, that’s just one "long letter", not bad.

So it lets it pass!

**4. Injecting code safely**

Now you can inject this:

```javascript
x = alert(1);
```

And AngularJS won’t block it. Why?

Because its safety check is **broken**.

## Why this works

- Angular tries to be safe by checking each letter of your code

- You trick it into thinking bad code is made of good letters

- You do that by changing how it reads each letter — .charAt()

- After that, you can run any `JavaScript` like:

```javascript
$eval("x=alert(1)");
```
