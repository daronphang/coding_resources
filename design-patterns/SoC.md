## SoC (Separation of concerns)

SoC is a software architecture design pattern for separating an application into distinct sections. Goal is to establish a well-organized system where each part fulfills a meaningful and intuitive role while maximizing its ability to adapt to change. This is achieved by the establishment of boundaries. General idea is that one should avoid collating different concerns within the design or code. SoC can be applied on an architectural and programming level.

### Architectural

An application can be separated into various layers:

- User interface
- Data access/model
- Business logic

### Programming

SoC can be applied on the component level, separating services into different components i.e. online shopping website can be separated into shopping cart, orders, customers, authentication and payments.

### Benefits

- Manages complexity and increases maintainability of the module.
- Enhances cohesion and reduces coupling between modules
- Enable scalable program that is open to extension.
- Allow easy reuse of modules and functionalities.
- Reduces fragility of modules.
