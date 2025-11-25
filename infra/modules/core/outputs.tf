output "rg_name" {
  value = azurerm_resource_group.rg.name
}

output "appi_cstr" {
  value = azurerm_application_insights.appi.connection_string
}
