// Sequelize  is an ORM (Object/Relational Mapper) which provides easy access to MySQL,

const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

const db = new Sequelize('paisabachao', 'mrinal', 'mrinalverma', {
    dialect: 'mysql',
});
// users table
const User = db.define('user', { // define(hook) used for creating a new table in my db database table name is users
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
    password:
    {
        type:DataTypes.STRING ,// second column of passwords
        allowNull: true
 }
});
// user expenditure table
const User_expenditure = db.define('expenditures', { // define(hook) used for creating a new table in my db database table name is users
    id: {                         // defining the property of the id which will refer to are rows
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username:{
        type: DataTypes.STRING,
        unique: false,  // for expenditures table username has to be unique so that other entries of the same users expenditure can be added
        allowNull: false
    },
    year:{
        type: DataTypes.INTEGER,
    },
    month:{
        type: DataTypes.INTEGER,
    },
    date:{
        type: DataTypes.INTEGER,
    },
    food: {
        type: DataTypes.FLOAT,
    },
    clothing: {
        type: DataTypes.FLOAT,
    },
    travel: {
        type: DataTypes.FLOAT,
   },
    entertainment: {
        type: DataTypes.FLOAT,
    }
});

db.sync().then(() => "Database created");
// for synchronizing our database
exports = module.exports = {
    db,  // exporting the database
    User,// exporting the users table
    User_expenditure,
};