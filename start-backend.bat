@echo off
echo Starting Tourism Agency Backend Server...
echo.

cd backend

echo Installing dependencies...
call npm install

echo.
echo Starting server...
echo Default Admin Credentials:
echo Email: admin@WRtour.com
echo Password: Admin123!
echo.
echo Server will start on http://localhost:5000
echo.

call npm run dev

pause
