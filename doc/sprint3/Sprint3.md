# Sprint 3 Planning Meeting (sprint2.md)

**Team Name:** Snake  
**Sprint Number:** 3
**Meeting date**: Nov 18, 2024

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

- **Expected Weekly Capacity per Member:** 6 hours  
- **Total Sprint Capacity (2 weeks):** 60 hours (5 team members * 6 hr/week * 2 weeks) = 300 work points
- each hour is worth 5 points in our scale

---

### Sprint Goal

1. Finish last 4 games:

    - reflection test
    - aim trainer
    - flip card
    - sequence memory

2. Round up currency purchase with different themes and earn coin logic

3. Implement feed back to the web app

4. Implement round up of in-game-play audio response

5. Deliver appealing performance ranking and statistics

6. Enforce levels of increasing difficulty in each game

### Sprint Schedule

- **Sprint Start Date**: Nov 18, 2024
- **Sprint End Date**: Dec 1, 2024

| Time                      | focus                                                                                                                             |
|---------------------------|-----------------------------------------------------------------------------------------------------------------------------------|
| Nov 18                    | Stand up meeting 1, Sprint planning meeting                                                                                       |
| Nov 18 - Nov 24           | Each members go on finishing their commitment of implementing basic functional components as described below in `Tasks` section   |
| Nov 24                    | Stand up meeting 2, checking progress                                                                                             |
| Nov 24 - Nov 27           | Assembly of each component and testing compatibility and functionality                                                            |
| Nov 27                    | Stand up meeting 3, checking progress on completion                                                                               |
| Nov 27 - Dec 1            | Actively bug fixing on any know issues, actively raise tickets and dynamically fixing, improving user ui and user experiences     |
| Dec 1                     | Stand up meeting 4, Sprint Retrospective meeting, recording of demo video, gather documents and tranfer documents from google doc |                                                                           |

---

### User Stories for Sprint 3
    please consult our Trello Board to checkout these features with detailed user story as marked `US-6` means User Story #6

1. **levels in game**  
   - **Story ID:** US-6
   - **Description:** Ranking and attempt history as components inside game page. 
   - **Acceptance Criteria:**
        - increasing level of difficulty in each game
   - **Estimation Work Points:** 40
   - **Estimation value to project**: 30 

2. **Aim Trainer Game**  
   - **Story ID:** US-13
   - **Description:** Aim trainer game where user can test their aiming skills
   - **Acceptance Criteria:**
        - User will see different target to click on
        - Once user clicked on a target they get a point
        - There is a fixed amount of target to click on 
        - after all targets clicked the game ends
        - there is a timer to track how long it takes for the user to shoot all targets
   - **Estimation Work Points:** 30
   - **Estimation value to project**: 30 

3. **Currency System**  
   - **Story ID:** US-14
   - **Description:** A currency system that user can earn coins and make purchase with the coins 
   - **Acceptance Criteria:**
        - user can purchase themese with coins they have
        - coins earned or spent are reflected in real time 
   - **Estimation Points:** 35 
   - **Estimation value to project**: 20 

4. **Survey**  
    - **Story ID:** US-17
    - **Description:** Survey and user feedback that improves our web app and encourages user to fill in by providing awards 
    - **Acceptance Criteria:** 
        - User will have a place to fill in their form 
        - User can give starts to our website
        - User can leave comments to our game
        - User will be notified ahead of time what bonus / prize they will get (ex. some coins)
        - The form the user filled in will be submitted to backend
        - A backend that will process the storage of user feedback
        - A place to displace feed back
        - wire up with currency system to award user
   - **Estimation Points:** 25
   - **Estimation value to project**: 25

5. **Gameplay statistics**  
   - **Story ID:** US-18 
   - **Description:** User can see their statistics of the game. 
   - **Acceptance Criteria:** 
        - two windows displaying user historical attempts and ranking list on the game page
        - when user play games, the data is updated on real time and refreshed automatically
        - There is api calls to save the data and display data next time game is launched 
   - **Estimation Points:** 30
   - **Estimation value to project**: 30

6. **Audio - in game play response**  
   - **Story ID:** US-20 
   - **Description:** User gets responding audios whenever they make move in a game
   - **Acceptance Criteria:** 
        - user will hear audio play when they clicked audio button
        - user will be able to play or mute audio
        - each game will have their separate audio response on clicking, typing, or start game end game …
   - **Estimation Points:** 45
   - **Estimation value to project**: 30

7. **Reaction Test**  
   - **Story ID:** US-23 
   - **Description:** User clicks the block when color change to see their reaction time
   - **Acceptance Criteria:** 
        - User has prompts of when to click the block (color change)
        - User has feed back on their reflection time, or too early
        - Loggs user info into database
   - **Estimation Points:** 20
   - **Estimation value to project**: 15

