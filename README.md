# webserver-worker-template
Webserver(+ SPA Frontend) - Queue - Database - Worker model template.

- Each modules are dockerized.
- Making use of firebase authentication for user authentication and realtime database(for normal data storage and firebase-queue).
- ES6, ES7 + webpack.
- React and Redux based SPA frontend.
- Prettier applied.
- Typed by flow.

# What is this?
Assuming you have to setup an application on which users upload something, does some heavy processing, and provides the results. This is the template project for it. 
As a sample, this project allows users to upload images and will get 100px x 100px resized image as a result.

## webserver
- Frontend provides a login page, a dashboard page, and an image upload page.
- Using firebase authentication for user login and following verifications.
- Backend stores an uploaded image on the server, writes a process status to the database(firebase real time database),  and puts a task to the queue.

## database
- Stores processing status of each uploaded images.

## queue
- Normal messaing queue.

## worker
- Subscribe queue to get assigned task.
- Resize uploaded image and store on the server, update the process status.

# How to run
- Clone the repository.
- Create a firebase project and replace firebase.js, firebase-admin.js with your settings.
- Run "docker-compose up".

# What's missing (TODO)
- Test!!
- Multi user support.
- Update versions of some npm packages.

# Notes
- I tested only on chrome browser.

[firebase-queue]: https://github.com/firebase/firebase-queue "firebase-queue"
