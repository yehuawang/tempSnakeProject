# Release Planning Meeting (RPM.md)
**Team Name:** Snake  
**Release Version:** v1.0  
**Meeting Date:** Oct 20, 2024  
**Location/Platform:** York University (Physical meeting)  
**TA:** NIMA  

---

### Participants

| Name         | Role           | Attendance |
|--------------|----------------|------------|
| Yihan Wang   | Product Owner  | Present    |
| Junwei Quan  | Developer      | Present    |
| Lynne Hamd   | Developer      | Present    |
| Aryan Kalra  | Developer      | Present    |
| Pratham      | Developer      | Present    |

---

### Release Goals

**Primary Objectives:**  
- Develop the initial platform using the MERN stack.
- Implement core features for user engagement with games.
- Provide an MVP with key games and initial UI.
- Create a login system for personalized experiences.

**Secondary Objectives:**  
- Integrate a basic AI-powered chatbot.

---

### Scope and Key Features

1. **User Interface for Selecting Games**  
   - **Description:** Includes:
     - User Login/Signup Page
     - Post-login Dashboard
     - Game category selection and game selection under each category
     - Game page for gameplay
     - Access to chatbot functionality
   - **Expected Outcome:** 
     - Users can select games quickly.
     - Users can signup, login, and view their Dashboard.
     - Game redirection and chatbot interaction are functional.

2. **Reaction Test Game**  
   - **Description:** 
     - A game to measure reaction skills, themed as a "snake game."
   - **Expected Outcome:**
     - Smooth gameplay with score tracking stored in the database.

3. **User Login / Signup**  
   - **Description:** Includes:
     - Database storage of user information upon signup.
     - Password protection.
     - Verification of existing users on login.
   - **Expected Outcome:**
     - Account creation with name, email, and password.
     - Prevention of duplicate user accounts.
     - Secure password handling and successful login.

4. **AI Chatbot**  
   - **Description:**
     - Real-time AI interaction with stored dialogue.
   - **Expected Outcome:** 
     - Users can send messages and receive responses from the chatbot.

5. **Dark Mode**  
   - **Description:**
     - Theme-switching capability for light and dark mode.
   - **Expected Outcome:** 
     - Seamless switching between light and dark themes.

6. **Guest Mode Access**
   - **Description:**
     - Non-logged-in users can access games and the chatbot.
   - **Expected Outcome:**
     - Guest users’ game scores are not stored.
     - Normal functionality with database records.

---

### Milestones & Timeline

| Milestone                  | Expected Completion | Description                              |
|----------------------------|---------------------|------------------------------------------|
| Complete User Authentication | Oct 27           | User login and signup features           |
| Basic UI                    | Oct 27            | Initial game selection interface         |
| Implement Reaction Game     | Oct 31            | Game with scoreboard                     |
| Implement Dark Mode         | Oct 31            | Theme switching                          |
| Implement AI Chatbot        | Oct 31            | Text and phrase generation               |
| Guest Mode Access           | Oct 31            | Access for non-logged-in users           |
| Release MVP                 | Nov 2             | Core functionalities release             |

---

### Risk Assessment

| Risk Factor                            | Probability | Impact | Mitigation Strategy                    |
|----------------------------------------|-------------|--------|----------------------------------------|
| Technical Challenges with AI Integration | High       | Medium | Prioritize core features; delay AI if necessary |
| UI Complexity and Design Consistency   | Medium      | Medium | Use a design framework                 |
| Time Constraints                       | Medium      | High   | Set realistic goals, prioritize MVP    |

---

### Resources & Capacity Planning

**Team Capacity:**  
- Expected work: 10+ hours/week per team member  
- Total capacity: `5 people * 10 hr/wk * 2 wk = 100 hr`  
- Points assigned to features based on difficulty.

| Feature            | Points |
|--------------------|--------|
| User Authentication| 15     |
| UI                 | 25     |
| Reaction Game      | 20     |
| Dark Mode          | 5      |
| AI Chatbot         | 30     |
| Guest Mode Access  | 5      |

**Total Points:** 100

**Resources Needed:**  
- MERN stack development environment setup completed in Sprint 0  
- AI API access (delegate to Drewry)

**Additional Notes:**  
- Initial focus on backend/frontend integration and simple UI.

---

### Action Items

| Action Item                 | Responsible Member | Due Date | Status       |
|-----------------------------|--------------------|----------|--------------|
| Finalize User Stories       | Pratham           | Oct 25   | In Progress  |
| Setup Development Environment | Yihan          | Oct 13   | Completed    |
| Create Initial UI Mockups   | Aryan, Lynne      | Oct 27   | In Progress  |
| Refactor React Components   | Lynne, Yihan      | Oct 27   | Not Started  |
| Develop Reaction Game       | Yihan             | Oct 31   | Not Started  |
| Chatbot API Setup Test      | Drewry            | Oct 27   | In Progress  |
| Chatbot API Integration     | Drewry            | Oct 31   | Not Started  |
| User Sign Up/Login Auth     | Pratham           | Oct 27   | In Progress  |
| Guest Access                | Aryan             | Oct 31   | Not Started  |
| Dark Mode                   | Pratham           | Oct 31   | Not Started  |

---
