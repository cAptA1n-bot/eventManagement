# Event Management System
This is a backend system for Event Management System. The flow of the application goes like:
- A user can create an account
- Any user can crete their event
- A super admin of the platform who will review the events
- User that created the event will be the admin of their event 
- Another users can register for the event 
- Events will have a fixed capacity for guests set by the admin of that event
- User who created their event will be able to manage their event
- A users who registered for an event will be able to cancel their registration

## Data Models

### Users
 - _id (ObjectId)
 - firstName (string)
 - lastName (string)
 - email (string, unique)
 - role enum["user", "auperAdmin"]
 - password (string, hashed)
 - createdAt (Date)

### Events
 - _id (ObjectId)
 - eventName (string)
 - description (string)
 - time (startDateTime)
 - venue (string)
 - capacity (Number)
 - status enum["active", "cancelled", "ended"]
 - approvalStatus enum["pending", "approved", "rejected"]
 - admin (ObjectId) - ref(Users)
 - createdAt (Date)

### Registrations
 - _id (ObjectId)
 - eventId (ObjectId) ref(Events)
 - userId (ObjectId) ref(Users)
 - status enum["registered", "cancelled"]
 - createdAt (Date)

## APIs

 - POST - /users/signup - create a new user account 
 - POST - /users/login - login existing user 
 - GET - /users/me - get the details of the logged in user
 - POST - /events - create a new event 
 - PATCH - /events/:eventid - update an event (only by the admin of that event)
 - PATCH - /events/:eventid/cancel - cancel an event (only by the admin of that event)
 - GET - /events - get all events with filters for applied/not applied, date and location
 - GET - /events/me - get all events created by the logged in user
 - POST - /events/registrations/:eventid - register for an event
 - PATCH - /events/registrations/:eventid - cancel registration for an event
 - PATCH - /events/:eventid/review - api for super admin to review the events