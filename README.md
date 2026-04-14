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
 - role enum["user", "admin"]
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
 - admin (ObjectId) - ref(Users)
 - createdAt (Date)

### Registrations
 - _id (ObjectId)
 - eventId (ObjectId) ref(Events)
 - userId (ObjectId) ref(Users)
 - status enum["registered", "cancelled"]
 - createdAt (Date)