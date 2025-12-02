🛠️ TROUBLESHOOTING – Key Vault Reference Not Resolving 
This guide contains the minimal steps required to fix the SQL_PASSWORD Key Vault reference (red X).

If the Web App's SQL_PASSWORD environment variable shows a red X or the value cannot be saved, follow these steps in this exact order.

✅ Step 1 — Ensure System-Assigned Identity Is Enabled

Go to Azure Portal → App Service → Identity

Under System-assigned, verify:

Status = On


If you just enabled it:
Wait 1–2 minutes for Azure to register the identity.

✅ Step 2 — Add the Correct Key Vault Access Policy

Open Key Vault → Access Policies

Click + Create (or Edit if the policy exists)

Set:

Secret permissions: Get


Select only this principal:

app-azurewebapp123-dev   (the Web App’s managed identity)


Do NOT add your user account.

Confirm → Create

IMPORTANT — Click Save on the Access Policies page
(Azure DOES NOT apply the policy until you press Save.)

✅ Step 3 — Restart the App Service

Go to App Service

Click Restart

This forces Azure to refresh Key Vault permissions.

After the restart, Azure rechecks the access policy and resolves the Key Vault reference.

✅ Step 4 — Wait 1–3 Minutes (Identity Propagation)

Azure may need a short delay to apply the identity permissions to Key Vault.

This delay is documented by Microsoft:
https://learn.microsoft.com/en-us/azure/frontdoor/managed-identity

Waiting a minute or two is typically enough.

✅ Step 5 — Verify the Result

Go to:

App Service → Configuration → Application Settings

Check:

SQL_PASSWORD  → should now show a green checkmark


If it is green → the Key Vault reference is working properly.

