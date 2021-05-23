## Bootstrap Classes:
Link Reference: https://www.w3schools.com/bootstrap/bootstrap_ref_all_classes.asp
```
.col:
<div class="col-sm-4">{{ wtf.quick_form(form) }}</div>

.button:
<div>
  <a href="{{ url_for(main.index) }}">
    <button type="button" class="btn btn-primary">Homepage</button>
  </a>
</div>
```
### Containers:
Used to establish the width for the layout. Have default fixed widths that will change based on the size of viewing device. Allows up to 12 columns across a page.
```
<div class="container">     # use container-fluid to not fix the width size
  <div class="row">
    <div class=“col-sm-8”> Content </div>
    <div class=“col-sm-4”> Content </div>
</div>
```
