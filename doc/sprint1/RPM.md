Release Planning Meeting (RPM.md)
Team Name: Snake
Release Version: v1.0
Meeting Date: Oct 20, 2024
Location/Platform: York University (Physical meeting)
TA: NIMA

---

### Participants

| Name          | Role                   | Attendance |
|---------------|------------------------|------------|
| Yihan Wang    | Product Owner          | Present    |
| Junwei Quan   | Developer              | Present    |
| Lynne Hamd    | Developer              | Present    |
| Aryan Kalra   | Developer              | Present    |
| Pratham       | Developer              | Present    |

---

### Release Goals

**Primary Objectives:**  
- Develop the initial platform based on MERN stack.
- Implement core features that enable user engagement with simple games.
- Provide a MVP with key games and initial UI.
- Make a login system for personalized experience.

**Secondary Objectives:**  
- Integrate basic AI-powered chatbot.

---

### Scope and Key Features

1. **User Interface for Selecting Games**  
   - **Description:** The User Interface will include:
        - User Login / Sign Page
        - Dashboard after user is logged in
        - Enable user to select game category
        - Enable to choose game from a list of games under category
        - Game page that loads game and allow user to play based on what game is chosen
        - A place to allow user to access the chatbot
   - **Expected Outcome:** 
        - Users can select from a list of games in minimal time.
        - User can successfully signup, login and view their Dashboard
        - User can be redirected to the game they select to play
        - User can access chatbot and able to send prompts and view response from model.

2. **Reaction Test Game**  
   - **Description:**
        - A game that can reflect user's reaction skills and give user feed back through their scores.
        - Currently set to be a snake game, corresponding to the project name
   - **Expected Outcome:**
        - Users can engage in the reaction game with smooth game play
        - User's progress or score in the game is saved to database

3. **User Login / Signup**  
   - **Description**: The login signup will include:
        - storing user information in database when signed up
        - protect user password in database
        - match if user exists in database when log in
        - share the state of which user is logged in with every other components in the app.
   - **Expected Outcome:**
        - Users can create an account with name, email, and password
        - Database keeps track of existing user and forbid duplicate users to be created
        - User password is protected
        - User can log in given correct email and password

4. **AI Chatbot**  
   - **Description:**
        - allows user to talk to real time AI models and receive response
   - **Expected Outcome:** 
        - has backend to store dialog and generate new response
        - user should be able to send message, and every message expects an response

5. **DARK MODE**  
   - **Description:**
        - allows user to switch theme of the app
   - **Expected Outcome:** 
        - user will be able to switch between preset light and dark theme

6. **Guest Mode Access**
    - **Description:**
        - allows users who have not logged in to also access games and chat bot
    - **Expected Outcome:**
        - guest users will not have their game score stored into database
        - guest users can access functions that uses database records normally

---

### Milestones & Timeline

| Milestone                   | Expected Completion Date | Description                                        |
|-----------------------------|--------------------------|----------------------------------------------------|
| Complete User Authentication| Oct 27                   | Development of user login and signup features      |
| Basic UI                    | Oct 27                   | Initial interface for selecting games              |
| Implement Reaction Game     | Oct 31                   | Reaction test game with functional scoreboard      |
| Implement Darkmode          | Oct 31                   | Darkmode with preset themes                        |
| Implement AI Chat bot       | Oct 31                   | Chat bot supports text & phrase generation         |
| Guest mode access           | Oct 31                   | Enable user to access functionalities without login|
| Release MVP                 | Nov 2                    | Release a basic platform with core functionalities |


---

### Risk Assessment

| Risk Factor                             | Probability (High/Med/Low) | Impact (High/Med/Low)  | Mitigation Strategy                      |
|-----------------------------------------|----------------------------|------------------------|------------------------------------------|
| Technical Challenges with AI Integration| High                       | Medium                 | Prioritize core functionalities; delay AI features if needed |
| UI Complexity and Design Consistency    | Medium                     | Medium                 | Use a design framework |
| Time Constraints                        | Medium                     | High                   | Set realistic goals and prioritize MVP |


---

### Resources & Capacity Planning

**Team Capacity:**
    - expected 10 hours + of work invested each week
    - total working hours capacity: `5 people * 10hr/wk * 2wk = 100hr`
    - delegate 1 hour for each point assigned to features.
    - difficulty to implement the feature decides the points

| feature | point |
|---------|-------|
| User Authentication | 15 |
| UI | 25 |
| Reaction Game | 20 |
| dark mode | 5 |
| AI chat bot | 30 |
| guest mode access | 5 |

total points: 100

**Resources Needed:**
- Development Environment: MERN stack setup done in sprint 0
- Access to AI API: delegate to Drewry

**Additional Notes:**
- Initial focus is on making backend and frontend integrated, along with a simple UI.

---

### Action Items

| Action Item                   | Responsible Member | Due Date    | Status       |
|-------------------------------|--------------------|-------------|--------------|
| Finalize User Stories         | Pratham       | Oct 25      | In Progress |
| Setup Development Environment | Yihan          | Oct 13      | Completed    |
| Create Initial UI Mockups     | Aryan, Lynne | Oct 27 | InProgress |
| Refactor React Components | Lynne, Yihan | Oct 27 | Not Started |
| Develop Reaction Game    | Yihan | Oct 31 | Not started |
| Chat bot API set up test | Drewry | Oct 27 | In Progress |
| Chat bot API migrate to project | Drewry | Oct 31 | Not started |
| User Sign up Login authentication | Pratham | Oct 27 | In Progress |
| Guest access | Aryan | Oct 31 | Not started |
| Dark mode | Pratham | Oct 31 | Not started |

---