resource "aws_security_group" "sg" {
  name = "mcu_internal_sg"
}

resource "aws_vpc_security_group_ingress_rule" "sg_ingress_from_public" {
  security_group_id = aws_security_group.sg.id
  ip_protocol       = "tcp"
  cidr_ipv4         = "0.0.0.0/0"

  for_each  = toset([for port in var.allowed_ports_from_public_to_web : tostring(port)])
  from_port = each.value
  to_port   = each.value
}

resource "aws_vpc_security_group_egress_rule" "sg_egress_to_internet" {
  security_group_id = aws_security_group.sg.id
  ip_protocol       = "-1"
  cidr_ipv4         = "0.0.0.0/0"
}

data "aws_ami" "ubuntu" {
  most_recent = true
  owners      = ["amazon"]

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd-gp3/ubuntu-noble-24.04-amd64-server-*"]
  }
}

resource "aws_instance" "ec2" {
  ami                    = data.aws_ami.ubuntu.image_id
  instance_type          = "t2.micro"
  key_name               = "mcu-internal-key"
  vpc_security_group_ids = [aws_security_group.sg.id]
  user_data              = file("${path.module}/web_userdata.sh")

  tags = {
    Name : "mcu_internal_website"
  }
}

locals {
  remote_web_directory = "/home/ubuntu/mcu-internal"
  background_process_name = "mcu-internal"
}

resource "null_resource" "run_web" {
  triggers = {
    always = timestamp()
  }

  connection {
    type        = "ssh"
    user        = "ubuntu"
    host        = aws_instance.ec2.public_ip
    private_key = var.private_key
  }

  provisioner "remote-exec" {
    inline = [
      "#!/bin/bash",

      "rm -rf ${local.remote_web_directory}",
      "mkdir ${local.remote_web_directory}"
    ]
  }

  provisioner "file" {
    source      = "../.next"
    destination = local.remote_web_directory
  }

  provisioner "file" {
    source      = "../package.json"
    destination = "${local.remote_web_directory}/package.json"
  }

  provisioner "file" {
    source      = "../package-lock.json"
    destination = "${local.remote_web_directory}/package-lock.json"
  }

  provisioner "file" {
    source      = "../next.config.ts"
    destination = "${local.remote_web_directory}/next.config.ts"
  }

  provisioner "remote-exec" {
    inline = [
      "#!/bin/bash",

      # Stop process if exists
      "pm2 delete ${local.background_process_name}",

      # Add environment variables
      "cd ${local.remote_web_directory}",
      "echo 'API_BASE_URL=${var.api_base_url}' > .env",
      "echo 'JWT_SECRET=${var.jwt_secret}' >> .env",
      "echo 'JWT_MAX_AGE=${var.jwt_max_age}' >> .env",

      # Build and run web
      "npm install --force --production",
      "pm2 start --name ${local.background_process_name} npm -- start"
    ]
  }
}