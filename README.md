# VoiceCall-Application
Call from one number to another number for specific time duration using NodeJS and ReactJS

Steps to use the application:
1) run ngrok on the port on which you are running node app. (./ngrok http 3000)
Copy the live link from ngrok portal to .env file and frontend-voice-app/public/Components/Form -> api.post
2) Put APIKEY, APISECRET and APPLICATIONID from vonage account into
 backend-voice-app .env file (Configure .env file)
3) Run schema.sql from backend-voice-app folder to create database and tables


To run the application
1) run the backend using node index.js
2) run the frontend using npm start

Enter two numbers into the form (the numbers have to be registered in vonage account)
Click call button.
After the call disconnects, db will be updated