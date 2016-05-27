Feature: Report Summary

  Scenario: Calculate summary for a report
    Given a valid JSON file
    When I calculate the summary
    Then it should return number of features
    And it should return number of scenarios
    And it should return number of passed scenarios
    And it should return number of failed scenarios
    And it should return the status
