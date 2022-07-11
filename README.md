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

Images folder - contains all images for gallery.  

# Building

To build the project run the `npm run build` command from the project root directory.  
To start watching the files run the `npm run watch` command from the project root directory.

# Launching

Run the command `npm run start` from the project root directory to start the backend.  

Run the local server using VS Code or Webstorm from the `./built/login.html` file.  
A page `http://127.0.0.1:5500/login.html` will be opened in a browser.

Enter a valid email and password and click on the login button.  
A first page of a gallery will be opened:

`http://127.0.0.1:5500/gallery.html?page=1`
