resource "azurerm_service_plan" "plan" {
  name                = "plan-${var.prefix}-${var.env}"
  location            = var.location
  resource_group_name = var.rg_name
  os_type             = "Linux"
  sku_name            = "S1"
  tags                = var.tags
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
    SCM_DO_BUILD_DURING_DEPLOYMENT        = "true"

    # CORRECT VARIABLE-BASED VALUES
    SQL_SERVER   = var.sql_server_name
    SQL_DATABASE = var.sql_database_name
    SQL_USER     = var.sql_admin_user
    SQL_PASSWORD = "@Microsoft.KeyVault(SecretUri=${var.sql_admin_password_secret_uri})"
  }

  tags = var.tags
}
