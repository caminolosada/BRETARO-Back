# BRETARO

## Endpoints

### GET /

- Check the server response through the pingController
- Send the message "🏓 Pong" in the response body and status 200

### GET / (wrong endpoint)

- Request to a wrong endpoint
- Send the message "Endopoint not found" in the response body and status 404

### GET / books

- Request for a list of 10 books
- Send a collection of 10 books in the response body and status 200

### DELETE / books / delete / :id

- Request to delete a book by its id
- Send the message "The book has been deleted" in the response body and status 200

### DELETE / books / delete / (id of a book already deleted or id not founded)

- Request to delete a book already deleted or case in which the book id could not be found
- Send the message "Can't delete this book because it doesn't exist" in the response body and status 404
