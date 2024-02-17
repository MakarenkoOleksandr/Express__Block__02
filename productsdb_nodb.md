## EXERCISE / Products DB

Create a Products DB that stores our products and divides them by categories. In this exercise you will keep all the products/categories in the array declared in your main server file (index.js). So this array will act as a "database".

You should be able to create a CRUD (Create, Read, Update, Delete) app for adding categories as well as products.

All products should have at least name, price, color and description, they should be editable.

All the data must be passed through the body using postman instead of params through the url. It is up to you how you will structure the body of the requests.

# API:

| Method | URL                  | Action                                     |
| ------ | -------------------- | ------------------------------------------ |
| POST   | /category/add        | Add a new category                         |
| POST   | /category/delete     | Remove category                            |
| POST   | /category/update     | Update category                            |
| GET    | /category/categories | Display all categories                     |
| GET    | /category/products   | display all categories with all products   |
| GET    | /category/:category  | display one category with all its products |
| POST   | /product/add         | Add product                                |
| POST   | /product/delete      | Delete product                             |
| POST   | /product/update      | Update name, price, color or description   |

# Example of usage:

> POST http://localhost:4040/category/add
> Request's body object: { category: 'hats' }
> Response: { ok: true, data: 'Category hats added successfully' }

> POST http://localhost:4040/category/add
> Request's body object: { category: 'hats' }
> Response: { ok: true, data: 'Category hats already exists' }

> POST http://localhost:4040/category/add
> Request's body object: { category: "jackets" }
> Response: { ok: true, data: 'Category jackets added successfully' }

> GET http://localhost:4040/category/categories
> Response: { ok: true, data: 'vests, jackets' }

> POST http://localhost:4040/product/add
> Request's body object: { category: "hats", product: { name: "cowboy hat", price: "10", color: "black", description: "best hat in town" } }
> Response: { ok: true, data: 'product cowboy hat added successfully' }

> GET http://localhost:4040/category/hats
> Response: { ok: true, data: [ { name: 'cowboy hat', price: '10', color: 'black', description: 'best hat in town' } ] }

> GET http://localhost:4040/category/products
> Response: { ok: true, data: [ { category: 'hats', products: [Array] }, { category: 'jackets', products: [] } ] }

> POST http://localhost:4040/product/update
> Request's body object: { category: "hats", old_product: { name: "cowboy hat" }, new_product: { name: "astronaut hat" } }
> Response: { ok: true, data: 'product astronaut hat updated successfully' }

> POST http://localhost:4040/product/delete
> Request's body object: { category: "hats", product: { name: "astronaut hat" } }
> Response: { ok: true, data: 'product astronaut hat deleted successfully' }

> POST http://localhost:4040/category/update
> Request's body object: { new_category: "vests", old_category: "hats" }
> Response: { ok: true, data: 'Category vests updated successfully' }

> POST http://localhost:4040/category/delete
> Request's body object: { category: "vests" }
> Response: { ok: true, data: 'Category vests deleted successfully' }

> POST http://localhost:4040/category/delete
> Request's body object: { category: "jackets" }
> Response: { ok: true, data: 'Category jackets deleted successfully' }

> POST http://localhost:4040/category/delete
> Request's body object: { category: "hats" }
> Response: { ok: true, data: 'Category hats doesn't exist' }

# DB STRUCTURE:

`This is just an example, you should declare an empty DB`

```
const DB = [
  {
    category: 't-shirts',
    products: [
      {
        name: 'blue t-shirt',
        price: 20,
        color: 'blue',
        description: 'good product'
      },
      {
        name: 'red t-shirt',
        price: 25,
        color: 'red',
        description: 'good product'
      },
      {
        name: 'yellow t-shirt',
        price: 22,
        color: 'yellow',
        description: 'good product'
      }
    ]
  },
  {
    category: 'shoes',
    products: [
      {
        name: 'black shoes',
        price: 120,
        color: 'black',
        description: 'good product'
      },
      {
        name: 'brown shoes',
        price: 95,
        color: 'brown',
        description: 'good product'
      }
    ]
  }
]
```

**_Your solution goes to the current folder_**
