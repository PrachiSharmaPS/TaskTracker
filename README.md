# Task-Manager
## Project -Task-Manager


### Models
- User Model
```yaml
{ 
  name: {string, mandatory},
  phone: {string, mandatory, unique},
  email: {string, mandatory, valid email, unique}, 
  password: {string, mandatory, minLen 8, maxLen 15},
  taskCount:{string,default:0},
  pending-taskCount:{string,default:0},
  createdAt: {timestamp},
  updatedAt: {timestamp}
}
```

- Task Model
```yaml
{ 
  title: {string, mandatory, },
  userId: {ObjectId, mandatory, refs to user model},
  description: {string},

  reviews: {number, default: 0, comment: Holds number of reviews of this book},
  deletedAt: {Date, when the document is deleted}, 
  isDeleted: {boolean, default: false},
  releasedAt: {Date, mandatory, format("YYYY-MM-DD")},
  createdAt: {timestamp},
  updatedAt: {timestamp},
}
```


## Response

### Successful Response structure
```yaml
{
  status: true,
  message: 'Success',
  data: {

  }
}
```
### Error Response structure
```yaml
{
  status: false,
  message: ""
}
```
