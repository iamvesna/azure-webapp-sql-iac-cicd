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

   outbound_ips = module.appservice.outbound_ips
}

module "appservice" {
  source                = "../../modules/appservice"
  rg_name               = module.core.rg_name
  prefix                = var.prefix
  env                   = var.env
  location              = var.location
  tags                  = var.tags
  appi_cstr             = module.core.appi_cstr

  sql_server_name                = module.sql.sql_server_name
  sql_database_name              = module.sql.sql_database_name
  sql_admin_user                 = data.azurerm_key_vault_secret.sql_admin_user.value
  sql_admin_password_secret_uri  = data.azurerm_key_vault_secret.sql_admin_password.id

}

data "azurerm_key_vault_secret" "sql_admin_user" {
  name         = "sql-admin-user"
  key_vault_id = module.keyvault.key_vault_id
}

data "azurerm_key_vault_secret" "sql_admin_password" {
  name         = "sql-admin-password"
  key_vault_id = module.keyvault.key_vault_id
}
