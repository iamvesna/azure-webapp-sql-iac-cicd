module "core" {
  source   = "./modules/core"
  prefix   = var.prefix
  env      = var.env
  location = var.location
  tags     = var.tags
}

output "resource_group" { value = module.core.rg_name }
