# Project Information


## npm modules used in it
- **cors**: as a middleware for express application
- **bodyParser**: as a middleware for express application
- **sequelize**: sequelize orm for working with the mysql
- **dotenv**: to store sensitive information
- **joi**: for validations
- **mysql2**: for database

### Endpoints
- [Register User](http://localhost:8080/api/add-user)
- [find users](http://localhost:8080/api/users)
- [query params] (name, age, dob, page, pageSize, sortField, sortOrder asc or desc)
- [find user with query params](http://localhost:8080/api/users?name=ram&age=20-50&dob=1995-06-24-2000-06-24&page=2&pageSize=10&sortField=email&sortOrder=desc)

####
email will be unique
date of birth will be in ISO formar YYYY-MM-DD

