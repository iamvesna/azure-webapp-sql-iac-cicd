resource "azurerm_linux_web_app_slot" "staging" {
  name           = "staging"
  app_service_id = azurerm_linux_web_app.app.id

  site_config {
    health_check_path = "/healthz"
  }

  app_settings = {
    "APPLICATIONINSIGHTS_CONNECTION_STRING" = var.appi_cstr
    "WEBSITE_RUN_FROM_PACKAGE"              = "1"
  }
}
