### Arrays

Obvious way to store an ordered collection of items. Loops and iteration are used to sequentially process those items.

### Invariants

An invariant is a condition that does not change during execution of a given program or algorithm. They are important as they enable correctness proofs and verification.

### Extensible Markup Language (XML)

XML has become the quasi-standard for communicating data structures between different computers and programming languages. There are many different ways to represent the same object in XML. It is flexible enough to represent and communicate very complicated structures in a uniform way.

```xml
<!--list representation-->
<ol>
    <li>3</li>
    <li>4</li>
</ol>

<!--cell-oriented representation-->
<cell>
    <first>3</first>
    <rest>
        <cell>
            <first>4</first>
            <rest></rest>
        </cell>
    </rest>
</cell>
```
