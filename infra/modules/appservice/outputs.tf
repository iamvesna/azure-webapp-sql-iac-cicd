output "app_name" {
  value = azurerm_linux_web_app.app.name
}

output "app_default_hostname" {
  value = azurerm_linux_web_app.app.default_hostname
}

output "staging_slot_hostname" {
  value = azurerm_linux_web_app_slot.staging.default_hostname
}
