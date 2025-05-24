variable "region" {
  type = string
}

variable "allowed_ports_from_public_to_web" {
  type    = set(number)
  default = []
}

variable "private_key" {
  type = string
}

variable "api_base_url" {
  type = string
}

variable "jwt_secret" {
  type = string
}

variable "jwt_max_age" {
  type = string
}