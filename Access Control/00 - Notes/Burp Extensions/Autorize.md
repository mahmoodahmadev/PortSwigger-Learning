# Autorize Extension

### 1. Installation & Setup

- Ensure you have **Burp Suite Community or Professional**, along with **Jython** standalone JAR.

- In Burp: go to **Extender → Options (or Extension Settings) → Python Environment**. Select the downloaded Jython JAR.
- Install **Autorize** via the **BApp Store** under the Extender tab, or download and add `Autorize.py` manually.

### 2. Basic Workflow

- Autorize adds a new **Autorize tab** in Burp.

- Log into the app with:

  1. A **low-privileged user** (e.g., normal user).

  2. A **high-privileged user** (e.g., admin).

- Inject the **low-privilege user's session cookie/token** into Autorize’s configuration (“insert injected header here”).

- Optionally enable or disable the **unauthenticated check** (requests without cookies).

- Optionally enable **“Intercept requests from Repeater”** to cover manually replayed requests.

### 3. Configuration Filters

- Use the **Enforcement Detector** to define how Autorize recognizes unauthorized access responses (e.g., by content-length, error strings, headers, regex).
- Use **Interception Filters** to limit which domains or URLs Autorize should monitor (blacklist, whitelist, regex, or scope).

### 4. Running Autorize

- Click **“Intercept is off”** to turn it **ON** and start intercepting traffic.

- Browse the application as the **high-privileged user**.

- For each request, Autorize sends:

  1. The _original request_.

  2. The same request using **low-privilege session**.

  3. Optionally, the request **without any authentication**.

### 5. Interpreting Results

In the **Autorize tab**, you'll see a table of requests with three enforcement statuses:

- **Bypassed!** (Red) Potential IDOR or access control failure.

- **Enforced!** (Green) Access properly restricted.

- **Is Enforced???** (Yellow) Ambiguous; needs refined enforcement detection filter.

Click a row to view **original**, **modified**, and **unauthenticated** request/response pairs to investigate.

### 6. Reporting & Export

- Autorize allows you to **export test reports** in **HTML** or **CSV** format or save the plugin state.

#### Pro Tips

- Use Autorize in conjunction with manual testing and tools like Intruder or Repeater to validate findings.

- Configure filters properly to reduce false positives e.g., use regex or string indicators for unauthorized responses.

- Interception filters help ignore irrelevant out-of-scope resources (like images or third-party scripts).
