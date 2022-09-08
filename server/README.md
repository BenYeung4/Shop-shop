- adds the checkout function and payments

- install in server

npm install stripe

- add the following to schemas/typeDef

type Checkout {
session: ID
}

- add the following to typeQuery

checkout(products: [ID]!): Checkout
