**Test Case ID:** QACW-01\
**Test Case Title:** Create New User.\
**Objective:** Verify that an unregistered user can successfully create a user account using a valid username and password.\
**Preconditions:** There should not be a currently logged-in user.\
**Test Steps:**

1. Navigate to the Sign Up page at "http://127.0.0.1:5000/sign-up"
2. Enter email "test001@email.com"
3. Enter password "Test001"
4. Re-enter password "Test001"
5. Click "Submit"

**Expected Result:** The Contacts page should be shown.\
**Actual Result:** The Contacts page was shown.\
**Status:** Passed 09/10/2025\
\
\
\
**Test Case ID:** QACW-02\
**Test Case Title:** Login User\
**Objective:** Verify that a registered user can successfully log in to the application using a valid email and password.\
**Preconditions:** There should be a valid registered user with email test001@email.com and password Test001.\
**Test Steps:**

1. Navigate to the Login page at "http://127.0.0.1:5000/login"
2. Enter email "test001@email.com"
3. Enter password "Test001"
4. Click button labled "Login"

**Expected Result:** The Contacts page should be shown.\
**Actual Result:**\
**Status:**\
\
\
\
**Test Case ID:** QACW-03\
**Test Case Title:** Log Out User.\
**Objective:** Verify that a logged in user can successfully log out of the application by clicking the log out button.\
**Preconditions:** There should be a valid registered user with email test001@email.com and password Test001.\
**Test Steps:**

1. Navigate to the Login page at "http://127.0.0.1:5000/login"
2. Enter email "test001@email.com"
3. Enter password "Test001"
4. Click button labled "Login" 
5. Contacts page should be displayed
6. Click button labled "Log Out"

**Expected Result:** The Login page should be shown, no user should be logged in.\
**Actual Result:**\
**Status:**
\
\
\
**Test Case ID:** QACW-04\
**Test Case Title:** Create New User with not-matched passwords.\
**Objective:** Verify that an unregistered user can not create a user account using a valid username and not-matched passwords.\
**Preconditions:** There should not be a currently logged-in user.\
**Test Steps:**

1. Navigate to the Sign Up page at "http://127.0.0.1:5000/sign-up"
2. Enter email "test001@email.com"
3. Enter password "Test001"
4. Enter Confirm password "NotMatched"
5. Click "Submit"

**Expected Result:** The Sign Up page with error alert "Passwords do no match." should be shown.\
**Actual Result:** The Sign Up page with error alert "Passwords do no match." was shown.\
**Status:** Passed 09/11/2025\
\
\
\
**Test Case ID:** QACW-05\
**Test Case Title:** Create New User with invalid password.\
**Objective:** Verify that an unregistered user can not create a user account using a valid username and an invalid password.\
**Preconditions:** There should not be a currently logged-in user.\
**Test Steps:**

1. Navigate to the Sign Up page at "http://127.0.0.1:5000/sign-up"
2. Enter email "test001@email.com"
3. Enter password "Test"
4. Re-enter password "Test"
5. Click "Submit"

**Expected Result:** The Sign Up page with error alert "Password must be at least 7 characters long." should be shown.\
**Actual Result:** Error alert "Password must at least 7 characters long." was shown.\
**Status:** Failed 09/11/2025\
\
\
\
**Test Case ID:** QACW-06\
**Test Case Title:** Create New User with invalid email.\
**Objective:** Verify that an unregistered user can not create a user account using an invalid username and a valid password.\
**Preconditions:** There should not be a currently logged-in user.\
**Test Steps:**

1. Navigate to the Sign Up page at "http://127.0.0.1:5000/sign-up"
2. Enter email "t@e"
3. Enter password "Test001"
4. Re-enter password "Test001"
5. Click "Submit"

**Expected Result:** The Sign Up page with error alert "Email must be more than 3 characters long." should be shown.\
**Actual Result:** The Sign Up page with error alert "Email must be more than 3 characters long." was shown.\
**Status:** Passed 09/11/2025\
\
\
\
**Test Case ID:** QACW-07\
**Test Case Title:** Create New User with email already in use.\
**Objective:** Verify that an unregistered user can not create a user account using an email already in use and a valid password.\
**Preconditions:** There should not be a currently logged-in user.\
**Test Steps:**

1. Navigate to the Sign Up page at "http://127.0.0.1:5000/sign-up"
2. Enter email "test001@email.com"
3. Enter password "Test001"
4. Re-enter password "Test001"
5. Click "Submit"
6. Click "Log Out"
7. Navigate to the Sign Up page at "http://127.0.0.1:5000/sign-up"
8. Enter email "test001@email.com"
9. Enter password "Test001"
10. Re-enter password "Test001"
11. Click "Submit"

**Expected Result:** The Sign Up page with error alert "Email already in use." should be shown.\
**Actual Result:** The Sign Up page with error alert "Email already in use." was shown.\
**Status:** Passed 09/11/2025\
\
\
\
**Test Case ID:** QACW-08\
**Test Case Title:** Create New User with no inputs.\
**Objective:** Verify that an unregistered user can not create a user account using a blank form.\
**Preconditions:** The Sign Up page with error alert "Email must be more than 3 characters long." should be shown.\
**Test Steps:**

1. Navigate to the Sign Up page at "http://127.0.0.1:5000/sign-up"
5. Click "Submit"

**Expected Result:** The Sign Up page with error alert "Email must be more than 3 characters long." should be shown.\
**Actual Result:** The Sign Up page with error alert "Email must be more than 3 characters long." should be shown.\
**Status:** Passed 09/19/2025\