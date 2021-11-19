
const mongoose = require('mongoose');

const user1Id = mongoose.Types.ObjectId();
const user2Id = mongoose.Types.ObjectId();

const data = {
  users : [
    {
      _id : user1Id,
      avatar: "https://cdn1.vectorstock.com/i/1000x1000/31/95/user-sign-icon-person-symbol-human-avatar-vector-12693195.jpg",
      email : "zaheer@gmail.com",
      name: "Zaheer Ahmed",
      username : "zaheer",
      info : "Hello i am zaheer ahmed",
      password : "zaheerahmedz",
      role : "admin"
    },
    {
      _id : user2Id,
      avatar: "https://cdn1.vectorstock.com/i/1000x1000/31/95/user-sign-icon-person-symbol-human-avatar-vector-12693195.jpg",
      email : "Habeeb@gmail.com",
      name: "Habeeb Ahmed",
      username : "Habeeb",
      info : "Hello i am Habeeb ahmed",
      password : "Habeebahmedz"
    }
  ],
    portfolios: [
      {
        title: 'Job in Netcentric',
        company: 'Netcentric',
        companyWebsite: 'www.google.com',
        location: 'Spain, Barcelona',
        jobTitle: 'Engineer',
        description: 'Doing something, programing....',
        startDate: '01/01/2014',
        endDate: '01/01/2016',
        user:user1Id
      },
      {
        title: 'Job in Siemens',
        company: 'Siemens',
        companyWebsite: 'www.google.com',
        location: 'Slovakia, Kosice',
        jobTitle: 'Software Engineer',
        description: 'Responsoble for parsing framework for JSON medical data.',
        startDate: '01/01/2011',
        endDate: '01/01/2013',
        user:user1Id
      },
      {
        title: 'Work in USA',
        company: 'WhoKnows',
        companyWebsite: 'www.google.com',
        location: 'USA, Montana',
        jobTitle: 'Housekeeping',
        description: 'So much responsibility....Overloaaaaaad',
        startDate: '01/01/2010',
        endDate: '01/01/2011',
        user:user1Id
      }
    ]
  }

  module.exports = data;