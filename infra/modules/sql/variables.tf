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

variable "sql_admin_user" {
  type = string
}

variable "sql_admin_password" {
  type      = string
  sensitive = true
}

variable "my_public_ip" {
  type        = string
  default     = "0.0.0.0"
}