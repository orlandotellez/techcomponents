# Estructura feature-based + dominio

Tecnologías:
TypeScript
NextJs
Css

src/
│
├── app/
│   ├── globals.css
│
│   ├── (auth)/
│   │   ├── layout.tsx
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── register/
│   │       └── page.tsx
│   │
│   └── (shop)/
│       ├── layout.tsx
│       ├── products/
│       │   └── page.tsx
│       ├── cart/
│       │   └── page.tsx
│       ├── checkout/
│       │   └── page.tsx
│       └── orders/
│           └── page.tsx
│
├── features/
│   ├── auth/
│   ├── products/
│   ├── cart/
│   ├── checkout/
│   └── orders/
│
├── shared/
│   ├── components/
│   ├── hooks/
│   ├── utils/
│   └── types/
│
├── lib/
│   ├── http.ts
│   └── auth.ts
│
└── config/
    ├── env.ts
    └── routes.ts
