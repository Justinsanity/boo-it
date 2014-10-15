# README #

This README would normally document whatever steps are necessary to get your application up and running.

### What is this repository for? ###

* Quick summary
    just boo it!
* Version
   ver0.01
* [Learn Markdown](https://bitbucket.org/tutorials/markdowndemo)

### How do I get set up? ###

* Summary of set up
* Configuration
* `Dependencies`
	* Gem Packages: sinatra, em-websocket, mongo(module) , bson_ext
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
1. Backend Language: Ruby (2.1.2)
2. Framework: Sinatra
3. Files:
	* au\_boo\_d.rb - authentic server. (Controller)
	* ch\_boo\_d.rb - Boo it! server. (Model)
 	* views - contains all pages that display works. most of them implemented in HAML format.
  	* public - contains all resource, such as images, Javascript, and CSS.
   * test - some testing files for developing duration.
4. Database: MongoDB

### Working flow
1. Use 2 terminals and make both of them enter the boo-it directory.
2. Use `ruby au_boo_d.rb` and `ruby ch_boo_d.rb` to launch server respectively.
3. Open your browser with 2 tabs.
4. Connect to url `localhost:4567` for both tabs. Then you got a **NOT FOUND** message. Please wait for 3 seconds and you'll be redirected to login page.
5. Enter account info with 2 different users.
6. **DOUBLE CLICKS** to select friend you want to chat with, here, the object was these 2 users.
7. Enjoy your conversation！

### How it work?

There are 2 servers serving for service, au\_boo\_d.rb and ch\_boo\_d.rb. The former roles as controller. When a user request to server. au\_boo\_d.rb does authentication and routing if account is valid; while the latter roles as model which interact with database.

When a connection is built. It initially located at root directory(/). There is no service in root directory, so the controller(au\_boo\_d.rb) will redirect it to page "logout". Since it logout(or say, not actually logout, it just visit this site currently), the page will redirect it to hello.haml, which provides a login portal for users.

### Demo
Video available here: [https://www.youtube.com/watch?v=cnwJHSsJotI](https://www.youtube.com/watch?v=cnwJHSsJotI)