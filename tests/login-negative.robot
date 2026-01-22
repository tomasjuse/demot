*** Settings ***
Documentation     Login Page - Negative Password Test
Library           Browser
Variables         config_loader.py

*** Variables ***
${EXPECTED_ERROR_MSG}     Your password is invalid!

*** Test Cases ***
Should Display Error Message For Invalid Password
    [Documentation]    Verify that error message is displayed when invalid password is entered
    [Tags]    negative    login    authentication
    
    # Step 1: Open page
    Open Login Page
    
    # Step 2: Type username student into Username field
    Enter Username    ${USERNAME}
    
    # Step 3: Type password incorrectPassword into Password field
    Enter Password    ${INVALID_PASSWORD}
    
    # Step 4: Push Submit button
    Click Submit Button
    
    # Step 5: Verify error message is displayed
    Verify Error Message Is Displayed
    
    # Step 6: Verify error message text is Your password is invalid!
    Verify Error Message Text    ${EXPECTED_ERROR_MSG}

*** Keywords ***
Open Login Page
    [Documentation]    Navigate to the login page
    New Browser    chromium    headless=False
    New Page    ${LOGIN_URL}

Enter Username
    [Documentation]    Fill username field with provided value
    [Arguments]    ${username}
    Fill Text    role=textbox[name="Username"]    ${username}

Enter Password
    [Documentation]    Fill password field with provided value
    [Arguments]    ${password}
    Fill Text    role=textbox[name="Password"]    ${password}

Click Submit Button
    [Documentation]    Click the submit button
    Click    role=button[name="Submit"]

Verify Error Message Is Displayed
    [Documentation]    Verify that error message element is visible
    Get Element States    id=error    validate    visible

Verify Error Message Text
    [Documentation]    Verify error message contains expected text
    [Arguments]    ${expected_text}
    Get Text    id=error    ==    ${expected_text}
