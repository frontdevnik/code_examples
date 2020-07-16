Simple JSON server for "Movies" project

To start using it, you have to clone this repo and do:

```npm install```
 or
```$ yarn ```

inside server folder you can run it with

```$ npm start```
 or
```$ yarn start```

it will start on localhost:3001

it implements REST API:

### MOVIES

`` GET http://localhost:3001/movies/1``
to fetch movie by id

`` GET http://localhost:3001/movies``
to fetch all movies

``PUT http://localhost:3001/movies/1``
to update particular movie

``DELETE http://localhost:3001/movies/1``
to delete particular movie

``POST http://localhost:3001/movies``
to create particular movie

### ACTORS

`` GET http://localhost:3001/actors/1``
to fetch actor by id

`` GET http://localhost:3001/actors``
to fetch all actors

``PUT http://localhost:3001/actors/1``
to update particular actor

``DELETE http://localhost:3001/actors/1``
to delete particular actor

``POST http://localhost:3001/actors``
to create particular actor

### USERS

`` GET http://localhost:3001/users/1``
to fetch user by id

`` GET http://localhost:3001/users``
to fetch all users

## registration
``POST http://localhost:3001/users``

body example
```
{
    "name": "Vasiliy",
    "password": "123",
}
```

## login

example:
``localhost:3001/users?name=Vasiliy&password=123`` will return a user if exists for such query params


##
for PUT and POST methods, you should pass body with the request, and add headers:
```"Content-Type": "application/json"```

body example for movie update movie:

```$xslt
 {
        "id": 1,
        "title": "Blah Blah",
        "posterUrl": "https://images-na.ssl-images-amazon.com/images/M/MV5BZTRmNjQ1ZDYtNDgzMy00OGE0LWE4N2YtNTkzNWQ5ZDhlNGJmL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SY500_CR0,0,352,500_AL_.jpg",
        "stars": 4,
        "likes": 15,
        "actactorsId": [1, 2],
        "director": "Francis Ford Coppola",
        "description": "Cool movie"
    }
```



