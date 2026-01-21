*** Settings ***
Documentation     Migrated from Playwright: Filter Java courses with Beginner or Advanced levels.
...               Refactored to use Page Object Model (POM).
Resource          ../resources/practice_page.resource
Library           Browser

*** Test Cases ***
Filter Java courses with Beginner or Advanced levels
    [Tags]    practice
    Open Practice Table Page
    Filter By Language Java
    Filter Out Intermediate Level
    
    Verify Visible Row Count Is    4
    Verify Rows Content For Java Beginner Or Advanced
    
    Take Screenshot    filename=test-results/filtered-table
    [Teardown]    Close Browser