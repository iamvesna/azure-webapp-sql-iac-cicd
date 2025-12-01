variable "rg_name" {
  type = string
}

variable "prefix" {
  type = string
}

variable "env" {
  type = string
}

variable "location" {
  type = string
}

variable "tags" {
  type = map(string)
}

variable "appi_cstr" {
  type = string
}


variable "sql_server_name" {
  type = string
}

variable "sql_database_name" {
  type = string
}

variable "sql_admin_user" {
  type = string
}

variable "sql_admin_password_secret_uri" {
  type = string
}
