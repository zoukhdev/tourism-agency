#!/bin/bash

echo "Starting Tourism Agency Backend Server..."
echo

cd backend

echo "Installing dependencies..."
npm install

echo
echo "Starting server..."
echo "Default Admin Credentials:"
echo "Email: admin@alhijrah.com"
echo "Password: Admin123!"
echo
echo "Server will start on http://localhost:5000"
echo

npm run dev
