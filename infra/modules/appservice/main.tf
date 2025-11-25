resource "azurerm_service_plan" "plan" {
  name                = "plan-${var.prefix}-${var.env}"
  location            = var.location
  resource_group_name = var.rg_name
  os_type             = "Linux"
  sku_name            = "S1"   # REQUIRED for deployment slots

  tags = var.tags
}

resource "azurerm_linux_web_app" "app" {
  name                = "app-${var.prefix}-${var.env}"
  location            = var.location
  resource_group_name = var.rg_name
  service_plan_id     = azurerm_service_plan.plan.id

  https_only = true

  identity { type = "SystemAssigned" }

  site_config {
    always_on = true

    application_stack {
      node_version = "20-lts"
    }

    health_check_path                 = "/healthz"
    health_check_eviction_time_in_min = 2
  }

  app_settings = {
    APPLICATIONINSIGHTS_CONNECTION_STRING = var.appi_cstr
    WEBSITE_RUN_FROM_PACKAGE              = "1"

    # Optional backup env var
    SQL_CONNECTION_STRING                 = var.sql_connection_string
  }

  connection_string {
    name  = "DefaultConnection"
    type  = "SQLAzure"
    value = var.sql_connection_string
  }

  tags = var.tags
}

# Staging slot (blue/green deployment)
resource "azurerm_linux_web_app_slot" "staging" {
  name           = "staging"
  app_service_id = azurerm_linux_web_app.app.id

  https_only = true

  site_config {
    always_on = true

    application_stack {
      node_version = "20-lts"
    }

    health_check_path                 = "/healthz"
    health_check_eviction_time_in_min = 2
  }

  app_settings = {
    APPLICATIONINSIGHTS_CONNECTION_STRING = var.appi_cstr
    WEBSITE_RUN_FROM_PACKAGE              = "1"
    SQL_CONNECTION_STRING                 = var.sql_connection_string
  }

  connection_string {
    name  = "DefaultConnection"
    type  = "SQLAzure"
    value = var.sql_connection_string
  }

  tags = var.tags
}

