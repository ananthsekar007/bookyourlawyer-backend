import { Sequelize } from "sequelize";

const sequelize = new Sequelize("bookyourlawyer", "root", null, {
  dialect: 'mysql',
  host: 'localhost',
})

export default sequelize;