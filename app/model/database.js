import Sequelize from 'sequelize';

export const database = new Sequelize('trading', null, null, {
    dialect: 'sqlite',

    // SQLite only
    storage: './data.sqlite'
});
