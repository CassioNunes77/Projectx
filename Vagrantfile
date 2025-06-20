# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/focal64"
  config.vm.box_version = "20211026.0.0"
  
  config.vm.hostname = "virtual-girlfriend-dev"
  
  config.vm.network "forwarded_port", guest: 5000, host: 5000
  config.vm.network "forwarded_port", guest: 3000, host: 3000
  
  config.vm.provider "virtualbox" do |vb|
    vb.memory = "2048"
    vb.cpus = 2
    vb.name = "virtual-girlfriend-dev"
  end
  
  config.vm.provider "vmware_desktop" do |vmware|
    vmware.memory = "2048"
    vmware.cpus = 2
    vmware.vmx["displayName"] = "virtual-girlfriend-dev"
  end
  
  config.vm.synced_folder ".", "/vagrant", type: "rsync"
  
  config.vm.provision "shell", inline: <<-SHELL
    # Update system
    apt-get update
    apt-get upgrade -y
    
    # Install Node.js 18.x
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    apt-get install -y nodejs
    
    # Install PM2 globally
    npm install -g pm2
    
    # Install Git
    apt-get install -y git
    
    # Install build tools
    apt-get install -y build-essential
    
    # Create app directory
    mkdir -p /opt/virtual-girlfriend-ai
    chown vagrant:vagrant /opt/virtual-girlfriend-ai
    
    # Copy application files
    cp -r /vagrant/* /opt/virtual-girlfriend-ai/
    chown -R vagrant:vagrant /opt/virtual-girlfriend-ai
    
    # Install dependencies
    cd /opt/virtual-girlfriend-ai
    npm install
    cd server && npm install
    cd ../client && npm install
    
    # Create environment file
    cat > /opt/virtual-girlfriend-ai/server/.env << EOF
PORT=5000
OPENAI_API_KEY=your_openai_api_key_here
JWT_SECRET=your_jwt_secret_here
EOF
    
    # Start application
    cd /opt/virtual-girlfriend-ai
    pm2 start ecosystem.config.js --env development
    
    echo "Virtual Girlfriend AI is ready!"
    echo "Access the application at: http://localhost:5000"
  SHELL
end 