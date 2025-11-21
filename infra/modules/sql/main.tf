resource "azurerm_mssql_server" "sql" {
  name                         = "sql-${var.prefix}-${var.env}"
  resource_group_name          = var.rg_name
  location                     = var.location
  version                      = "12.0"

  administrator_login          = var.sql_admin_user
  administrator_login_password = var.sql_admin_password
}

resource "azurerm_mssql_database" "db" {
  name      = "db-${var.prefix}-${var.env}"
  server_id = azurerm_mssql_server.sql.id
  sku_name  = "Basic"
}

output "sql_connection_string" {
  value     = "Server=tcp:${azurerm_mssql_server.sql.name}.database.windows.net,1433;Database=${azurerm_mssql_database.db.name};User ID=${var.sql_admin_user};Password=${var.sql_admin_password};Encrypt=true;"
  sensitive = true
}
