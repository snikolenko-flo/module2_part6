# Gallery app

There is a login page with email and password fields.  
A user fills out the fields and clicks on the login button.  
The app sends a POST request to `http://127.0.0.1:3000/login`
with user data.

Server sends back a token or an error message.  
The token will be expired after 10 minutes.

After authorization is finished the app sends a GET request to `http://127.0.0.1:3000/gallery`  
Server sends back images urls. The app wrap them into html and displays to the user.

# Project structure

Backend part.

- data - contains some constants
- gallery - module that is responsible for processing requests and sending images to the client
- images - contains all images for gallery
- interfaces - contains interfaces
- login - module that is responsible for checking user credentials and sending an auth token to the user
- services - contains additional services
- users - contains a data about users that are allowed to use this app
- app.ts - entry point for all requests
  
Frontend part.

- css - contains css files
- data - contains additional data
- gallery - module that is responsible for getting images from a server and rendering them
- html - contains html files
- interfaces - contains interfaces
- login - module that is responsible for validating user input and login
- services - contains additional services
- signup - module that is responsible for validating user input and signup

# Set up

Create .env file in the root of the project.  
Set the next variables in the file:

- HOST=127.0.0.1
- PORT=3000
- IMAGES_DIR=./built/backend/images
- BASE_URL=http://127.0.0.1:3000
- STAGE=dev 
- MONGO_URL=mongodb://localhost:27017/test
- SECRET=TOP_SECRET

If you set STAGE="local" all logs will be written to log files.  
If you set any other value, e.g. STAGE="dev", logs will be displayed in the console.

# Launching

Run the command `npm run start` from the project root directory to build and start the app.  
Open the page `http://127.0.0.1:3000/` in a browser.

Enter valid email and password and click on the login button.  
A first page of a gallery will be opened:

`http://127.0.0.1:3000/gallery.html?page=1`

You can set limit for number of images. E.g.:  

`http://127.0.0.1:3000/gallery.html?page=1&limit=50`

And you also can filter images by user. E.g.:

`http://127.0.0.1:3000/gallery.html?page=1&limit=1&filter=user@mail.com`

To start the app via pm2 run the command:  

`pm2 start npm -- start`
