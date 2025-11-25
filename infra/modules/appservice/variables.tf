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

variable "sql_connection_string" {
  type      = string
  sensitive = true
}
