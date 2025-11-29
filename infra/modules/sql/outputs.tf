output "sql_server_name" {
  value = azurerm_mssql_server.sql.name
}

output "sql_database_name" {
  value = azurerm_mssql_database.db.name
}

output "sql_connection_string" {
  value = "Server=tcp:${azurerm_mssql_server.sql.name}.database.windows.net,1433;Database=${azurerm_mssql_database.db.name};User ID=${data.azurerm_key_vault_secret.sql_admin_user.value};Password=${data.azurerm_key_vault_secret.sql_admin_password.value};Encrypt=true;Connection Timeout=30;"
  sensitive = true
}

