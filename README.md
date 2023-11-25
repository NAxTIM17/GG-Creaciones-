# GG-Creaciones

## API Requests

| Method     | Endpoint                         | Response.Data or Request.Body                                                                       |
|:----------:|:---------------------------------|:----------------------------------------------------------------------------------------------------|
| **GET**    | /api/sales/                      | data: { found: boolean, message?: string, sales?: { id, income, cost, description, created_at }[] } |
| **GET**    | /api/sales/:id/                  | data: { found: boolean, message?: string, sale: { id, income, cost, description, created_at } }     |
| **POST**   | /api/sales/                      | body: { income: number, cost: number, description: string }                                         |
| **PATCH**  | /api/sales/:id/                  | body: { income?: number, cost?: number, description?: string }                                      |
| **DELETE** | /api/sales/:id/                  |                                                                                                     |
| **GET**    | /api/stats/year/                 | data: { found: boolean, message?: string, stats?: { Income, Cost, Sales, Year }[] }                 |
| **GET**    | /api/stats/month/                | data: { found: boolean, message?: string, stats?: { Income, Cost, Sales, Month, Year, Period }[] }  |
| **GET**    | /api/stats/day/                  | data: { found: boolean, message?: string, stats?: { Income, Cost, Sales, Day }[] }                  |

### [Frontend README](/frontend/README.md)

### [Backend README](/backend/README.md)

