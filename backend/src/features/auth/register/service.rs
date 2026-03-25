use chrono::Utc;
use uuid::Uuid;

use crate::{
    features::auth::register::request::RegisterRequest,
    shared::{
        errors::AppError, helpers::password::hash_password, models::user_model::User,
        state::DbState,
    },
};

pub struct RegisterService;

impl RegisterService {
    pub async fn register_user(db: &DbState, payload: RegisterRequest) -> Result<User, AppError> {
        let hashed_password: String = hash_password(&payload.password)?;

        let user: User = sqlx::query_as!(
            User,
            r#"
                INSERT INTO users (
                    id,
                    name,
                    email,
                    email_verified,
                    image,
                    created_at,
                    updated_at
                )
                VALUES ($1, $2, $3, $4, $5, $6, $7)
                RETURNING 
                    id,
                    name,
                    email,
                    email_verified,
                    image,
                    created_at,
                    updated_at
            "#,
            Uuid::new_v4(),
            payload.name,
            payload.email,
            false,
            Option::<String>::None,
            Utc::now(),
            Utc::now()
        )
        .fetch_one(db)
        .await?;

        Ok(user)
    }
}
