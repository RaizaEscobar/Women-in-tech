# WIT - Women In Tech

## Description

Application made by women for women! The purpose of our application is to close the gender gap that exists in the tech industry, by helping women who work in the tech sector to network through events. Our main goal is to motivate more women to build businesses or to choose a career in the digital industry because we believe the future of tech is female :) 

## User Stories

- **homepage** - As a user I want to be able to access the homepage so that I see what the app is about and login and signup-

- **sign up** - As a user I want to sign up on the webpage so that I can see the whole content of the webpage

- **login** - As a user I want to be able to log in on the webpage so that I can see all the events that I could attend, create new ones and modify the ones that I have already created

- **logout** - As a user I want to be able to log out from the webpage so that I can make sure no one will access my account

- **events list** - As a user I want to see all the events available so that I can choose which ones I want to attend

- **events create** - As a user I want to create an event 

- **events detail** - As a user I want to see the event details and attendee list 

- **event attend** - As a user I want to be able to attend to event so that the organizers can count me in

## Backlog

List of other features outside of the MVPs scope

-	Job Portal: The user can post/search job offers

## ROUTES:

## Server Routes (Back-end):

| **Method** | **Route**                    | **Description**                                              | Request - Body                                            |
| ---------- | ---------------------------- | ------------------------------------------------------------ | --------------------------------------------------------- |
| `GET`      | `/`                          | Main page route. Renders home `index` view or `dashboard` if user is logged in                                           |
| `GET`      | `/login`                     | Renders `login` form view.                                   |                                                           |
| `POST`     | `/login`                     | Sends Login form data to the server.                         | { email, password }                                       |
| `GET`      | `/signup`                    | Renders `signup` form view.                                  |                                                           |
| `POST`     | `/signup`                    | Sends Sign Up info to the server and creates user in the DB. | { name, email, password, repeat password }                |
| `GET`      | `/logout`                    | Logs user out of the page. Redirect to the `home`.           |                                                           |  
|  `GET`     | `/allEvents`                | Private route. Renders `allEvents` form. view.               |                                                           | 
| `GET`      | `/createEvents`              | Private route. Renders `createEvents` form view.             |                                                           |
| `POST`     | `/createEvents`              | Private route. Renders `createEvents` form view, Sends edit-event info to server and updates user in DB. Redirects to `/myEvents`.   | {name, date, location, description, price, image, limit}  |
| `GET`      | `/myEventsCreated`                  | Private route. Renders `myEvents` form view.                 |                                                           |
| `POST`     | `/myEventsCreated/:id/editEvent`    | Private route. Sends edit-events of each event to server and updates it in DB. Redirects to `dashboard`. | {name, date, location, description, price, image, limit}       | 
| `GET`      |  `/detailEvents/:id`         | Private Route. Render `detailEvents` view for the particular event.         |
| `GET`      | `/attendEvents/`             | Private Route. Render `attendEvents` view.
| `POST`     | `/attendEvents/`            | Private Route. Sends edit-event info to server and updates user in DB. | {assistance}                                    |

  
 
## Models

User model
 ```
  nickname: String,
  email: String,
  password: String
```
  


Event model

```
  title: String,
  description: String,
  date: Date,
  location: String,
  type: {type: String, enum: ['conference', 'meet up', 'courses', 'talks','other']},
  image: String,
  limit: Number,
  creator: Number,
```
Attendee Model

```

eventId: Schema.Types.ObjectId,
userId: Schema.Types.ObjectId,
assistance: Boolean

```


## WireFrames

<img src="/public/images/wireframes/1.JPG" alt="" heigth="200px">
<img src="/public/images/wireframes/2.JPG" alt="" heigth="200px">
<img src="/public/images/wireframes/3.JPG" alt="" heigth="200px">
<img src="/public/images/wireframes/4.JPG" alt="" heigth="200px">
<img src="/public/images/wireframes/5.JPG" alt="" heigth="200px">
<img src="/public/images/wireframes/6.JPG" alt="" heigth="200px">
<img src="/public/images/wireframes/7.JPG" alt="" heigth="200px">
<img src="/public/images/wireframes/8.JPG" alt="" heigth="200px">
<img src="/public/images/wireframes/9.JPG" alt="" heigth="200px">


## Links

### Trello

https://trello.com/b/QRslGGVn/women-in-tech

### Google Drive

https://docs.google.com/document/d/1CVqdtmQ45kMO30WnEd4hUs8AtKss50icntiMrz-WACM/edit?usp=sharing


### Git

The url to your repository and to your deployed project

[Repository Link](http://github.com)

[Deploy Link](http://heroku.com)

### Slides

The url to your presentation slides

[Slides Link](http://slides.com)









