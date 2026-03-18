# Vertical Slice Architecture

Tegnologías: 
Rust
Axum
SQLx
PostgreSQL
JWT auth


src/
│
├── features/
│
│   ├── auth/
│   │   ├── login/
│   │   │   ├── handler.rs
│   │   │   ├── request.rs
│   │   │   ├── response.rs
│   │   │   └── service.rs
│   │   │
│   │   └── register/
│   │       ├── handler.rs
│   │       ├── request.rs
│   │       ├── response.rs
│   │       └── service.rs
│
│   ├── products/
│   │   ├── get_products/
│   │   │   ├── handler.rs
│   │   │   ├── query.rs
│   │   │   └── response.rs
│   │   │
│   │   ├── get_product/
│   │   │   ├── handler.rs
│   │   │   ├── query.rs
│   │   │   └── response.rs
│   │   │
│   │   └── create_product/
│   │       ├── handler.rs
│   │       ├── command.rs
│   │       └── service.rs
│
│   ├── cart/
│   │   ├── add_to_cart/
│   │   ├── remove_from_cart/
│   │   └── get_cart/
│
│   └── orders/
│       ├── create_order/
│       └── get_orders/
│
├── database/
├── shared/
└── main.rs
