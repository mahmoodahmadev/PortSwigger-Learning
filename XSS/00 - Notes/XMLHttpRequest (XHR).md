# XMLHttpRequest (XHR) – Technical Notes

## Purpose

- `XMLHttpRequest` is a **JavaScript API** used to interact with servers.

- It allows sending `HTTP` or `HTTPS` requests to load data without **refreshing
  the browser**.

- Commonly used for `AJAX` operations to update web content dynamically.

**Object Creation**

```javascript
var xhr = new XMLHttpRequest();
```

- Creates a new instance of the XHR object.

- Used to configure and execute network requests.

## Methods:

#### `onreadystatechange`

Assigned a callback function that executes every time the request's readyState
changes.

```javascript
xhr.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    eval("var searchResultsObj = " + this.responseText);
    displaySearchResults(searchResultsObj);
  }
};
```

the callback, conditions are checked to determine when the response is ready and
valid.

#### `readyState`

Represents the progress of the request.

| Value | Constant Name    | Description                               |
| ----- | ---------------- | ----------------------------------------- |
| 0     | UNSENT           | Request not initialized                   |
| 1     | OPENED           | open() has been called                    |
| 2     | HEADERS_RECEIVED | Response headers received                 |
| 3     | LOADING          | Response body is being received           |
| 4     | DONE             | Request is complete and response is ready |

When `readyState === 4`, the request is **complete**.

#### `status`

Returns the HTTP status code from the server response.

**Common values:**

```javascript
200 – OK (success)
404 – Not Found
500 – Internal Server Error
```

if (xhr.readyState === 4 && xhr.status === 200)

#### `open(method, url)`

Prepares the request by defining the HTTP method and target URL.

```javascript
xhr.open("GET", "https://example.com/api", true);
```

**Parameters:**

```javascript
method – HTTP method (e.g., "GET", "POST")
url – Request endpoint (can include query string)
async (optional) – Boolean for asynchronous behavior (default is true)
```

**Constructing the Request URL**

A `GET` request may include a query string using `window.location.search`.

```javascript
var fullUrl = path + window.location.search`;
xhr.open("GET", fullUrl);
```

This dynamically appends the browser's current query parameters to the path.

#### `send()`

Executes the request after it has been configured with open().

```javascript
xhr.send(); For GET requests: no parameters are passed.
```

For `POST` requests: pass data as an argument to `send()`.

## Execution Flow

1. Create the `XHR` object.

2. Assign the onreadystatechange handler.

3. Call `open()` to configure the request.

4. Call `send()` to send the request.

5. Monitor `readyState` and status to handle the response.

## Summary

- `XMLHttpRequest` provides programmatic control over `HTTP` requests in
  JavaScript.

- Commonly used in `AJAX` for **asynchronous** content updates.

- Relies on `open`, `send`, `readyState`, and `status` to manage request
  lifecycle.

- Dynamic `URLs` can be created using `window.location.search`.
