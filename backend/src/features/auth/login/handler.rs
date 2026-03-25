use axum::{Json, extract::State};

use crate::{
    features::auth::login::{
        request::LoginRequest, response::LoginResponse, service::LoginService,
    },
    shared::{errors::AppError, state::DbState},
};

pub async fn login_user(
    State(db): State<DbState>,
    Json(payload): Json<LoginRequest>,
) -> Result<Json<LoginResponse>, AppError> {
    let user: LoginResponse = LoginService::login_user(&db, payload).await?;

    Ok(Json(user))
}
