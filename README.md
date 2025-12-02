 #📘 Azure Web App + SQL + Key Vault + Monitoring + CI/CD (Terraform Project)

This project demonstrates how to build a complete cloud application environment on Microsoft Azure using:

Terraform (Infrastructure-as-Code)

GitHub Actions (CI/CD pipeline)

Azure App Service (Node.js Web App)

Azure SQL Database

Azure Key Vault (secure secrets)

Application Insights & Log Analytics (monitoring)


🎯 What This Project Demonstrates

This project is meant to show:

✔ 1. How to deploy a full Azure environment automatically

Using Terraform modules and clean structure.

✔ 2. How to host a real Node.js Web App in Azure App Service

With health checks, SQL connection, and monitoring built in.

✔ 3. How to store secrets securely using Azure Key Vault

No secrets in code, repo, pipeline, or app settings.

✔ 4. How to build an automated deployment workflow

A GitHub Actions pipeline builds and deploys the application on every push.

✔ 5. How to monitor an application end-to-end

Using Application Insights + Log Analytics for logs, performance, and SQL dependencies.


🏗️ What the Infrastructure Creates 

All infrastructure is deployed through Terraform in a modular structure.

1. Resource Group (foundation)

- A container for all Azure resources.

2. App Service Plan (compute)

- Defines the compute environment for running the Web App.

3. Azure Web App (application layer)

- Runs your Node.js backend, which:

- exposes HTTP endpoints

- connects to Azure SQL Database

- retrieves secrets from Key Vault

- sends telemetry to Application Insights

- responds to health checks (/healthz)

- This is the entry point users interact with.

4. Azure SQL Server + SQL Database (data layer)

- Stores application data.
Credentials are never stored in the application — only in Key Vault.

5. Azure Key Vault (security layer)

Stores:

- SQL admin username

- SQL admin password

The Web App uses a Key Vault Reference, so Azure injects the password at runtime.
This keeps the environment secure, clean, and compliant.

6. Application Insights (runtime monitoring)

Captures:

- requests

- logs

- SQL dependency calls

- performance metrics

- exceptions

- No manual instrumentation required.

7. Log Analytics Workspace (log storage & analysis)

- Stores telemetry from Application Insights.
Used for dashboards, KQL queries, alerts, and troubleshooting.

🚀 How the Application Works 

User makes a request
→ The browser calls the Azure Web App URL.

Web App runs the Node.js application
→ Handles routes like / and /healthz.

Web App retrieves SQL password from Key Vault
→ Using a secure Key Vault Reference
→ No secrets exposed to code or config.

Web App connects to SQL Database
→ Executes queries and returns results.

Telemetry is automatically collected
→ Application Insights logs all activity.
→ Data flows into Log Analytics Workspace for analysis.


🔄 CI/CD Workflow (What Happens When You Push Code)
✔ Push code to GitHub

→ GitHub Actions pipeline starts.

✔ Pipeline builds the Node.js application

→ Installs dependencies and creates a deployment package.

✔ Pipeline deploys to Azure Web App

→ The new version goes live automatically.

This shows how modern cloud deployments work with zero manual steps.

📐 Architecture Diagrams

All diagrams for this project are located in:

/docs/architecture-diagrams/


They include:

1. Terraform Module Architecture

Shows how:

variables flow

Terraform modules interact

each module creates a part of the infrastructure

2. Azure Services & Deployment Pipeline

Shows the full system:

GitHub → GitHub Actions → Azure Web App

Web App → Key Vault → SQL DB

Web App → Application Insights → Log Analytics

You can open each diagram for a visual explanation of the architecture.

🧭 Recreation of This Project

The entire environment can be fully recreated.

To keep this README simple and focused,
all step-by-step recreation instructions are documented in:

RUNBOOK.md


This includes:

- setup

- Terraform initialization

- backend configuration

- deployment steps

- pipeline setup

✅ Summary

This project shows:

- How to design a complete cloud architecture in Azure

- How to deploy infrastructure with Terraform modules

- How to host, secure, and monitor a real Node.js application

- How to automate deployments with GitHub Actions Azure Web App + SQL Infrastructure (Terraform + CI/CD + Monitoring) 
