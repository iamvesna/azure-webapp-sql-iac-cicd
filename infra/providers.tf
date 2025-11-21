terraform {
  required_version = ">= 1.7.0"

  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = ">= 4.0.0"
    }
  }

  backend "azurerm" {
    resource_group_name  = "rg-tfstate-shared"
    storage_account_name = "tfstatewebapp12345"
    container_name       = "tfstate"
    key                  = "project1/dev.tfstate"
  }
}

provider "azurerm" {
  features {}
  
  subscription_id = "50431439-8ad0-487c-af3e-5cbc7bdf3318"
  tenant_id       = "09b37f2d-cc3e-4bae-899a-fb3d45c10895"

}
