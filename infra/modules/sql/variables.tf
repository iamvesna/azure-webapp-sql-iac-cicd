variable "rg_name" {
  type = string
}

variable "location" {
  type = string
}

variable "prefix" {
  type = string
}

variable "env" {
  type = string
}

variable "sql_admin_user" {
  type        = string
  description = "SQL administrator username"
}

variable "sql_admin_password" {
  type        = string
  sensitive   = true
  description = "SQL administrator password"
}
