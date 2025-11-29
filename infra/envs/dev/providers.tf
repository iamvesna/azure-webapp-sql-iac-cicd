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

  subscription_id = var.subscription_id
  tenant_id       = var.tenant_id
}
