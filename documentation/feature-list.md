* As an unauthorized user I want to be directed to the sign-up page and have the ability to sign up
* As an authorized user I want to be directed to the login page and have the ability to login
  - Questions?
    1. What information do we need from the user to sign up?
        - We need user_name, email and password, city, state, and user's specialties.
    2. Where should users be directed after signup?
        - The user will be redirected to the home page where they can then use the app as a loggedin user
    3. What happens if the user enters invalid or incomplete information when signing up?
        - Through error handling messages will appear on the page indicating what part of the field was incomplete or invalid

  - Acceptance Criteria
    - If the user is a new user they will be added to the database after they complete the sign up process and redirected to the home page
    - If a user is logging in, their data will be retrieved from the database and they will be redirected to the homepage with that data and infomation retrieved from database to populate the page.


* As an authorized user I want to be able to search, ask questions, answer questions, search questions, comment on or vote for questions etc.

  - Questions?
    1. Where are we going to get all of the questions and answers from?
        - they will be retrieved from our DB or an API
    2. What should the user see when they search a previously asked question?
        - The user will be able to see all of the thread of answers and comments and other statistics
    3. How should a user be able to make a comment or answer or vote for answer?
        - The user will be able to write a comment under through a form
    4. How will a user be able to make a vote?
        - Through a arrow field they can vote up or down by the click of a button, they can also unvote by the second click on the buttons.
    5. What will saved questions and answers thread look like?
        - The users will be able to click a save button and that the thread will be added to the users favorite in the DB which will then be in their profile

  - Acceptance Criteria
    - A User can post and answer questions
    - A User can delete the questions they post
    - A User can fetch all questions he/she has ever asked on the platform
    - A user can search for questions or answers thread by key words and it will render all the related questions and answers in the database
    - Users can write comments for topics which will then be rendered when the topic page is pulled up
    - Users can bookmark a post which will then be added to their bookmarked favorites in profile page
    - Users can accept an answer out of all the answers to his/her question as the preferred answer


* As a authorized user I want to be able to logout and log back in and see my same profile

    - Questions?
      1. How will the user be able to logout?
          - The user will be able to logout via a button on the navbar
      2. What will happen when the user logs out?
          - The page will be redirected to the login/signup page and the users info will be stored in the database
      3. What happens when an existing user logs back in?
          - The users information will be retrieved from the databse and it will render favorite threads with their saved location and add their data to their profile

    - Acceptance Criteria:
      - When a user logs out they will be redirected to the login/signup page and their information will be stored
      - When a user logs back in they will see their favorites, saved ones, and personal info
      - When a user logs out they can not return to the home page without logging back in
      - When a user navigates to their profile they will see their favorites and comments
