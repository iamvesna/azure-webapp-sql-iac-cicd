output "app_name" {
  value = azurerm_linux_web_app.app.name
}

output "app_default_hostname" {
  value = azurerm_linux_web_app.app.default_hostname
}

output "outbound_ips" {
  value = split(",", azurerm_linux_web_app.app.outbound_ip_addresses)
}
