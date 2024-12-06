#!/bin/bash

# Create project directory
mkdir -p /opt/myapp
cd /opt/myapp

# Create necessary directories
mkdir -p src server public

# Create data directory for SQLite
mkdir -p data
chmod 777 data

# Start the services
docker-compose up -d --build