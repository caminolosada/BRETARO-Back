# BRETARO

[![Quality gate](https://sonarcloud.io/api/project_badges/quality_gate?project=caminolosada_BRETARO-Back)](https://sonarcloud.io/summary/new_code?id=caminolosada_BRETARO-Back)

[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=caminolosada_BRETARO-Back&metric=coverage)](https://sonarcloud.io/summary/new_code?id=caminolosada_BRETARO-Back)
[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=caminolosada_BRETARO-Back&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=caminolosada_BRETARO-Back)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=caminolosada_BRETARO-Back&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=caminolosada_BRETARO-Back)

[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=caminolosada_BRETARO-Back&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=caminolosada_BRETARO-Back)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=caminolosada_BRETARO-Back&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=caminolosada_BRETARO-Back)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=caminolosada_BRETARO-Back&metric=bugs)](https://sonarcloud.io/summary/new_code?id=caminolosada_BRETARO-Back)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=caminolosada_BRETARO-Back&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=caminolosada_BRETARO-Back)

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

### POST / books /

- Request to update a selected book (by its id)
- Send the message "The book has been succesfully updated", the updated information of the book in the response body and status 200.

### POST / books / (wrong id or id not founded)

- Request to update a book which id can't be found
- Send the message "Can't update this book" in the response body and status 400.
