## Implementing Service Tests

Service test suite needs to launch stub services for any downstream collaborators (or ensure they are running), and configure the service under test to connect to the stub services. After, need to configure the stubs to send responses back to mimic the real-world services.

### Stubbing

When stubbing, it is to create a stub service that responds with canned responses to known requests from the service under test i.e. querying a user123's bank balance should return 10,000. Can be classified as **state testing with predetermined behavior and hardcoded values**. A stub doesn't care whether it is called 0, 1, or 100 times.

### Mocking

When mocking, it is to ensure that the call was made. If the expected call is not made, the test fails. Can be classified as **behavioral testing**. Implementing this approach requires more smarts in the fake collaborators that we create, and if overused can cause tests to become brittle.

### Stubbing vs Mocking

The easiest way to tell we are dealing with a stub is to notice that a stub can never fail the test. The assert the test uses are always against the class under test. On the other hand, the test will use a mock object to verify whether the test has failed or not.

Mocks can be useful to ensure that the expected side effects happen. In general, stubs are used far more than mocks for service tests.

## Downsides to E2E Testing

### Flaky and brittle tests

As test scope increases, so do the number of moving parts. These moving parts can introduce test failures that do not show that the functionality under test is broken, but that some other problem has occurred.

More moving parts means more brittle tests, and if you simply re-run them as they might pass again later, then you have flaky tests. When flaky tests are detected, it is essential that we do our best to remove them.

### Writing tests

If multiple teams are involved and E2E is shared between them, it is difficult to assign the person who writes and looks after these tests. If tests become free-for-all, it is likely that teams will add tests without any understanding of the health of the whole suite.

### Great pile-up

With a long test suite and feedback cycles, any breaks take a while to fix which can eventually lead to a pile up. The larger the scope of deployment, the higher the risk of a release, and the more likely we are to break something. A key driver to ensuring we can release our software frequently is based on the idea that we release small changes as soon as they are ready.

### The metaversion

The approach of accepting multiple services being deployed together drifts into a situation where services become coupled and increasingly tangled with others. This would cede one of the main advantages of microservices: the ability to deploy a service independently.

### Test journeys, not stories

Despite the disadvantages outlined, we should focus on a small number of core journeys (high value interactions) to test for the whole system. any functionality not convered in these core journeys needs to be covered in tests that analyze services in isolation from each other.

## Consumer-Driven Tests

When using intergration tests, we want to ensure that deploying a new service doesn't break consumers. One way to do this without requiring test against the real consumer is by using consumer-drivne contract (CDC).

With CDCs, we are defining the expectations of a consumer on a service/producer. They should be run as part of CI build of the producer, ensuring that it never gets deployed if it breaks one of these contracts. Should only be run against a single producer in isolation so that it can be more reliable than E2E tests.
