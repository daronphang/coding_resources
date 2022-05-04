## Luigi

A Python package developed by Spotify that manages long-running batch processing and helps you to build complex pipelines of batch jobs. It handles dependency resolution, workflow management, visualization, handling failures, command line integration, and etc.

## Pipeline Structure

Structure resembles that of a graph i.e. information is passed between nodes through edges. Has a "backwards" process flow (starts from the last task) that allows it to recover from failed tasks without running the whole pipeline again.

## Building Blocks

Nodes are called Tasks and edges are called Targets.

### Tasks

Inherits from Luigi.Task and has methods including requires(), run(), output() and targets.

### Target

The edge connecting a Task to the next.

### Parameters

Equivalent of creating a constructor for each Task i.e. instance variables of a class. Only one instance is created for each set of parameters.

Has different parameter types including DateParameter, DateIntervalParameter, IntParameter, FloatParameter, etc.

```py
class MakeSomething(luigi.Task):
    string = luigi.Parameter(default='hello world!')
```
