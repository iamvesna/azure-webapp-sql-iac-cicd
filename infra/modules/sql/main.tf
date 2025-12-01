resource "azurerm_mssql_server" "sql" {
  name                         = "sql-${var.prefix}-${var.env}"
  resource_group_name          = var.rg_name
  location                     = var.location
  version                      = "12.0"

  administrator_login          = data.azurerm_key_vault_secret.sql_admin_user.value
  administrator_login_password = data.azurerm_key_vault_secret.sql_admin_password.value

  tags = var.tags
}

resource "azurerm_mssql_database" "db" {
  name      = "db-${var.prefix}-${var.env}"
  server_id = azurerm_mssql_server.sql.id
  sku_name  = "Basic"
  tags      = var.tags
}

resource "azurerm_mssql_firewall_rule" "my_ip" {
  name             = "AllowMyLocalIP"
  server_id        = azurerm_mssql_server.sql.id
  start_ip_address = var.my_public_ip
  end_ip_address   = var.my_public_ip
}

resource "azurerm_mssql_firewall_rule" "appservice_ips" {
  for_each         = toset(var.outbound_ips)
  name             = "AppService-${each.key}"
  server_id        = azurerm_mssql_server.sql.id
  start_ip_address = each.value
  end_ip_address   = each.value
}



data "azurerm_key_vault_secret" "sql_admin_user" {
  name         = "sql-admin-user"
  key_vault_id = var.key_vault_id
}

data "azurerm_key_vault_secret" "sql_admin_password" {
  name         = "sql-admin-password"
  key_vault_id = var.key_vault_id
}
