### Jenkins

Leading open source automation server written in Java; offers simple way to setup CI/CD environment for almost any combination of languages and source code repositories using pipelines and automating routine development tasks. Supports the complete development life cycle of software from building, testing, documenting, deploying and other stages. During development, Jenkins will continously test project builds and show errors in early stages.

### How it Works

Server-based application and requires a web server like Apache Tomcat to run on various platforms including Windows, Linux, macOS, etc. To use Jenkins, need to create pipelines which are a series of steps that a Jenkin server will take.

### Tools/Plugins

Consists of a set of tools designed to host, monitor, compile and test code:

- **Continuous Integration Server** (Jenkins, Bamboo, CruiseControl, Teamcity).
- **Source Control Tool** (CVS, SVN, GIT, Mercurial, ClearCase).
- **Build Tool** (Make, ANT, Maven, Ivy, Gradle).
- **Automation Testing Framework** (Selenium, Appium, TestComplete, UFT).

### Benefits

|                       | Map                                                                                        | Object                                                                    |
| --------------------- | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------- |
| Keys                  | Map does not contain any keys by default.                                                  | Object has prototype which contains default keys (possible of collision). |
| Key Types             | Allows both objects and primitive types to be used.                                        | Must either be string or symbol.                                          |
| Key Order             | Maps are ordered and remembers original insertion of keys.                                 | Keys of ordinary Object are ordered in ECMA2015.                          |
| Size                  | Can be retrieved easily with size().                                                       | Must be determined manually.                                              |
| Iteration             | Can be directly iterated.                                                                  | Need convert to array using Object.entries().                             |
| Performance           | Performs better in scenarios involving frequent additions and removals of key-value pairs. | Not optimized for frequent changes.                                       |
| Serialization/Parsing | No native support for serialization and parsing.                                           | Object to JSON using JSON.stringify(). JSON to object using JSON.parse(). |
| Prototype             | Inherits from Map.prototype.                                                               | Inherits from Object.prototype.                                           |
| Storage               | Able to store 16.7 million key/value pairs.                                                | Able to store 11.1 million key/value pairs.                               |

### Setup

Install Putty.