8. **Flip Card game**  
   - **Story ID:** US-24
   - **Description:** User flips two identical card to "fix" it, wins until all cards are flipped.
   - **Acceptance Criteria:** 
        - User will have a basic interface to play the game
        - User can flip cards two at a time
        - if two cards are same, user will “fix” the two cards
        - User can win the game if all cards are flipped
        - There is a time limit to flip all cards
        - User earn coins if they win the game
   - **Estimation Points:** 35
   - **Estimation value to project**: 30

9. **Dashboard user performance ranking system**  
   - **Story ID:** US-25
   - **Description:** Contains selector for different games and graph representation of the user position among other users.
   - **Acceptance Criteria:** 
        - there is a dashboard component to let user see the ranking
        - User can see their position in different games by selecting each game tab
        - User can see basic statictics such as highest score, historical score of the game selected
        - A graph that plots users position among all other users.
        - A hover overlay on the graph that shows each point which user is at that score, or some basic statistics like how many user are at that position (if multiple user at same score)
   - **Estimation Points:** 35
   - **Estimation value to project**: 30

10. **Sequence Memory Game**  
   - **Story ID:** US-26
   - **Description:** User will be shown a sequence of shining blocks and needs to memorize their order of appearance.
   - **Acceptance Criteria:** 
        - User will be able to see sequence of shining squares
        - User will have time to click sequence of squares as memorized
        - User will have feed back of if they memorized it correctly or wrongly
        - Game will progressingly increase difficulty until user fails
        - User will earn coins when they play the game
   - **Estimation Points:** 35
   - **Estimation value to project**: 30

---

### Task Breakdown

#### Levels in the game (US-6)

| Task                                  | Assigned To   | Est. Hours | Status       |
|---------------------------------------|---------------|------------|--------------|
| Add levels to Snake Game              | Yihan         | 1          | Not Started  |
| Add levels to Word Game               | Lynne         | 1          | Not Started  |
| Add levels to Aim Trainer Game        | Aryan         | 1          | Not Started  |
| Add levels to Emoji Memo Game         | Yihan         | 1          | Not Started  |
| Add levels to Flip Card Game          | Lynne         | 1          | Not Started  |
| Add levels to sequence memory Game    | Junwei        | 1          | Not Started  |
| Testing and debugging                 | Pratham       | 2          | Not Started  |

#### Aim Trainer Game (US-16)

| Task                                  | Assigned To | Est. Hours | Status       |
|---------------------------------------|-------------|------------|--------------|
| Basic Structure Setup                 | Aryan       | 1          | Not Started  |
| Moving target generator               | Aryan       | 0.5          | Not Started  |
| handling user clicking events         | Aryan       | 0.5          | Not Started  |
| UI, start scene, end game scene       | Aryan       | 1          | Not Started  |
| timer                                 | Aryan       | 0.5          | Not Started  |
| performance data to db                | Aryan       | 1          | Not Started  |
| earn coin logic                       | Aryan       | 0.5          | Not Started  |
| Testing and debugging                 | Aryan       | 1          | Not Started  |

#### Currency System (US-14)

| Task                                              | Assigned To   | Est. Hours | Status       |
|---------------------------------------------------|---------------|------------|--------------|
| add user currency to User database                | Aryan         | 0          | Completed    |
| add show currency component at dashboard          | Yihan         | 0          | Completed    |
| Add purchase for each new themes added            | Aryan         | 1.5        | Not Started  |
| earn coin in snake game                           | Yihan         | 0.5        | Not Started  |
| earn coin in emoji memo                           | Yihan         | 0          | Completed    |
| earn coin in word game                            | Lynne         | 0          | Completed    |
| earn coin in flip card game                       | Lynne         | 0.5        | Not Started  |
| earn coin in reaction test                        | Aryan         | 0.5        | Not Started  |
| earn coin in aim trainer                          | Aryan         | 0.5        | Not Started  |
| earn coin in typin test                           | Pratham       | 0.5        | Not Started  |
| earn coin in sequence memory                      | Junwei        | 0.5        | Not Started  |
| earn coin in submitting feedback                  | Pratham       | 0.5        | Not Started  |
| Testing and debugging                             | Lynne         | 2          | Not Started  |

#### Survey (US-17)

| Task                                  | Assigned To   | Est. Hours | Status       |
|---------------------------------------|---------------|------------|--------------|
| Basic structure & UI setup            | Pratham       | 0.5        | Not Started  |
| form submit logic and wiring          | Pratham       | 0.5        | Not Started  |
| db model                              | Pratham       | 1          | Not Started  |
| backend api handling submit           | Pratham       | 1          | Not Started  |
| api handling rewards                  | Pratham       | 1          | Not Started  |
| Testing and debugging                 | Pratham       | 1          | Not Started  |

#### Gameplay Statistics (US-18)

| Task                                  | Assigned To | Est. Hours | Status       |
|---------------------------------------|-------------|------------|--------------|
| Basic structure & UI setup            | Yihan       | 1          | Not Started  |
| historical attempts api & component   | Yihan       | 1          | Not Started  |
| ranking list                          | Yihan       | 1          | Not Started  |
| Testing and debugging                 | Yihan       | 1          | Not Started  |

