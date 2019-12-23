# Auth with Rails API & React front end

## Objectives

- Define authentication and authorization
- Review Rails auth
- Identity the problem
- Identity solutions
- Define JWT - JSON Web Tokens
- Define local storage
- compare/contrast local storage and cookies
- talk about some advantages/dangers using browser storage

## Authentication

Definition: You are who you say you are!

### The old fashioned way with Rails

How did we authenticate in Rails?

Credentials: combination of a unique identifier, usually username or email and a password (SessionsController, usually)
We would use the `#authenticate` method, from ActiveRecord which requires bcrypt and `has_secure_password`

## Authorization

Definition: Once we know who you are, are you allowed to do the thing you're trying to do? - can be any request (get, put, post, patch, delete)

### The old fashioned way with Rails
How did we authorize in Rails?

combination of session hash (which was sent and stored in cookies on the browser), and helper methods such as `#current_user`, `#logged_in?`, maybe `#authorize_resource`

Rails flow:

User Login -> credentials -> authenticated -> session stores a unique ID -> store the session in cookies including the ID
  - then, with with request for authorization, Rails just looks and says "is session holding an ID" if so "is it the right one"

First GOAL:

1. Login and get a current user
