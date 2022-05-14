### Unit Tests

These are tests that typically test a single function or method call. The tests generated as a side of test-driven design (TDD) will fall into this category. Also limits the use of external files or network connections. In general, you want a large number of these sorts of tests.

The prime goal of these tests is to give us very fast feedback about whether our functionality is good. Tests can be important to support refactoring of code, allowing us to restructure our code as we go.

### Service Tests

Designed to bypass the user interface and test services directly. This tests the individual service's capabilities. This is to improve the isolation of the test to make finding and fixing problems faster. Need to stub all external collaborators so only the service itself is in scope.

If you decide to test against a real database, or go over networks to stubbed downstream collaborators, test times can increase. Though they cover more scope than a unit test and failing can be harder to detect what is broken, they have much fewer moving parts and are therefore less brittle than larger-scoped tests.

### End-to-End Tests

E2E tests run against your entire system. Often they will be driving a GUI through a browser, but could easily be mimicking other sorts of user interaction, such as uploading a file. Can be tricky to do well in a microservices context.
