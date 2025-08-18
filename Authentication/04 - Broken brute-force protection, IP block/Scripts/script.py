# File paths
password_file = 'Authentication/04 -/Scripts/passwords.txt'
username_file = 'Authentication/04 -/Scripts/usernames.txt'

# Open the password file and read all passwords
with open(password_file, 'r') as pf:
    passwords = pf.readlines()

# Prepare username and password lists
usernames = []
passwords_for_users = []

# Iterate through passwords and alternate usernames
for i, password in enumerate(passwords):
    password = password.strip()  # Remove any extra whitespace or newline
    if (i % 3) == 2:
        # For every third password, use 'wiener' with 'peter'
        usernames.append('wiener')
        passwords_for_users.append('peter')
    else:
        # For others, use 'carlos' with the current password
        usernames.append('carlos')
        passwords_for_users.append(password)

# Write to username.txt and password.txt
with open(username_file, 'w') as uf:
    for username in usernames:
        uf.write(f"{username}\n")

with open(password_file, 'w') as pf:
    for password in passwords_for_users:
        pf.write(f"{password}\n")

print("Files have been updated with usernames and passwords.")