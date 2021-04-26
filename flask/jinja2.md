# Jinja2:
A powerful templating language used to create HTML, XML or other markup formats that are returend to the user via HTTP request. Most important feature is Template Inheritance.

## Placeholder Variable Delimiter:
Recognizes variables of any type including lists, dictionaries, and objects.  
```
<p>Value from dictionary: {{ mydict['key'] }}</p>
<p>Value from list: {{ mylist[3] }}</p>
<p>Value from object's method: {{ myobj.somemethod() }}</p>
```
Variables can be modified with filters with a pipe character as separator. Commmon filters as follows:
- safe: Renders the value without applying escaping (escape by default setting)
- capitalize: Converts first character of vale to uppercase
- lower: Converts value to lowercase
- upper: Converts value to uppercase
- title: Capitalizes each word in value
- trim: Removes leading and trailing whitespace from value
- striptags: Removes any HTML tags from value before rendering
```
{{ name|capitalize }}
{{ paragraph|safe }}  # if variable is '<h1>Hello</h1>, returns raw value without escaping i.e. &lt;h1&gt;Hello&lt;/h1&gt;'
```
## Control Structures:
```
{% if user %}
  Hello, {{ user }}
{% else %}
  Hello, stranger
{% endif %}
```
```
<ul>
  {% for name in list %}
    <li>{{ name }}</li>
  {% endfor %}
</ul>
```
```
{% block title %} Main Page {% endblock %}  #blocks defined in base template can be overridden by derived templates
```
## Template Inheritance:
```
{% extends "bootstrap/base.html" %}
{% include "parent_base.html" %}
```
