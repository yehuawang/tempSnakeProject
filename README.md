
### Motivation

- In today’s fast-paced society, people increasingly find their leisure time fragmented. Our project is inspired by the growing need for short, efficient ways to relax in a busy world. Drawing inspiration from the rising popularity of brief cognitive and behavioural test mini-games observed on social medias like TikTok, we aim to create a game platform similar to Human Benchmark. Our platform offers users a variety of quick and engaging cognitive games, designed to provide effective relaxation and mental stimulation in on the fly.

### Project Description

#### Our project will consist of:  
  - a **homepage** where all game / test offerings are listed  
  - **game play pages** with consistent theme and specially tuned for each game / test  
  - **user signup and login** features  
  - a **user profile page** where basic user information, history attempts and statistics will be provided.  
- In our next deliverable (sprint 1), we anticipate providing functional pages with backend and logics implemented, and two games / tests released.  
- In the final deliverable (sprint 2), we will focus on fine-tuning for details, including implementation of different themes, on-platform pseudo-currency system, and improving user experiences through collaborative testing from our team members and guest players.

### Installation

- To run this software, make sure *node.js* and *npm* are installed on your computer.  
  - You can download node.js (which includes npm) [here](https://nodejs.org/en) 
  - check if you have the same or higher node and npm version:
    - `node -v`: should get v20.17.0 or higher
    - `npm -v`: should get 10.8.2 or higher
    - if you have a lower version, you can use `nvm install 22` to upgrade to newest version of node and npm.
    - **failed to install required version may cause unexpected issue or failed to connect to database!** 
- After insuring node.js and npm is on your local machine, connect to this git repo, and clone by:  
  - `git clone [git@github.com](mailto:git@github.com):EECS3311F24/project-snake.git`
- cd into the project root directory:
  - `cd snake`  
- install all dependencies in root (snake) folder:
  - `npm install`
- navigate to client folder and install all dependencies:
  - `cd client`
  - `npm install`
- Then go back to the snake folder, and create a new file `.env`, inside it, use the following template:
  - `MONGO_URI=mongodb+srv://<username>:<password>@snakecluster.jxeau.mongodb.net/?retryWrites=true&w=majority&appName=SnakeCluster` 
  - `PORT=5001`
  - Change the `<username>` and `<password>` with what we provided you for guest access to db, **please ask us for that!!! We do not want to include sensitive information on public repo!**
  - Change the `PORT` number to any port that is not conflicting on your local machine (optional)
- Then inside snake folder, start the application by running the script: 
  - `npm run start` to start both front and backend.
- Go to your browser (chrome) at `localhost:5173` to view our project.`

### Contribution

- For Snake group members, consult this for committing of contribution:  
  - Before you start working, always run:  
    - `git checkout <your-name>` to go to your own branch  
      - If you don’t have your own branch, run:  
        - `git checkout -b <your-name>` to create a new branch  
    - run `git fetch origin main` to fetch any updates from the main branch
      - or use `git fetch origin <your-branch-name>` to fetch changes from your own branch (if you are switching workstation etc...)
    - View the changes, if okay, **on your own branch**, use `git pull origin <your-branch-name>` to fetch and merge main to your current branch. If a conflict is happening, resolve it manually.  
    - After fetching, you may want to run `npm install` to update all dependencies, because the `node_modules` is not included in the git repo.
    - check more on the **Intallation** part of this document for how to start the project.
  - Working on the commit:  
    - If it is a general documentation that has already been collectively written out on google docs:  
    - You can push it to `main` after everyone has finally checked the document and agreed upon.  
  - If it is a feature you are implementing:  
    - Push it to your own branch `<your-name>`, and if needed, create `<your-name-1>`, `<your-name-2>`... for multi branches  
      - To make a commit and publish, use: `git add .` && `git commit -m “commit message”` && `git push origin <your-branch-name>`  
    - Never push to the default `main` branch!  
    - After you publish the commit to your branch on github, and you are satisfied with your work, create a pull request and notify group members to view and merge the pull request on the next team meeting.
