const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ApplicationFormSchema = new Schema({
    Firstname:{
        type: 'string',
        required: true,
    },
    Middlename: {
        type: 'string',
    },
    Lastname:{
        type: 'string',
    },
    Fathername: {
        type: 'string',
        required: true,
    },
    Mothername: {
        type: 'string',
        required: true,
    },
    email:{
        type: 'string',
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
    },
    mobileno: {
        type: Number,
        required: true,
        unique: true,
    },
    Gender: {
        type: 'string',
        required: true,
    },
    DOB: {
        type: 'string',
        required: true,
    },
    AadharNo: {
        type: 'number',
        required: true,
        unique: true,
    },
    class10per: {
        type: 'number',
        required: true,
    },
    class12per:{
        type: 'number',
        required: true,
    },
    class10marksheet: {
        type: Buffer,
        required: true,
    },
    class12marksheet:{
        type: Buffer,
        required: true,
    },
    course: {
        type: 'string',
        required: true,
    },
    branch:{
        type: 'string',
        required: true,
    },
},{
    timestamps: true,
});

const appform = mongoose.model('ApplicationForm',ApplicationFormSchema);

module.exports = appform;