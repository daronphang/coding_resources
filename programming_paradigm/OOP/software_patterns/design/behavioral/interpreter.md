### Interpreter

Intent is to define a representation for its grammar along with an interpreter that uses the representation to interpret sentences in the language.

### Motivation

If a particular kind of problem occurs often enough, it might be worthwhile to express instances of the problem as sentences in a simple language, and building an interpreter that solves the problem by interpreting the sentences.

For example, searching for strings that match a pattern is a common problem; rather than building custom algorithms to match each pattern against strings, search algorithms could interpret a regex that specifies a set of strings to match.

### Applicability

Use the Interpreter pattern when there is a language to interpret, and you can represent statements in the langauge as abstract syntax trees. Works best when:

- Grammar is simple; for complex grammars, class hierarchy becomes large and unmanageable.
- Efficiency is not a critical concern.

### Participants

#### AbstractExpression

- Declares an abstract Interpret operation that is common to all nodes.

#### TerminalExpression

- Implements an Interpret operation associated with terminal symbols in grammar.
- An instance is required for every terminal symbol in sentence.

#### NonTerminalExpression

- One such class required for every rule in grammar.

#### Context

- Contains information that's global to the interpreter.

#### Client

- Builds an abstract syntax tree representing a particular sentence in the language that the grammar defines.
