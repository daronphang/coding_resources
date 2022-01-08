### Jinja2

A powerful templating language used to create HTML, XML or other markup formats that are returend to the user via HTTP request. Most important feature is Template Inheritance.

### Placeholder Variable Delimiter

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

### Control Structures

```
{% if user %}   #{% if user == 'John' %}
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

### Template Inheritance

```
{% extends "bootstrap/base.html" %}
{% include "parent_base.html" %}
{% block scripts %}
{{ super() }}   #to add content to a block that already has some content
<script type="text/javascript" src="my-script.js"></script>
{% endblock %}
```

### Localization of Dates and Times

Server needs uniform time units that are indepedent of location of each user; however, may be confusing for users. There is an open source library written in Javascript
that renders dates and times in browser called Moment.js. Use Flask extension that integrates Moment.js into Jinja2 templates.

```python
from flask_moment import Moment
from datetime import datetime

moment = Moment(app)

@app.route('/')
def index():
return render_template('index.html', current_time=datetime.utcnow())
```

```
{% block scripts %}
{{ super() }}
{{moment.include_moment() }}    # added in parent_base.html template
{% endblock %}
{% block content %}
  <p>The local date and time is {{ moment(current_time).format('LLL') }}.</p>
{% endblock %}
```
