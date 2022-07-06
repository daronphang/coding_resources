## Text and HTML Templates

GO offer text and HTML template packages for substituting values of variables into a text or HTML template.

A template is a string of file containing one or more portions enclosed in double braces {{...}} called actions. Actions trigger other behaviors. Each action contains an expression in the template language, a simple but powerful notation for printing values, calling functions/methods, expressing control flows, and instantiating other templates.

```GO
const templ = `{{.TotalCount}} issues:
  {{range .Items}}      // range and end creates a loop
  Number: {{.Number}}
  {{end}}`
```
