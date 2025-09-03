**Test Case ID:** QACW-01
**Test Case Title:** Create New User
**Objective:** Verify that an unregistered user can successfully create a user account using a valid username and password.
**Preconditions:** There should not be a currently logged-in user.
**Test Steps:**
1. Navigate to the landing page at "https://login.html"
2. Click button labled "New User"
3. Enter username User1
4. Enter password Pass1
5. Re-enter password Pass1
6. Click Create user
**Expected Result:** The dashboard page should be shown with the user User1 logged in.
**Actual Result:**
**Status:**

**Test Case ID:** QACW-02
**Test Case Title:** Login User
**Objective:** Verify that a registered user can successfully log in to the application using a valid username and password.
**Preconditions:** There should be a valid user User1 with password Pass1
**Test Steps:**
1. Navigate to the landing page at "https://login.html"
2. Click button labled "Login"
3. Enter username User1
4. Enter password Pass1
6. Click button labled "Login"
**Expected Result:** The dashboard page should be shown with the user User1 logged in.
**Actual Result:**
**Status:**

**Test Case ID:** QACW-03
**Test Case Title:** Log Out User
**Objective:** Verify that a registered user can successfully log out of the application by clicking the log out button.
**Preconditions:** There should be a valid user User1 with password Pass1
**Test Steps:**
1. Navigate to the landing page at "https://login.html"
2. Click button labled "Login"
3. Enter username User1
4. Enter password Pass1
6. Click button labled "Login"
7. User1 should be displayed at the far right of the navigation bar.
8. Click button labled "Log Out"
**Expected Result:** The landing page should be shown, no user should be logged in.
**Actual Result:**
**Status:**