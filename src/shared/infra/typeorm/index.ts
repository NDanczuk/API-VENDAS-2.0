import { DataSource } from "typeorm";

import User from "@modules/users/infra/typeorm/entities/User";
import UserToken from "@modules/users/infra/typeorm/entities/UserToken";
import Customer from "@modules/customers/infra/typeorm/entities/Customer";
import Order from "@modules/orders/infra/typeorm/entities/Orders";
import OrdersProducts from "@modules/orders/infra/typeorm/entities/OrdersProducts";
import Product from "@modules/products/infra/typeorm/entities/Product";

import { CreateProducts1607437608841 } from "./migrations/1721913857024-CreateProducts";
import { CreateUsers1721914860829 } from "./migrations/1721914860829-CreateUsers";
import { CreateUserTokens1721940720185 } from "./migrations/1721940720185-CreateUserTokens";
import { CreateCustomers1722022404658 } from "./migrations/1722022404658-CreateCustomers";
import { CreateOrders1722254305185 } from "./migrations/1722254305185-CreateOrders";
import { AddCustomerIdToOrders1722254630145 } from "./migrations/1722254630145-AddCustomerIdToOrders";
import { CreateOrdersProducts1722255295002 } from "./migrations/1722255295002-CreateOrdersProducts";
import { AddOrderIdToOrderProducts1722257147624 } from "./migrations/1722257147624-AddOrderIdToOrderProducts";
import { AddProductIdToOrdersProducts1722257542045 } from "./migrations/1722257542045-AddProductIdToOrdersProducts";

export const dataSource = new DataSource({
  type: "postgres",
  host: "db",
  port: 5432,
  username: "postgres",
  password: "docker",
  database: "apivendas",
  entities: [User, UserToken, Customer, Order, OrdersProducts, Product],
  migrations: [
    CreateProducts1607437608841,
    CreateUsers1721914860829,
    CreateUserTokens1721940720185,
    CreateCustomers1722022404658,
    CreateOrders1722254305185,
    AddCustomerIdToOrders1722254630145,
    CreateOrdersProducts1722255295002,
    AddOrderIdToOrderProducts1722257147624,
    AddProductIdToOrdersProducts1722257542045,
  ],
});
