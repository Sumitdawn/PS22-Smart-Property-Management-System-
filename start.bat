@echo off
echo Starting Full-Stack Application...
echo.
echo Starting backend server...
start "Backend Server" cmd /k "cd server && npm run dev"
timeout /t 3 /nobreak > nul
echo Starting frontend client...
start "Frontend Client" cmd /k "cd client && npm start"
echo.
echo Both servers are starting...
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Demo login credentials:
echo Email: john@example.com
echo Password: password
pause