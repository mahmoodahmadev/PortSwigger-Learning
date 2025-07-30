# HTML Encoding (for XSS Prevention)

---

## What is HTML Encoding?

HTML encoding (also known as HTML entity encoding) is the process of converting characters that have special meaning in HTML (like `<`, `>`, `"`, `'`, `&`) into a **safe representation** using character entities.

This prevents the browser from **interpreting them as code** and instead treats them as **plain text**.

---

## 🔥 Why is HTML Encoding Important in XSS?

XSS occurs when untrusted user input is interpreted as executable code in the browser (e.g., JavaScript). HTML encoding neutralizes this input by making it safe to render — not execute.

---

## 🚨 Characters to Encode

| Character | HTML Entity          | Why                                                      |
| --------- | -------------------- | -------------------------------------------------------- |
| `<`       | `&lt;`               | Starts an HTML tag                                       |
| `>`       | `&gt;`               | Ends an HTML tag                                         |
| `&`       | `&amp;`              | Starts an HTML entity                                    |
| `"`       | `&quot;`             | Used in HTML attribute values                            |
| `'`       | `&#x27;` or `&apos;` | Used in HTML attribute values                            |
| `/`       | `&#x2F;`             | Sometimes encoded in frameworks to reduce path confusion |

---

## 🧠 When to Use HTML Encoding

### ✅ Safe Places (need encoding):

- HTML content: inside elements
  ```html
  <div>Hello &lt;script&gt;</div>
  HTML attributes:
  ```

<input value="&quot;alert(1)&quot;">
Inside <title>, <textarea>, etc.

❌ Unsafe Without Encoding:
Injected directly into HTML tags or JS context

<div>Welcome, USER_INPUT</div>          <!-- Dangerous -->
<script>var x = 'USER_INPUT';</script>  <!-- Very dangerous -->
💡 Examples
🔴 Vulnerable (No encoding):

<div>Hello, John<script>alert(1)</script></div>
🟢 Safe (Encoded):

<div>Hello, John&lt;script&gt;alert(1)&lt;/script&gt;</div>
Browser renders the script tags as text — no XSS triggered.

🧪 XSS Payload vs. Encoded Safe Version
Type Value
Raw payload <script>alert(1)</script>
Encoded &lt;script&gt;alert(1)&lt;/script&gt;

🛠️ How to Encode
🔸 JavaScript
Use DOM methods or libraries:

const div = document.createElement("div");
div.innerText = "<script>alert(1)</script>";
document.body.appendChild(div);
🔸 Server-Side
Use built-in functions or libraries:

Python (Flask):

python
Copy
Edit
from html import escape
safe_input = escape(user_input)
PHP:

htmlspecialchars($input, ENT_QUOTES, 'UTF-8');
Node.js (Express):
Use a library like he or escape-html.

⚠️ Important Notes
Encoding ≠ Escaping JavaScript

HTML encoding is for HTML contexts.

Use JavaScript escaping (\\, \', \", etc.) for JS contexts.

Context matters

Output inside HTML? → HTML encode.

Output inside JS? → JS escape.

Output inside URL? → URL encode.

Don't double encode: &lt; → &amp;lt; (bad).
