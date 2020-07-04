import mongoose from 'mongoose';
import dotenv from 'dotenv';
import studentModel from '../models/studentModel.js';
dotenv.config();
const { USERDB, PSWDDB, SITEDB, BASEDB, PRMTDB } = process.env;
const db = {};
db.mongoose = mongoose;
db.url = `mongodb+srv://${USERDB}:${PSWDDB}@${SITEDB}/${BASEDB}?${PRMTDB}`;
db.model = studentModel(mongoose);

export { db };
