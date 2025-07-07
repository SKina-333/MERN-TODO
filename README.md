# MERN STACK TODO APP

A full-stack Kanban-style to do list app built with:
- MongoDB
- Express
- React
- Node.js

## Features
- Create, update, delete, read for task and column.
- Fully interactable
- Organize tasks by a customizable columns.
- Mobile & Desktop Responsive.
- Add priority to task with color coded.
- Auto save

## Folder structure
- /client (Frontend client) <br />
- /server (Backend API client) <br />


## Setup & Installation Guide
- Install Dependencies <br />
```
cd server
npm install
cd ../client
npm install
```
- Set up Environment Variables <br/>

Create .env file in server folder. <br/>

Copy and Paste this <br/>
```
SERVER_PORT=5000
DATABASE_URL="mongodb://localhost:27017/local"
```
- Run the application
#### Server
```
cd server
npm run dev
```
#### Client
```
cd client
npm run dev
```

## Design Decision
- With the given mission, I wanted to challenge myself to create something that looks and feels nice to use.
- First I brainstormed on the functionality and the styling of the application and decided to apply a style which is heavily inspired from Miro Kanban board to do template. Not only it is clean looking but it is user friendly.
- Before making the website, I first create a prototype using figma to bring the design into reality which can help me progress faster during coding phase.
- For the styling of the website, I chose to use Tailwind CSS library to style the application as it is a comfortable library for me to use to be able to style efficiently and I can directly change css of a html element without worrying about it affecting the others.
- Since the whole frontend application uses to do data to display, create, delete and update, I created a context for it in order to be able to use those information anywhere in the application.
- In order to make the code clean and easy to navigate, I had broken the code into smaller components to be able to read and identify any error faster for the frontend.
- I also organize the server folders using MVC methodology, groupping files into folder.
- For production purposes, I also added environment variables for production and development but in this case it is not required.
- I also ran into some problems while designing the website to be Mobile and Desktop responsive. Since my application design for desktop differs from the design for mobile, I had to create two separate code for each of them which causes a few complication trying to figure out how to still reuse the same code without making the code larger and messy with a lot of conditional switches.

## Bonus feature
Besides the bonus challenge of creating a toggleable list style view, I added 3 extra features to the website:
- Added a priority tag (low, medium, high) that user can apply it on their task which changes the color of the task depending on the urgency of the priority.
- The application operates in a single page. User can create, read, update and delete all in the same page seamlessly.
- Added description section for user to write additional details for the task.

## Future Improvements
The website is far from being perfect. While I mainly focus on the main objective of the mission, I think it is nice to include this section as a retrospective for myself to think back on how to improve the code as well as my design decision so I can improve myself. Future improvements includes:
- Smooth animation and transition when opening drop down, toggle buttons, modal
- User friendly toast message in order to indicate the user of their action
- Better Error handling and not crash the application
- Add more viewport
- Dockerize this project for better sharing and hosting
- Add a rich text editor for task description to store better description.
- Add different layout style such as list style

## Video demonstration clips 

- Add tasks <br/>
https://github.com/user-attachments/assets/c27b8396-c000-4ad0-8e18-05845a899ace
[iPhone-14-Plus-localhost-6bvheh98sgqwiv.webm](https://github.com/user-attachments/assets/e76f2ead-101e-4524-b232-ead689c2e83a)

- Read tasks <br/>
https://github.com/user-attachments/assets/4bd56fe9-aba3-40af-9235-5cb11831fba3
- Update task & column <br/>
https://github.com/user-attachments/assets/4c306b29-4de1-4af0-a4c9-8d1fda721773
- Add columns <br/>
https://github.com/user-attachments/assets/8fb8977a-77c0-4c2d-bdf5-d26b5cbe33dd
- Change Priority <br/>
https://github.com/user-attachments/assets/9e4b06ea-0201-4066-b08e-b3a752bbb468
- Delete task & column <br/>
https://github.com/user-attachments/assets/d6ac6730-63d0-4a4b-b0d0-1917412c2643
- Adding task description <br/>
https://github.com/user-attachments/assets/4965bfe7-1137-4233-b56b-5262209cccf0
