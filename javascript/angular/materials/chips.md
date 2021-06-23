```html
<mat-form-field class="mat-alignment">
    <mat-label>Process Levels</mat-label>
    <mat-chip-list #chipList>
      <mat-chip
        *ngFor="let item of _userSelectedLevels"
        [selectable]="selectable"
        [removable]="removable"
        (removed)="remove(item)">
        {{item}}
        <mat-icon matChipRemove *ngIf="removable">x</mat-icon>
      </mat-chip>
      <input
        placeholder="Please enter a level"
        #userInput
        [formControl]="formCtrl"
        [matAutocomplete]="auto"    // #auto inserted to show the dropdown list
        [matChipInputFor]="chipList"
        [matChipInputSeparatorKeyCodes]="separatorKeysCodes"
        (matChipInputTokenEnd)="add($event)">
    </mat-chip-list>
    <mat-autocomplete #auto="matAutocomplete" (optionSelected)="selected($event)">    // #auto as an alias to mat-autocomplete element
      <mat-option *ngFor="let item of _filteredLevels | async" [value]="item">
        {{item}}                                                                                                                                                                                                                                                                                                                                                                                                                                                           
      </mat-option>
    </mat-autocomplete>
  </mat-form-field> 
```
