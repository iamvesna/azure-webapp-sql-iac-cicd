variable "prefix" {
  type = string
}

variable "env" {
  type = string
}

variable "location" {
  type    = string
  default = "westeurope"
}

variable "tags" {
  type = map(string)
  default = {
    owner       = "vesna"
    environment = "dev"
    app         = "azurewebapp"
  }
}

variable "sql_admin_user" {
  type        = string
  description = "SQL Server admin username"
}

variable "sql_admin_password" {
  type        = string
  sensitive   = true
  description = "SQL Server admin password"
}
