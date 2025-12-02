📘 Azure Web App + SQL + Key Vault + Monitoring + CI/CD
Fully Automated Azure Cloud Environment (Terraform + GitHub Actions)

This project provisions a complete cloud application environment on Microsoft Azure.
It includes a Web App, SQL Database, secure secret handling with Key Vault, full monitoring, and an automated CI/CD pipeline.
All infrastructure is deployed and updated using Terraform, while every push to the main branch triggers an automated deployment via GitHub Actions.



📂 Repository Structure
azure-webapp-sql-iac-cicd/
│
├── app/                               # Node.js application
│   ├── server.js                      # Express server (health endpoint + SQL connection)
│   ├── package.json                   # App dependencies
│   └── package-lock.json
│
├── .github/workflows/
│   └── deploy.yml                     # CI/CD: build + deploy to Azure App Service
│
├── infra/                             # Terraform IaC
│   ├── envs/
│   │   └── dev/                       # Environment-specific configuration
│   │       ├── main.tf                # Module composition
│   │       ├── providers.tf           # Backend + provider settings
│   │       ├── variables.tf           # Input variables
│   │       ├── outputs.tf             # Outputs
│   │       └── terraform.tfvars       # Dev environment values
│   │
│   └── modules/                       # Reusable Terraform modules
│       ├── core/                      # RG + Log Analytics + App Insights
│       ├── keyvault/                  # Key Vault + SQL admin secrets
│       ├── sql/                       # SQL Server + DB + KV references
│       └── appservice/                # Plan + Web App + identity + KV references
│
├── docs/
│   ├── runbook.md                     # Step-by-step deployment guide
│   ├── troubleshooting.md             # Identity + Key Vault issues
│   ├── architecture-diagrams/         # PNG diagrams (modules + pipeline)
│   └── screenshots/                   # Working application screenshots
│
└── README.md




🏗️ Infrastructure Overview

All resources are deployed using Terraform in a clean, modular structure.

1. Resource Group (foundation)

Central container for all Azure resources.

2. App Service Plan (compute layer)

Defines the compute capacity for hosting the Web App.

3. Azure Web App (application layer)

Runs a Node.js backend that:

exposes HTTP endpoints

connects to Azure SQL Database

retrieves secrets from Key Vault via Key Vault References

sends telemetry to Application Insights

includes a /healthz endpoint

4. Azure SQL Server + SQL Database (data layer)

A fully managed relational database.
Credentials are never stored in code or app settings.
Only in Azure Key Vault.

5. Azure Key Vault (security layer)

Stores:

SQL admin username

SQL admin password

The Web App accesses secrets using Managed Identity + Key Vault References.

6. Application Insights (runtime monitoring)

Provides automatic telemetry:

requests

SQL dependencies

exceptions

performance metrics

live metrics

7. Log Analytics Workspace (log storage)

Stores logs for dashboards, KQL queries, and troubleshooting.




🔄 CI/CD Pipeline (GitHub Actions)

Triggered by a push to main:

1. Install Node.js dependencies

2. Build + package the application

3. Deploy to Azure App Service

4. Application updates automatically



📐 Architecture Diagrams

Available in /docs/architecture-diagrams/:

1. Modules Diagram

Terraform modules and how they connect

2. Services & Pipeline Diagram

CI/CD flow and how the Azure services interact



🧭 Environment Recreation

The full environment can be recreated from scratch.
Detailed instructions are documented in:

📄 docs/runbook.md

Includes:

setup

Terraform backend configuration

init, plan, apply steps

CI/CD configuration

troubleshooting



✅ Summary

This project demonstrates:

- A fully automated cloud architecture on Azure

-  Modular Terraform IaC with environment separation

-  A real Node.js application deployed to App Service

-  Secure secret handling with Managed Identity + Key Vault

-  Full observability using App Insights + Log Analytics

-  Automated CI/CD deployments with GitHub Actions