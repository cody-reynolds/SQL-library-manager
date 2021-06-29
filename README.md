# SQL Library Manager

**Synopsis**
\
\
 This is an app that uses Express, SQLite, and Sequelize to create a library manager. The user can add, edit, and delete books from the database. The app also provides some server-side validation of the Title and Author fields, which are not allowed to be null.
\
\
**Motivation**
\
I created this project to gain some familiarity with ORMs and using ORM methods within Express. Rather than routing to views that simply call on static data (for example, in a data.json file), this project uses Sequelize's CRUD functions to manipulate that data in a library database. Building this project also gave me some practice with error handling and validation.
\
\
**Installation**
\
After installing the project's dependencies with `npm install`, you can start it up with `npm start`.


This project was created as part of the [Treehouse Full Stack JavaScript Techdegree](https://teamtreehouse.com/techdegree/full-stack-javascript).