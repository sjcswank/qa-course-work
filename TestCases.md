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

**Expected Result:** The success alert "Welcome, test001@email.com should be shown on the Contacts page.\
**Actual Result:** The success alert "Welcome, test001@email.com was shown on the Contacts page.\
**Status:** Passed 09/10/2025\
\
\
\
**Test Case ID:** QACW-02\
**Test Case Title:** Login User\
**Objective:** Verify that a registered user can successfully log in to the application using a valid email and password.\
**Preconditions:** There should be a valid registered user with email test001@email.com and password Test001. There should not be a currently logged in user.\
**Test Steps:**

1. Navigate to the Login page at "http://127.0.0.1:5000/login"
2. Enter email "test001@email.com"
3. Enter password "Test001"
4. Click button labled "Login"

**Expected Result:** The Contacts Page with success alert "Welcome back, test001@email.com!" should be displayed.\ 
**Actual Result:** The Contacts Page with success alert "Welcome back, test001@email.com!" was displayed.\
**Status:** Passed 9/19/2025\
\
\
\
**Test Case ID:** QACW-03\
**Test Case Title:** Log Out User.\
**Objective:** Verify that a logged in user can successfully log out of the application by clicking the log out link.\
**Preconditions:** There should be a valid registered, LOGGED IN user with email test001@email.com and password Test001.\
**Test Steps:**

1. Navigate to the Home page at "http://127.0.0.1:5000/"
2. Contacts Page should be shown.
3. Click link labled "Logout"
4. The Login page should be shown.
5. Navigate to the Home page "http://127.0.0.1:5000/".
6. The Login page should be shown.

**Expected Result:** The Login page should be shown.\
**Actual Result:** The Login Page was shown.\
**Status:** Passed 9/20/2025\
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
**Actual Result:** The Sign Up page with error alert "Password must at least 7 characters long." was shown.\
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
**Preconditions:** There should not be a currently logged-in user.\
**Test Steps:**

1. Navigate to the Sign Up page at "http://127.0.0.1:5000/sign-up"
2. Click "Submit"

**Expected Result:** The Sign Up page with error alert "Email must be more than 3 characters long." should be shown.\
**Actual Result:** The Sign Up page with error alert "Email must be more than 3 characters long." was shown.\
**Status:** Passed 09/19/2025\
\
\
\
**Test Case ID:** QACW-09\
**Test Case Title:** Login User with invalid email.\
**Objective:** Verify that a user can not log in to the application using an invalid email.\
**Preconditions:** There should not be a currently logged in user.\
**Test Steps:**

1. Navigate to the Login page at "http://127.0.0.1:5000/login"
2. Enter email "unregistered@email.com"
3. Enter password "Test001"
4. Click button labled "Login"

**Expected Result:** The Login Page with error alert "Email does not exist." should be displayed.\ 
**Actual Result:** The Login Page with error alert "Email does not exist." was displayed.\ 
**Status:** Passed 9/19/2025\
\
\
\
**Test Case ID:** QACW-10\
**Test Case Title:** Login User with invalid password.\
**Objective:** Verify that a user can not log in to the application using a valid registered email and an invalid password.\
**Preconditions:** There should be a valid registered user with email test001@email.com and password Test001. There should not be a currently logged in user.\
**Test Steps:**

1. Navigate to the Login page at "http://127.0.0.1:5000/login"
2. Enter email "test001@email.com"
3. Enter password "Invalid1"
4. Click button labled "Login"

**Expected Result:** The Login Page with error alert "Email does not exist." should be displayed.\ 
**Actual Result:** The Login Page with error alert "Email does not exist." was displayed.\
**Status:** Passed 9/19/2025\
\
\
\
**Test Case ID:** QACW-11\
**Test Case Title:** Submit Login form with no data.\
**Objective:** Verify that a user can not log in to the application using a blank form.\
**Preconditions:** There should not be a currently logged in user.\
**Test Steps:**

1. Navigate to the Login page at "http://127.0.0.1:5000/login"
2. Click button labled "Login"

**Expected Result:** The Login Page with error alert "Email does not exist." should be displayed.\ 
**Actual Result:** The Login Page with error alert "Email does not exist." was displayed.\ 
**Status:** Passed 9/19/2025\
\
\
\
**Test Case ID:** QACW-12\
**Test Case Title:** The Login page is accessible.\
**Objective:** Verify that there are no WCAG2.1A and WCAG2.1AA guidelines and accessibility best practice violations on the Login Page.\
**Preconditions:** There should not be a currently logged in user. There should be a registered user with email test001@email.com and password Test001.\
**Test Steps:**

1. Navigate to the Login page at "http://127.0.0.1:5000/login"
2. There should be no violations
3. Submit form with email "unregistered@email.com" and password "Test001"
4. There should be no violations
5. Submit form with email "test001@email.com" and password "Invalid1"
6. There should be no violations

**Expected Result:** There should be no violations on the Login page.\ 
**Actual Result:** \ 
**Status:** \