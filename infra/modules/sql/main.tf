resource "azurerm_mssql_server" "sql" {
  name                         = "sql-${var.prefix}-${var.env}"
  resource_group_name          = var.rg_name
  location                     = var.location
  version                      = "12.0"

  administrator_login          = var.sql_admin_user
  administrator_login_password = var.sql_admin_password

  tags = var.tags
}

resource "azurerm_mssql_database" "db" {
  name      = "db-${var.prefix}-${var.env}"
  server_id = azurerm_mssql_server.sql.id
  sku_name  = "Basic"
  tags      = var.tags
}

resource "azurerm_mssql_firewall_rule" "allow_azure" {
  name             = "AllowAzureServicesTF"
  server_id        = azurerm_mssql_server.sql.id
  start_ip_address = "0.0.0.0"
  end_ip_address   = "0.0.0.0"
}

