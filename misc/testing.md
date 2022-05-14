## Test Double

Generic term for any kind of pretend object used in place of a real object for testing purposes.

https://martinfowler.com/articles/mocksArentStubs.html

### Dummy

Objects that are passed around but never actually used. Usually they are just used to fill parameter lists or constructors in classes.

### Fake

Objects that actually have working implementations, but usually take some shortcut which makes them not suitable for production i.e. in-memory database.

### Stubs

Stubs provide canned answsers to calls made during the test, usually not responding at all to anything outside what's programmed in for the test i.e. querying a user123's bank balance should return 10,000. Can be classified as **state testing with predetermined behavior and hardcoded values**. A stub doesn't care whether it is called 0, 1, or 100 times.

### Spies

Spies are stubs that also record some information based on how they were called i.e. an email service that records how many messages it sent.

### Mocks

Objects pre-programmed with expectations which form a specification of the calls they are expected to receive. When mocking, it is to ensure that the call was made. If the expected call is not made, the test fails. Can be classified as **behavioral testing**. Implementing this approach requires more smarts in the fake collaborators that we create, and if overused can cause tests to become brittle.

### Stubbing vs Mocking

The easiest way to tell we are dealing with a stub is to notice that a stub can never fail the test. The assert the test uses are always against the class under test. On the other hand, the test will use a mock object to verify whether the test has failed or not. Mocks can be useful to ensure that the expected side effects happen.
