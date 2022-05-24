### CSV

CSV output format is a text file with each record from the crawl per line, with columns separated by commas. Useful when data is strictly tabular, structure is known and both generation and consumption of data file is in your control.

### XML

Has larger overhead than CSV, but with strengths as follows:

- Can validate XML data against XSD.
- Can have one-to-many relations in multi-levels in XML data representation.
- Can have more complex hierarchy and structure i.e. more flexibility.
- More readable than CSV (debatable).
- Natively supported by .NET framework.
- Have standard parsers available everywhere.
- Preferred over CSV when data is unstructured i.e. unknown Schema.
