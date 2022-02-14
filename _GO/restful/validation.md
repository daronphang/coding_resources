### Custom Validation

https://medium.com/tunaiku-tech/go-validator-v10-c7a4f1be37df

#### Create Validation Function

```go
func validateNationalId(fl validator.FieldLevel) bool {
   nationalId := fl.Field().String()

   if len(nationalId) != lengthNationalId {
      return false
   }

   regex, _ := regexp.Compile("\\D")
   result := regex.MatchString(nationalId)
   return !result
}
```

#### Add Function to Validator

```go
validate.RegisterValidation("national_id", validateNationalId)
```
