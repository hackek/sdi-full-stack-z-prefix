# The Pokemon Exchange [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Table of Contents
1. [Usage](#usage)
2. [Installation](#installation)
3. [Features](#features)
4. [Database](#features)
5. [Server](#features)
6. [Client](#features)
7. [Contributions](#contributions)
---
<br>

## Usage
In a world where people train pokemon, it can be hard to find the perfect trade between trainers, that is, until the pokemon_exchange came to be! Taking a lesson from the Stock Exchange, a facsimile was created by trainers, for trainers. After a quick registration or login, Pokemon trainers can list their pokemon's name, a brief description, and how many they have available to trade.
---
---
<br>

## Installation

### The Local Setup
* **OPTIONAL:** fork your own copy of the main repo
* clone the repo
* navigate to the local directory housing your repo
* install the needed dependencies from your local repo's root directory
* **NOTE:** A post-install script will automatically install dependencies in applicable subfolders
```
$ gh repo clone hackek/sdi-full-stack-z-prefix
$ cd ../path/to/the/local/repo
$ npm install
```

### The Database Server
* navigate from the repo's local directory to the `server` subfolder
* run `npm run clean-db` to initialize and/or reset the database migrations and seed files
* run `npm run dev` to start up the database server
* navigate to `localhost:3001/` in your local browser to view database requests
* **NOTE:** the server by default will run on your local host at port 3001
```
$ cd server
$ npm run clean-db
$ npm run dev
```

### The User Application
* navigate from the repo's local directory to the `client` subfolder
* run `npm start` to start up the application
* navigate to `localhost:3000/` in your local browser to view the application
* **NOTE:** the application by default will run on your local host at port 3000
```
$ cd client
$ npm start
```
---
<br>

## Features

### Home - localhost://3000/
> Authenticated Users can see all items
> Visitors can see all items
> Displayed items have descriptions limited to 100 characters, followed by "..."
> All Users can select an item to view in detail, redirecting to Detail
> All Users can select the login/logout button, redirecting to Login

### Login - localhost://3000/login
> Users are required to input all required information for successful authentication
> Users who have an existing account will be logged in upon authentication
> Users who do not have an existing account will have one made using the provided information and logged in
> All users when successfully logged in will be redirected to Home

### Detail - localhost://3000/detail/:id

> All Users can view the item name, description, and quantity
> User Item Owners can edit the item
> User Item Owners can delete the item
> All Users can select the login/logout button, redirecting to Login
---
<br>

## Database
- Users (One to many [Users to Items])
  > Id          (number)  (Pk)
  > FirstName   (string)
  > LastName    (string)
  > Username    (string)
  > Password    (string)

- Items
  > Id          (number)  (Pk)
  > UserId      (number)  (Fk Users)
  > ItemName    (string)
  > Description (string)
  > Quantity    (number)
---
<br>

## Server

### CREATE ITEM - POST /
    (SESSION COOKIE VALIDATION)
    FROM FRONT END
    {
      "UserId":       sessionUserId,
      "ItemName":     ItemName,
      "Description":  Description,
      "Quantity":     Quantity
    }
    INSERT INTO items

### EDIT ITEM - PATCH /DETAIL/:ID
    (SESSION COOKIE VALIDATION)
    FROM FRONT END
    {
      "UserId":       sessionUserId,
      "ItemName":     ItemName,
      "Description":  Description,
      "Quantity":     Quantity
    }
    UPDATE INTO items


### DELETE ITEM - DEL /DETAIL/:ID
    (SESSION COOKIE VALIDATION)
    FROM FRONT END

    DELETE INTO items

### CREATE USER - POST /LOGIN
    (NEW USER CREATION)
    (EXISTING USER AUTHENTICATION)
    (SESSION COOKIE UPDATE)
    FROM FRONT END
    {
      "FirstName":  FirstName,
      "LastName":   LastName,
      "Username":   Username,
      "Password":   Password
    }
    INSERT INTO users

### ERROR HANDLING - ALL /*
    Status(404)
---
<br>

## Client

### LOGIN PAGE - localhost://CLIENT_PORT/LOGIN
    (SESSION COOKIE RECEIVED)
    POST - req.body
    {
      "FirstName": FirstName,
      "LastName": LastName,
      "Username": username,
      "Password": Password
    }
    Session Cookie
    {
      "UserId": UserId
      "Username": Username
    }
    (REDIRECT TO HOME PAGE ONCE LOGGED IN)

### HOME PAGE - localhost://CLIENT_PORT/
    (SESSION COOKIE RECEIVED)
    GET all items - res
    [{
      "id":           id,
      "UserId":       sessionUserId,
      "ItemName":     ItemName,
      "Description":  Description,
      "Quantity":     Quantity
    }, ... ]

#### ITEM VIEW - localhost://CLIENT_PORT/DETAIL/:ID
    GET "id" items - res
    [{
      "id":           id,
      "UserId":       sessionUserId,
      "ItemName":     ItemName,
      "Description":  Description,
      "Quantity":     Quantity
    }]
---
<br>

## Contributions
### Sponsor
The Pokemon Exchange is brought to you by The Sorcerer's Guild, where you too can learn to wield the wonders of magic:
* **Arcanum** @ https://github.com/Harkerfield/sdi-blended-project2-scaffold

### Code Author
To see more paragons of programming, check out the project contributor:
* **Kyle Hackett** @ https://github.com/hackek