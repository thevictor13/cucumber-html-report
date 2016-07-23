Feature: Report Summary module

  Scenario: Calculate summary for a report
    Given a valid JSON file
    When I calculate the summary
    Then it should return number of features
    And it should return number of scenarios
    And it should return number of passed scenarios
    And it should return number of failed scenarios
    And it should return the status

  Scenario: Get status of a passing feature
    Given a feature with a passing scenario
    Then it should return status "passed" for feature

  Scenario: Get status of a failing feature
    Given a feature with a failing scenario
    Then it should return status "failed" for feature

  Scenario: Get status of a passing scenario
    Given a feature with a passing scenario
    Then it should return status "passed" for scenario

  Scenario: Get status of a failed scenario
    Given a feature with a failing scenario
    Then it should return status "failed" for scenario

  Scenario: Get status of a skipped scenario
    Given a feature with a skipped scenario
    Then it should return status "failed" for scenario

  Scenario: Get status of a undefined scenario
    Given a feature with a undefined scenario
    Then it should return status "failed" for scenario
