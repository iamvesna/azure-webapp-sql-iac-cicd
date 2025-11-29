variable "prefix" {
  type = string
}

variable "env" {
  type = string
}

variable "location" {
  type    = string
  default = "centralus"
}

variable "tags" {
  type = map(string)
}

variable "my_public_ip" {
  type        = string
  default     = "0.0.0.0"
}
variable "subscription_id" {
  type = string
}

variable "tenant_id" {
  type = string
}
