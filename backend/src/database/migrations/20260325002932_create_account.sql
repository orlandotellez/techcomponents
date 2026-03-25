CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE account (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), 
  account_id TEXT NOT NULL, 
  provider_id TEXT NOT NULL, 
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE, 
  access_token TEXT, 
  refresh_token TEXT, 
  id_token TEXT, 
  access_token_expires_at TIMESTAMPTZ, 
  refresh_token_expires_at TIMESTAMPTZ, 
  scope TEXT, 
  password TEXT, 
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL, 
  updated_at TIMESTAMPTZ NOT NULL
);
