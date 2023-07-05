# BRETARO

[![Quality gate](https://sonarcloud.io/api/project_badges/quality_gate?project=isdi-coders-2023_Camino-Losada-Final-Project-back-202304-bcn)](https://sonarcloud.io/summary/new_code?id=isdi-coders-2023_Camino-Losada-Final-Project-back-202304-bcn)

[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=isdi-coders-2023_Camino-Losada-Final-Project-back-202304-bcn&metric=coverage)](https://sonarcloud.io/summary/new_code?id=isdi-coders-2023_Camino-Losada-Final-Project-back-202304-bcn)
[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=isdi-coders-2023_Camino-Losada-Final-Project-back-202304-bcn&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=isdi-coders-2023_Camino-Losada-Final-Project-back-202304-bcn)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=isdi-coders-2023_Camino-Losada-Final-Project-back-202304-bcn&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=isdi-coders-2023_Camino-Losada-Final-Project-back-202304-bcn)

[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=isdi-coders-2023_Camino-Losada-Final-Project-back-202304-bcn&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=isdi-coders-2023_Camino-Losada-Final-Project-back-202304-bcn)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=isdi-coders-2023_Camino-Losada-Final-Project-back-202304-bcn&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=isdi-coders-2023_Camino-Losada-Final-Project-back-202304-bcn)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=isdi-coders-2023_Camino-Losada-Final-Project-back-202304-bcn&metric=bugs)](https://sonarcloud.io/summary/new_code?id=isdi-coders-2023_Camino-Losada-Final-Project-back-202304-bcn)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=isdi-coders-2023_Camino-Losada-Final-Project-back-202304-bcn&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=isdi-coders-2023_Camino-Losada-Final-Project-back-202304-bcn)

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