#### Audio (US-20)

| Task                                  | Assigned To | Est. Hours | Status       |
|---------------------------------------|-------------|------------|--------------|
| Add audio to snake game               | Yihan       | 1          | Not Started  |
| Add audio to emoji memo game          | Yihan       | 1          | Not Started  |
| Add audio to word game                | Lynne       | 1          | Not Started  |
| Add audio to aim trainer              | Aryan       | 1          | Not Started  |
| Add audio to Typing test              | Pratham     | 1          | In progress  |
| Add audio to reactiontest             | Aryan       | 1          | Not Started  |
| Add audio to flip card game           | Lynne       | 1          | Not Started  |
| Add audio to sequence memory game     | Junwei      | 1          | Not Started  |
| Testing and debugging                 | Junwei      | 1          | Not Started  |

#### Reaction Test (US-23)

| Task                                  | Assigned To | Est. Hours | Status       |
|---------------------------------------|-------------|------------|--------------|
| Basic structure for the reaction test | Aryan       | 0.5        | In Progress  |
| Integrate reaction test into project  | Aryan       | 0.5        | In Progress  |
| Backend api call to update user score | Aryan       | 1          | Not started  |
| Front end display of user data        | Aryan       | 1          | Not Started  |
| Testing and debugging                 | Aryan       | 1          | Not Started  |

#### Flip Card Game (US-24)

| Task                                  | Assigned To | Est. Hours | Status       |
|---------------------------------------|-------------|------------|--------------|
| Basic structure                       | Lynne       | 0.5        | Not started  |
| Card components                       | Lynne       | 0.5        | Not started  |
| Game Logic                            | Lynne       | 1          | Not started  |
| Time Limit                            | Lynne       | 1          | Not Started  |
| Award coin & levels of difficulty     | Lynne       | 2          | Not Started  |
| Time Limit                            | Lynne       | 1          | Not Started  |
| Testing and debugging                 | Lynne       | 1          | Not Started  |

#### Dashboard User Ranking (US-25)

| Task                                                      | Assigned To | Est. Hours | Status       |
|-----------------------------------------------------------|-------------|------------|--------------|
| db model to store game scores and ranking                 | Yihan       | 1          | Not started  |
| dashboard react component to show games and statistics    | Yihan       | 1          | Not started  |
| each game updates the scores in database                  | Yihan       | 1          | Not started  |
| dashboard game selectors to display different game ranking| Yihan       | 1          | Not Started  |
| Graph overlay to show information                         | Yihan       | 2          | Not Started  |
| Testing and debugging                                     | Yihan       | 1          | Not Started  |

#### Sequence Memory Game (US-26)

| Task                                                      | Assigned To | Est. Hours | Status       |
|-----------------------------------------------------------|-------------|------------|--------------|
| Basic game structure set up                               | Junwei      | 1          | Not started  |
| add handle user selection of correct squares              | Junwei      | 1          | Not started  |
| add correct and wrong selection prompt                    | Junwei      | 1          | Not started  |
| add end game prompt                                       | Junwei      | 1          | Not started  |
| add increasing difficulty level handler                   | Junwei      | 1          | Not started  |
| connect to db to earn coins through api call              | Junwei      | 1          | Not started  |
| Testing and debugging                                     | Junwei      | 1          | Not started  |

---

### Spikes

| Spike Description                        | Responsible Member | Est. Hours | Status       |
|------------------------------------------|--------------------|------------|--------------|
| Explore suitable survey options and comment display options | Pratham         | 2          | Not Started  |
| Explore flip card game logic that provides best smooth game flow    | Lynne              | 2          | Not Started  |
| Investigate UI improvements for themes purchasing and modify accordingly | Aryan          | 2          | In progress  |
| Research game statistics graphing      | Yihan, Junwei      | 2          | In progress  |
| Research in game responsive audio while game play | All Members | 5 | In Progress |

---

### Action Items

| Action Item                       | Responsible Member        | Due Date | Status       |
|-----------------------------------|---------------------------|----------|--------------|
| Finalize unimplemented games      | Aryan, Junwei, Lynne      | Nov 27   | In progress  |
| Develop use statistics            | Yihan, Aryan, Junwei      | Nov 27   | In progress  |
| Implement Survey and comments     | Pratham                   | Nov 24   | Not started  |
| Bug fix on existing issues        | Junwei, Yihan, Pratham    | Nov 27   | Not Started  |
| Conduct integrated test on app    | Lynne, Pratham, Arayn     | Nov 30   | Not Started  |

---

**Meeting Decision and Notes:**  

- The team decided to prioritize finishing remaining games and user UI experiences.
- Agreed on modifying current themes and adapt Aryan's proposal of simple themes with 3 vairable colors.
- Emphasized the importance of the assembly of deliverable documentation at the middle of sprint instead of gather and tranform all documentation in draft form from google doc to github. 

---
