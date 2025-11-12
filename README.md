# My Project

## Resource

**Messages**

Attributes:

* username (string)
* password (string)


## Schema

```sql
CREATE TABLE messags (
id INTEGER PRIMARY KEY,
username TEXT,
password TEXT);
```

## REST Endpoints

Name                           | Method | Path
-------------------------------|--------|------------------
Retrieve all messages          | GET    | /messages
Retrieve specific message      | GET    | /messages/*\<id\>*
Create new messages member     | POST   | /messages
Update existing messages member| PUT    | /messages/*\<id\>*
Delete existing messages member| DELETE | /messages/*\<id\>*
