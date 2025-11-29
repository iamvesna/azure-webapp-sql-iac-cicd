module "core" {
  source   = "../../modules/core"
  prefix   = var.prefix
  env      = var.env
  location = var.location
  tags     = var.tags
}

module "keyvault" {
  source              = "../../modules/keyvault"
  prefix              = var.prefix
  env                 = var.env
  location            = var.location
  resource_group_name = module.core.rg_name

  sql_admin_user      = var.sql_admin_user
  sql_admin_password  = var.sql_admin_password
}

module "sql" {
  source              = "../../modules/sql"
  rg_name             = module.core.rg_name
  prefix              = var.prefix
  env                 = var.env
  location            = var.location
  tags                = var.tags

  key_vault_id        = module.keyvault.key_vault_id

  
  depends_on = [
    module.keyvault
  ]
}

module "appservice" {
  source                = "../../modules/appservice"
  rg_name               = module.core.rg_name
  prefix                = var.prefix
  env                   = var.env
  location              = var.location
  tags                  = var.tags
  appi_cstr             = module.core.appi_cstr
  sql_connection_string = module.sql.sql_connection_string
}
