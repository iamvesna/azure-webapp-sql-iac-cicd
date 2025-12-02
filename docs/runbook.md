📘 RUNBOOK – How to Fully Recreate This Project (Step-by-Step)
Repository URL (HTTPS):
https://github.com/iamvesna/azure-webapp-sql-iac-cicd.git


🧭 1. Install All Required Tools

Install everything below before starting.

1.1 Git

https://git-scm.com/downloads

1.2 Terraform

https://developer.hashicorp.com/terraform/downloads

1.3 Azure CLI

https://learn.microsoft.com/en-us/cli/azure/install-azure-cli

Login after installing:

az login

1.4 Node.js 20

https://nodejs.org/

1.5 Visual Studio Code

https://code.visualstudio.com/

📂 2. Clone the Repository (HTTPS)

Open a terminal (PowerShell, Bash, etc.) and run:

git clone https://github.com/iamvesna/azure-webapp-sql-iac-cicd.git


Enter the project:

cd azure-webapp-sql-iac-cicd

💻 3. Open the Project in VS Code

Open VS Code

Click File → Open Folder

Browse to the folder:

azure-webapp-sql-iac-cicd


☁️ 4. Bootstrap Terraform Remote Backend (Must be done manually first time)

Terraform needs an Azure Storage account to store its state.

4.1 Create Terraform Resource Group
az group create -n rg-tfstate-webapp-dev -l centralus

4.2 Create a Storage Account (must be globally unique)
az storage account create \
  -g rg-tfstate-webapp-dev \
  -n <uniqueStorageAccountName> \
  --sku Standard_LRS \
  -l centralus

4.3 Create a Blob Container
az storage container create \
  --account-name <uniqueStorageAccountName> \
  --name tfstate

⚙️ 5. Update Terraform Backend Configuration

Open:

infra/envs/dev/providers.tf

Update the backend block:

backend "azurerm" {
  resource_group_name  = "rg-tfstate-webapp-dev"
  storage_account_name = "<uniqueStorageAccountName>"
  container_name       = "tfstate"
  key                  = "project-webapp-dev/dev.tfstate"
}

📄 6. Create terraform.tfvars File

Create the file:

infra/envs/dev/terraform.tfvars


Example:

prefix   = "azurewebapp123"
env      = "dev"
location = "centralus"

tags = {
  environment = "dev"
  owner       = "user1"
  project     = "azure-webapp-sql"
}

my_public_ip      = "<YOUR_PUBLIC_IP>"
subscription_id   = "<YOUR_SUBSCRIPTION_ID>"
tenant_id         = "<YOUR_TENANT_ID>"

sql_admin_user      = "sqladmin"
sql_admin_password  = "YourStrongPassword123!"



🚀 7. Deploy Infrastructure with Terraform

Go into the environment folder:

cd infra/envs/dev


Run:

terraform init
terraform plan
terraform apply


Terraform now creates:

✔ Resource Group
✔ Log Analytics Workspace
✔ Application Insights
✔ Key Vault with SQL secrets
✔ SQL Server + SQL Database
✔ App Service Plan
✔ Web App (+ Managed Identity + App Settings)


🧪 8. Verify App Service Settings

Go to:

App Service → Configuration → Application Settings

You should see:

Setting	Expected
SQL_SERVER	populated
SQL_DATABASE	populated
SQL_USER	sqladmin
SQL_PASSWORD	green checkmark ✓
APPLICATIONINSIGHTS_CONNECTION_STRING	populated

If SQL_PASSWORD has a red icon → follow troubleshooting.md.

🔁 9. Configure CI/CD (GitHub Actions)
9.1 Export Publish Profile

Azure Portal → Web App → Deployment Center → Get publish profile

9.2 Add GitHub Secret

GitHub → Repository → Settings → Secrets → Actions → New Secret

Name:

AZURE_WEBAPP_PUBLISH_PROFILE


Paste the XML from Azure.

The pipeline at .github/workflows/deploy.yml is now active.

🚢 10. Deploy Application

Push any change:

git add .
git commit -m "trigger deploy"
git push


GitHub Actions will:

✔ Install Node.js
✔ Install dependencies
✔ Zip the app
✔ Deploy to Azure Web App

🌐 13. Test the Application

Main endpoint:

https://app-azurewebapp123-dev.azurewebsites.net/


Health check:

https://app-azurewebapp123-dev.azurewebsites.net/healthz

⚠️ 14. If SQL_PASSWORD shows a red X

Follow:

docs/troubleshooting.md