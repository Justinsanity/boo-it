# README #

This README would normally document whatever steps are necessary to get your application up and running.

### What is this repository for? ###

* Quick summary
    just boo it!
* Version
   0.0.2
* [Learn Markdown](https://bitbucket.org/tutorials/markdowndemo)

### How do I get set up? ###

* Summary of set up
* Configuration
* `Dependencies`
	* Node Packages: express, jade, express-session, express-ws, mongoose
	* Others: MongoDB
* `Database configuration`: you need 2 collections(tables) to try this project. Please named the database "Boo" and create a collection with name "accounts" manually. The fields of accounts is {username, password, friends_list}. And initialize at least 2 users with username, password and relationship. **Note that you don't need to create collection named "dialog" previously.**
	* An alternative is use our sample database dump. You can find it in root directory of this project. Open your terminal and come to here, use `mongorestore Boo`, then all goes well.
* How to run tests
* Deployment instructions

### Contribution guidelines ###

* Writing tests
* Code review
* Other guidelines

### Who do I talk to? ###

* Repo owner or admin
* Other community or team contact

### Architecture
1. Backend Language: Node.js (4.4.0)
2. Framework: Express
3. Files:
 	* views - contains all pages that display works. most of them implemented in HAML format.
  	* public - contains all resource, such as images, Javascript, and CSS.
4. Database: MongoDB
    * DB: Boo
    * Table:
        * accounts
        * dialog
    
### Working flow
1. `npm start`
2. Open your browser with 2 tabs.
3. Connect to url `localhost:3000` for both tabs.
4. Enter account info with 2 different users.
5. **DOUBLE CLICKS** to select friend you want to chat with, here, the object was these 2 users.
6. Enjoy your conversation！

### How it work?

First you connect to server for requesting app page, then a websocket connection is opened. Conversation will simply via websocket of both side (client and server). 

Server will push new message either client A or client B.

### Demo Video
* [Simple Demo](http://youtu.be/ClpJUteLMJM)
* [Second Progress Demo](https://www.youtube.com/watch?v=ClpJUteLMJM)
* [Install on Firefox OS](https://www.youtube.com/watch?v=bqGWc-4Cyno)
* [Boo it runs on Firefox OS](https://www.youtube.com/watch?v=Cp1D8nkxD2o)
* [iOS and Android](https://www.youtube.com/watch?v=mgj62ozU00Y)
 
### App Download

* iOS
* Android
