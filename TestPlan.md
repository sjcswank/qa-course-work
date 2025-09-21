# Test Plan
- **Written By:** sjcswank
- **Date:** 08/29/2025
- **Project:** QA Course Work

## Introduction
**Overview:**  
**Scope:**  
**Team/Stakeholders:**  

## Test Items
1. Create New User *Complete
2. Login Exsisting User *Complete
3. Log Out Exsisting User *Complete
4. Accessibility requirements for the Login page *Complete

## Test Criteria
**Entry Criteria:** Conditions that must be met before testing begins.  
**Exit Criteria:** Conditions that must be met for testing to conclude.  

## Resources
**Human Resources:** 
- sjcswank- QA Engineer
**Software:**
- Tools: Cyprus, Jira, GitHub
- Techniques: Black Box testing, White Box testing
**Hardware:**
- PC running Windows 11 with chrome 139 installed
- Smartphone running Android 16 with Chrome 139 installed

## Schedule
8/29/2025: Test Activities Begin  
8/30/2025: Preliminary Test Plan Written  
9/1/2025: Critical Test Cases Written  
9/2/2025: Test Plan Accepted  
10/2/2025: Testing Concluded  

## Test Strategy
**Types of Testing:** Functional, Performance, Accessibility, Acceptance.  
**Testing Environments:** Development, Test, Prod  
**Device Matrix:**  
| Platform | Operating System | Browser | Version |
|:---------|:----------------:|:-------:|--------:|
| PC       | Windows 10 Home  | Chrome  | 139     |
| Phone    | Android 16       | Chrome  | 139     |

## Test Items
- Create New User: User should be able to enter a username and password and create a new user from that info.
- Login User: User should be able to enter a username and password and login to an exsiting user account.
- Log Out User: User should be able to click a log Out button and no longer be logge in to a user account.
- Accessibility of the Login page: All elements on the landing page should meet Web Content Accessibility Guidelines Level AA standards.

## Test Deliverables
- Test Cases:
  - Verify that a registered user can successfully log in to the application using a valid username and password.
  - Verify that an unregistered user can successfully create a user account using a valid username and password.
  - Verify that a registered user can successfully log out of the application by clicking the log out button.
  - Verify that the Login page meet WCAG2.1A and WCAG2.1AA Guidelines and accessibility best practices.
- Documentation:
  - Test Cases
  - Test Scripts
  - Reports
    - Test Coverage
    - Defect Density
    - Defect Leakage
    - Time To Resolve

## Risks and Mitigation
- Risks
  - Incomplete or Inaccurate Requirements
  - Environment Compatibility Problems
  - Unrealistic Deadlines
- Strategies
  - Create a comprehensive test plan.
  - Employ agile methodologies to allow for continuous feedback and adaptation.
  - Perform compatibility testing across various environments.
