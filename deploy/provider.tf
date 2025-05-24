terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  backend "s3" {
    bucket = "mcu-internal-backend-s3"
    key = "mcu-internal-state-file"
    region = "ap-southeast-1"
  }
}

provider "aws" {
  region = var.region
}