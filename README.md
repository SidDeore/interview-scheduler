# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


### Setup Instructions
Prerequisites
1. Node.js: You need Node.js installed to run the app. If you don't have it installed, download it
2. npm: Node.js comes with npm, the package manager, which is required to install dependencies.

### Steps to Run the Application

1. Clone the repository:
git clone [ https://github.com/your-repo/interview-scheduler.git ]

2. Navigate to the project folder:
cd interview-scheduler

3. Install dependencies:
npm install

4. Start the application:
npm start

5. Open the application in your browser: Go to [ http://localhost:3000/ ] to view the application.

### Design Decisions

1. State Management with Redux: The application uses Redux to manage the state of scheduled interviews. The state is accessible globally across components, making it easy to manage and update the data.

2. Persistence with localStorage: To ensure that the data persists even when the user refreshes the browser, the application uses localStorage for storing the interviews. Each time the app is loaded, the interviews are fetched from localStorage.

3. User Interface: The UI is designed with React-Bootstrap to create a responsive and modern design. It includes components like forms, buttons, and cards to allow the user to input and view interview details in a clean, organized layout.

4. Conflict Detection: A key feature of this application is detecting scheduling conflicts. If an interview's candidate or interviewer is already scheduled for the selected time, the system will notify the user and prevent the conflict from being saved.

5. Routing: The application uses React Router for navigation between different pages, such as the dashboard and the edit interview form.

### Assumptions and Challenges
 
 ## Assumptions

1. Time Slot:
Each interview is assumed to last exactly 1 hour. The application checks for conflicts within the same 1-hour block.
The application does not account for different time zones or duration flexibility for interviews.

2. Data Persistence:
The interviews are stored in localStorage. This data will persist only on the client-side.
The data is not backed up, so if the user clears the browser's cache, the data will be lost.

3. User Interaction:
The application assumes the user will input valid data for each field.
The app only checks for conflicts between the candidate and interviewer, not between other participants.

 ## Challenges

1. Handling Time Conflicts:
One of the main challenges was implementing the time conflict detection. It involved comparing the start and end times of existing interviews and checking for overlaps. Given that the time interval is set to 1 hour, handling edge cases like overlapping minutes was tricky.

2. UI:
Ensuring the form and dashboard layout were user-friendly and responsive was a challenge. Ensuring the input fields were visually clear and that the buttons were easy to interact with required some design considerations, especially when working with React-Bootstrap.

3. Data Management:
Managing the state of interviews with Redux, while also using localStorage for persistence, created some complexities. There was a need to synchronize the local state with localStorage whenever changes occurred (like adding, updating, or deleting interviews).

4. Performance:
While the application is simple and the volume of data is expected to be small, handling performance improvements in the future will require careful consideration of how state and data persistence are managed.