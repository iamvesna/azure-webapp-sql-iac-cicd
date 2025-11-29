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


variable "my_public_ip" {
  type        = string
  default     = "0.0.0.0"
}

variable "key_vault_id" {
  type        = string
}
