variable "prefix"   { type = string }                        
variable "env"      { type = string }                        # dev / prod
variable "location" { type = string default = "westeurope" } # Azure region
variable "tags"     { type = map(string) default = { owner = "vesna", environment = "dev", app = "azurewebapp" } }
