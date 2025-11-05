terraform {
  required_version = ">= 1.7.0"
  required_providers { azurerm = { source = "hashicorp/azurerm", version = ">= 3.100.0" } }
  backend "azurerm" {
    resource_group_name  = "rg-tfstate-shared"
    storage_account_name = "tfstatewebapp12345"   
    container_name       = "tfstate"
    key                  = "project1/dev.tfstate"
  }
}
provider "azurerm" { features {} }
