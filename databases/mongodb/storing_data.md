### Storing Data

MongoDB encourages embedding of data (arrays) instead of relations as it allows to get all relevant data with a single query. Arrays take up less disk space than objects with keys and values, and tend to be lightning fast for both data storage and retrieval. However, for documents gradually grows over its lifetime, database has to reallocate hard drive space frequently which slows down writes and leads to database fragmentation. Documents also have a hardcoded size limit of 16MB to discourage document growth.

### Handling Growing Arrays

Key points to consider when using arrays for storage:

- Expansion: Instead of being rewritten, the document will instead be moved on the disk. This movement tends to be slower as it requires every index to also be updated.
- Indexing: If an array field is indexed, MongoDB indexes each value of the array so you can query individual items.
- BSON Format: Finding one or more elements in a large array can take a long time as BSON uses linear memory scan to manipulate documents.
