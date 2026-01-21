*** Settings ***
Documentation     Page Object for the Practice Test Table page.
Library           Browser
Library           BuiltIn

*** Variables ***
${URL}                        https://practicetestautomation.com/practice-test-table/
${RADIO_JAVA}                 role=radio[name="Java"]
${CHECKBOX_INTERMEDIATE}      role=checkbox[name="Intermediate"]
${TABLE_ROWS_VISIBLE}         table tbody tr:visible
${COL_LANGUAGE_INDEX}         3
${COL_LEVEL_INDEX}            4

*** Keywords ***
Open Practice Table Page
    [Documentation]    Opens the practice table page.
    New Page    ${URL}

Filter By Language Java
    [Documentation]    Selects the Java language filter.
    Click    ${RADIO_JAVA}

Filter Out Intermediate Level
    [Documentation]    Unchecks the Intermediate level checkbox.
    Uncheck Checkbox    ${CHECKBOX_INTERMEDIATE}

Verify Visible Row Count Is
    [Arguments]    ${expected_count}
    [Documentation]    Verifies that the number of visible rows in the table matches the expected count.
    Get Element Count    ${TABLE_ROWS_VISIBLE}    ==    ${expected_count}

Verify Rows Content For Java Beginner Or Advanced
    [Documentation]    Iterates through visible rows and verifies Language is Java and Level is Beginner or Advanced.
    ${rows}=    Get Elements    ${TABLE_ROWS_VISIBLE}
    FOR    ${row}    IN    @{rows}
        ${lang}=     Get Text    ${row} >> td:nth-child(${COL_LANGUAGE_INDEX})
        Should Be Equal    ${lang}    Java    msg=Row language should be Java
        
        ${level}=    Get Text    ${row} >> td:nth-child(${COL_LEVEL_INDEX})
        Should Be True     '${level}' in ['Beginner', 'Advanced']    msg=Row level '${level}' is not Beginner or Advanced
    END
