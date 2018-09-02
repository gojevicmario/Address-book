
# Address book for HR Cloud

Address book app created as a pre internship assigment.
Created using .NET core 2.0 and Angular 6

## Assignment

The given requirments were to make a address book app which would allow creation of contacts.
Each contact can have multiple phone numbers, email addresses and tags.
The user can use CRUD (create, read, update, delete) funcionalities on all of the above. Each contact can be bookmarked.

The user can filter the contacts by name, surname and by tag.

The app is designed as a single user app.

### Prerequisites

node.js
angular CLI
.NET SDK
GIT bash


## Installing

 1. Clone the git repository. Open GIT bash and enter the following lines

```
git clone https://mgojevic@bitbucket.org/mgojevic/hrcaddressbook.git

```

 2. Update the database. Run the following commands


```
cd hrcaddressbook/AddressBook.API
dotnet ef database update
dotnet watch run
```
By visiting http://localhost:5000/api/contacts
you should see some mock data in JSON format

 3. Open a new terminal windows and run the commands. **The second  and third commands might take a while to execute**
 ```
  cd hrcaddressbook/AddressBook.API
  npm install
  ng serve
  ```
4. Visit http://localhost:4200/ to test the application
