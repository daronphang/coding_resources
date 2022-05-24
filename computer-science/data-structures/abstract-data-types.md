## Arrays

Obvious way to store an ordered collection of items. Loops and iteration are used to sequentially process those items.

## Invariants

An invariant is a condition that does not change during execution of a given program or algorithm. They are important as they enable correctness proofs and verification.

## Linked Lists

A list can virtually involve anything. Non-empty lists can be represented by two-cells; first cell contains pointer to a list element and second cell contains a pointer to either the empty list or another/next two-cell element.

### Constructors

```
EmptyList
MakeList(element,list)      Puts an element at the top of an existing list
```

### Selectors

```
first   Returns first element in list
rest    Returns rest of elements other than first
```

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

## Recursion

Can be used to iterate over lists. Idea is to formulate procedures which involve at least one step that invokes/calls the procedure itself. Two important derived procedures on lists: last and append.

Procedure has linear time complexity i.e. execution time depends on length of list by some factor. Compared to constant time complexity which access to last element of an array, this is quite bad.

```
last(1) {
    if (isEmpty(1))
        error('empty list in last')
    elseif (isEmpty(rest(1)))
        return first(1)
    else
        return last(rest(1))
}
```

## Doubly Linked Lists

Useful when working with a list of webpages, whereby each has a page containing a picture, a link to previous page, a link to next page. Doubly-linked list has an easy way to get previous and next element as compared to linked list. Can be represented by three-cells; first cell contains a pointer to previous three-cell/empty list, second cell contains a pointer to the list element and third cell contains a pointer to next three-cell/empty list.
