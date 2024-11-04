# Sprint 1 Planning Meeting (sprint1.md)

**Team Name:** Snake  
**Sprint Number:** 1  
**Sprint Goal:** Complete core features including user authentication, basic game UI, and backend integration to deliver an initial MVP that aligns with user personas’ needs, such as memory games for educational reinforcement and cognitive exercises for performance enhancement.

---

### Participants

| Name          | Role             | Attendance |
|---------------|------------------|------------|
| Yihan Wang    | Product Owner    | Present    |
| Junwei Quan   | Developer        | Present    |
| Lynne Hamd    | Developer        | Present    |
| Aryan Kalra   | Developer        | Present    |
| Pratham       | Developer        | Present    |

---

### Team Capacity

- **Expected Weekly Capacity per Member:** 10 hours  
- **Total Sprint Capacity (2 weeks):** 100 hours (5 team members * 10 hr/week * 2 weeks)

---

### Sprint Goal

Establish a functional login and signup system, an engaging UI for game selection tailored to user personas, and initial backend-frontend integration to prepare for core feature development, including memory games for educational support and quick cognitive exercises for stress relief.

---

### User Stories for Sprint 1

1. **User Authentication**  
   - **Story ID:** US-01  
   - **Description:** Allow users to create accounts, login securely, and manage sessions across the app. This meets **John Atkinson's** need for secure, reliable access to educational tools.
   - **Acceptance Criteria:** Users can register, login, and session information is maintained across components.  
   - **Estimation Points:** 15

2. **Game Selection UI**  
   - **Story ID:** US-02  
   - **Description:** Provide a simple, accessible UI with game categories that meet the preferences of users like **Jane** (simple games) and **Jake** (cognitive enhancement features).
   - **Acceptance Criteria:** Users see a dashboard, can easily select games, and navigate seamlessly through categories.  
   - **Estimation Points:** 15

3. **Backend-Frontend Integration**  
   - **Story ID:** US-03  
   - **Description:** Integrate backend and frontend for essential operations like user authentication, session tracking, and game navigation to ensure smooth user experience.
   - **Acceptance Criteria:** Backend communicates with frontend, validates login, and enables navigation to various game categories.  
   - **Estimation Points:** 10

---

### Task Breakdown

#### User Authentication (US-01)

| Task                            | Assigned To | Est. Hours | Status       |
|---------------------------------|-------------|------------|--------------|
| Set up database schema for users | Pratham     | 3          | In Progress  |
| Implement user registration API  | Pratham     | 4          | Not Started  |
| Implement user login API         | Pratham      | 4          | Not Started  |
| Encrypt and store user passwords | Pratham    | 3          | Not Started  |
| Create frontend for signup/login | Aryan       | 5          | Not Started  |

#### Game Selection UI (US-02)

| Task                                      | Assigned To | Est. Hours | Status       |
|-------------------------------------------|-------------|------------|--------------|
| Design login/signup page based on user personas | Aryan | 4  | In Progress  |
| Develop dashboard layout                  | Lynne       | 3          | Not Started  |
| Implement game category selection feature | Aryan      | 4          | Not Started  |
| Create navigation from login to dashboard | Aryan      | 2          | Not Started  |
| Initial testing and feedback              | Lynne    | 2          | Not Started  |

#### Backend-Frontend Integration (US-03)

| Task                                 | Assigned To | Est. Hours | Status       |
|--------------------------------------|-------------|------------|--------------|
| Set up backend routes for UI support | Yihan       | 4          | Not Started  |
| Connect backend API with frontend    | Yihan, Pratham      | 3          | Not Started  |
| Test session persistence across UI   | Pratham     | 3          | Not Started  |
| Set up development environment       | Yihan     | 2          | Completed    |
| Initial integration testing          | Aryan       | 3          | Not Started  |
| Set up front end Chatbot API calls | Junwei | 6 | In Progress |

---

### Spikes

| Spike Description                    | Responsible Member | Est. Hours | Status       |
|--------------------------------------|--------------------|------------|--------------|
| Research secure password encryption  | Pratham       | 2          | In Progress  |
| Explore session management for MERN  | Yihan, Aryan             | 2          | Completed    |
| Investigate UI framework compatibility based on personas | Lynne | 2  | Not Started  |
| Explore integrating AI models API to project | Junwei | 10 | In Progress |

---

### Decisions and Notes

- **UI Framework:** Decided on UI, aligning with the ease of use required by **Jane** and **John**.
- **Password Security:** Selected bcrypt for secure password encryption.
- **User Persona Insights:** Implementing dark mode for **John** (late-night studying) and **Jane** (late-night relaxing).
- **Development Flow:** Bi-daily check-ins for frontend and backend teams to stay aligned.
- **Testing:** Each user story to be tested individually before integration testing.

---

### Action Items

| Action Item                           | Responsible Member | Due Date | Status       |
|---------------------------------------|--------------------|----------|--------------|
| Finalize User Authentication Design   | Pratham           | Oct 27   | In Progress  |
| Implement Backend-Frontend API Setup  | Yihan             | Oct 27   | Not Started  |
| Complete Game Selection UI            | Aryan, Lynne      | Oct 27   | In Progress  |
| Run Initial Integration Testing       | Pratham, Junwei   | Oct 31   | Not Started  |

---

**Meeting Notes:**  
- Team aligned sprint goals with user needs, particularly focusing on accessibility and usability for the personas.
- Established a clear plan for implementing and testing user stories.
- Agreed to prioritize features critical for user engagement and ease of use.

---

