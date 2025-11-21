resource "azurerm_service_plan" "plan" {
  name                = "plan-${var.prefix}-${var.env}"
  location            = var.location
  resource_group_name = var.rg_name
  os_type             = "Linux"
  sku_name            = "P0v3"  # small, production-like; can use B1 to be cheaper
  tags                = var.tags
}

resource "azurerm_linux_web_app" "app" {
  name                = "app-${var.prefix}-${var.env}"
  location            = var.location
  resource_group_name = var.rg_name
  service_plan_id     = azurerm_service_plan.plan.id

  identity { type = "SystemAssigned" }  # for future: managed identity

  site_config {
    application_stack {
      node_version = "20-lts"           # App Service runtime
    }

    health_check_path                  = "/healthz"  # used for safe deploys
    health_check_eviction_time_in_min  = 2           # after 2 min unhealthy, remove instance
  }

  app_settings = {
    "APPLICATIONINSIGHTS_CONNECTION_STRING" = var.appi_cstr
    "WEBSITE_RUN_FROM_PACKAGE"              = "1"
  }

  https_only = true
  tags       = var.tags
}

resource "azurerm_linux_web_app_slot" "staging" {
  name           = "staging"
  app_service_id = azurerm_linux_web_app.app.id

  site_config {
    health_check_path                 = "/healthz"
    health_check_eviction_time_in_min = 2
  }

  app_settings = {
    "APPLICATIONINSIGHTS_CONNECTION_STRING" = var.appi_cstr
    "WEBSITE_RUN_FROM_PACKAGE"              = "1"
    "SQL_CONNECTION_STRING"                 = var.sql_connection_string
  }
}

output "app_name" {
  value = azurerm_linux_web_app.app.name
}

output "app_default_hostname" {
  value = azurerm_linux_web_app.app.default_hostname
}
