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
