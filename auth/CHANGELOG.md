# v2.0.01
In this version, we rewrite the whole plugin to fix known errors in the previous version and to match the compatibility of tuos-api@v2.0.01 universal config

### CHANGES
 - Rename functions in routes handler
 - Rewrite handler schema

### ADDED
 - Global routes schema template
 - New properties to Users Schema (phone, email, etc,...)
 - Tuos universal config proivided by tuos-api v2.0.01
 - Routes keys for universal config `.routes`

### FIX
 - Statement duplication
 - Unhandled Error Response: handler