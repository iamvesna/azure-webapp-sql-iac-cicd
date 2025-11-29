variable "prefix" {
  type = string
}

variable "env" {
  type = string
}

variable "location" {
  type = string
}

variable "resource_group_name" {
  type = string
}

variable "sql_admin_user" {
  type      = string
}

variable "sql_admin_password" {
  type      = string
  sensitive = true
}
