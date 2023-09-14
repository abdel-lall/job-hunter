# JobHunter

[JobHunter Link](www.jobhunter.website)

Welcome to JobHunter, your all-in-one job application management platform. JobHunter is designed to help you search, save, and track job applications effortlessly. If you're a job seeker, JobHunter streamlines the application process for you.

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Deployment](#deployment)

## Overview

JobHunter is a powerful web application built using the Model-View-Controller (MVC) architecture, ensuring a clean and maintainable codebase. It simplifies job application management by providing tools to search for job listings, save interesting positions, and track your progress in the application process.

## Architecture

JobHunter's architecture is structured as follows:

- **Database**: MySQL is used as the relational database to store user data, job listings, and application details.

- **ORM (Object-Relational Mapping)**: Sequelize is employed as the ORM to interact with the MySQL database, providing an efficient way to manage database operations.

- **Views**: Handlebars.js is used for templating the views, allowing for dynamic rendering of web pages.

- **Server**: The Node.js server, powered by Express.js, handles HTTP requests and routes them to the appropriate controllers.

- **Scraping**: JobHunter uses Puppeteer to navigate to Indeed.com, input your search criteria, and initiate the search.

- **Data Extraction**: The application utilizes Cheerio to parse the HTML of the search results page, extracting relevant job listing information.

- **Styling**: CSS is utilized for styling the user interface, providing an appealing and user-friendly design.

- **Client-Side Interactions**: jQuery and jQuery UI are employed to enhance user interactions, including drag-and-drop functionality for managing job applications.

- **File Upload**: Multer is used to allow users to upload profile images for their accounts.

- **Authentication**: Passport.js is implemented for user authentication, ensuring secure access to user accounts and data.

## Technologies Used

- **Back-end**: Node.js, Express.js
- **Database**: MySQL (RDS on AWS)
- **ORM**: Sequelize
- **Front-end**: Handlebars.js, CSS, jQuery, jQuery UI
- **File Upload**: Multer
- **Authentication**: Passport.js
- **Deployment**: AWS EC2, AWS RDS

## Features

Key features of the JobHunter web app include:

- **User Registration**: Create an account with JobHunter to start managing your job applications.

- **Search and Save**: Search for job listings and save the ones that interest you for easy access later.

- **Application Tracking**: Track the status of your job applications, from submission to interview scheduling.

- **Profile Images**: Upload a profile image to personalize your account.

- **Secure Authentication**: User authentication is handled securely using Passport.js.

## Deployment

JobHunter is deployed on an AWS EC2 instance and utilizes AWS RDS for the database. The deployment ensures scalability, reliability, and efficient database management.

## Screenshots

![Screenshot 2023-09-14 131951](https://github.com/abdel-lall/job-hunter/assets/49083865/ec297d1b-4b8a-487d-abfd-1a2d2af423e5)

![Screenshot 2023-09-14 132121](https://github.com/abdel-lall/job-hunter/assets/49083865/3aaf04af-69cf-4612-8d14-9229fc47526a)

![Screenshot 2023-09-14 132155](https://github.com/abdel-lall/job-hunter/assets/49083865/318b50e4-f62d-494f-bfd1-234fa3c89161)

![Screenshot 2023-09-14 132235](https://github.com/abdel-lall/job-hunter/assets/49083865/6fbb81f1-2567-4399-ae3c-b46d1f5a5bec)


