module "core" {
  source   = "./modules/core"
  prefix   = var.prefix
  env      = var.env
  location = var.location
  tags     = var.tags
}

module "app" {
  source    = "./modules/appservice"
  rg_name   = module.core.rg_name
  prefix    = var.prefix
  env       = var.env
  location  = var.location
  tags      = var.tags
  appi_cstr = module.core.appi_cstr
}

output "resource_group"       { value = module.core.rg_name }
output "app_name"             { value = module.app.app_name }
output "app_default_hostname" { value = module.app.app_default_hostname }
