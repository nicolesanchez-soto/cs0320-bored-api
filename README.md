# CS0320 Bored API  
A simple and fun API for CS0320 students to get random, CS0320-themed activities.

## About  
This API generates random activities related to CS0320, Brown University's Introduction to Software Engineering course, taught by Tim Nelson.  
Use this API to:
- Get a random CS0320-related activity.
- Filter activities by participant count.
- Get a list of all available activities.

## Features
- Simple Express.js backend with JSON responses.
- Endpoints to retrieve random or filtered activities.
- Extensive Jest & Supertest test suite for reliability.
- Deployed and ready for public use.

---

## Installation & Setup  

### Clone the Repository
```sh
git clone https://github.com/nicolesanchez-soto/cs0320-bored-api.git
cd cs0320-bored-api
```

### Install Dependencies 
Make sure you have Node.js installed, then run:
```sh
npm install
```

### Jest for Testing
To ensure you can run tests, install Jest and Supertest:
```sh
npm install --save-dev jest supertest
```
### Start the Server
Run the server locally:
```sh
node server.js
```
The API should now be running at:
http://localhost:3232


## Running Tests

### Run All Tests
```sh
npm test
```
### Debug Jest Issues
If Jest hangs after running tests, use:
```sh
npm test -- --detectOpenHandles
```

## API Endpoints

### Root Route
#### `GET /`
**Description:** Displays a welcome message with API usage details.  

### Get a Random Activity
#### `GET /api/activity /`
**Description:** Returns a random CS0320-themed activity. 

### Filter by Participants
#### `GET /api/activity?participants={num}`
**Description:**  Returns a random activity with the specified participant count.

### Get All Activities
#### `GET /api/activities`
**Description:**  Returns a list of all activities.

### Get All Activities by Participants
#### `GET /api/activities/filter?participants={num}`
**Description:**  Returns all activities that match the specified number of participants.

