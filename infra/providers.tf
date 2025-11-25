terraform {
  required_version = ">= 1.7.0"

  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = ">= 4.0.0"
    }
  }

  backend "azurerm" {
    resource_group_name  = "rg-tfstate-webapp-dev"
    storage_account_name = "tfstateo7qcuh"
    container_name       = "tfstate"
    key                  = "project-webapp-dev/dev.tfstate"
  }
}

provider "azurerm" {
  features {}

    subscription_id = "f8a946a6-285f-4c05-aacc-af58cf415cb5"
    tenant_id       = "5829ce3d-d548-4479-a9b8-480c5b9cd398"


}
