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

  sql_connection_string = module.sql.sql_connection_string
}

output "resource_group" { value = module.core.rg_name }
output "app_name" { value = module.app.app_name }
output "app_default_hostname" { value = module.app.app_default_hostname }


module "sql" {
  source   = "./modules/sql"
  rg_name  = module.core.rg_name
  prefix   = var.prefix
  env      = var.env
  location = var.location

  sql_admin_user     = var.sql_admin_user
  sql_admin_password = var.sql_admin_password
}

