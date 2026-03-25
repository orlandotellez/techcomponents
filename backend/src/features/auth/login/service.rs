use crate::{
    features::auth::login::{
        request::LoginRequest,
        response::{LoginResponse, UserResponse},
    },
    shared::{
        errors::AppError,
        helpers::{jwt::encode_jwt, password::verify_password},
        state::DbState,
    },
};

use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Clone)]
pub struct Claim {
    pub sub: String, // email del usuario
    pub exp: usize,
    pub iat: usize,
}

pub struct LoginService;

impl LoginService {
    pub async fn login_user(
        db: &DbState,
        payload: LoginRequest,
    ) -> Result<LoginResponse, AppError> {
        let account = sqlx::query!(
            r#"
            SELECT user_id, password
            FROM account
            WHERE account_id = $1
            AND provider_id = 'credentials'
            "#,
            payload.email
        )
        .fetch_optional(db)
        .await?;

        let account = match account {
            Some(acc) => acc,
            None => return Err(AppError::Unauthorized("Invalid email or password".into())),
        };

        let is_valid =
            verify_password(&payload.password, account.password.as_deref().unwrap_or(""))?;

        if !is_valid {
            return Err(AppError::Unauthorized("Invalid email or password".into()));
        }

        let user = sqlx::query!(
            r#"
            SELECT id, name, email, created_at
            FROM users
            WHERE id = $1
            "#,
            account.user_id
        )
        .fetch_one(db)
        .await?;

        let token: String = encode_jwt(user.email.clone())?;

        let response: LoginResponse = LoginResponse {
            access_token: token,
            user: UserResponse {
                id: user.id,
                name: user.name,
                email: user.email,
                created_at: user.created_at,
            },
        };

        Ok(response)
    }
}
