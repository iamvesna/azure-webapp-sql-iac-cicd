output "resource_group" {
  value = module.core.rg_name
}

output "sql_server_name" {
  value = module.sql.sql_server_name
}

output "sql_database_name" {
  value = module.sql.sql_database_name
}

output "app_name" {
  value = module.appservice.app_name
}

output "app_default_hostname" {
  value = module.appservice.app_default_hostname
}
