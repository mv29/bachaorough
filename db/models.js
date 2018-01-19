// Sequelize  is an ORM (Object/Relational Mapper) which provides easy access to MySQL,

const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

const db = new Sequelize('paisabachao', 'mrinalverma', 'solarpower29', {
    dialect: 'mysql',
});
// users table
const User = db.define('users', { // define(hook) used for creating a new table in my db database table name is users
    id: {                         // defining the property of the id which will refer to are rows
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {               // defining the columns , first column is of username,columns can also have properties
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: DataTypes.STRING // second column of passwords
});
// user expenditure table
const User_expenditure1 = db.define('expenditures1', { // define(hook) used for creating a new table in my db database table name is users
    id: {                         // defining the property of the id which will refer to are rows
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
    },
    food: {
        type: DataTypes.FLOAT,
    },
    clothing: {
        type: DataTypes.FLOAT,
    },
    travel: {
        type: DataTypes.FLOAT,
   }
});

db.sync().then(() => "Database created");
// for synchronizing our database
exports = module.exports = {
    db,  // exporting the database
    User,// exporting the users table
    User_expenditure1,
};