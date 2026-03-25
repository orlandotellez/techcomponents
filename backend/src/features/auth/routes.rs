use axum::{Router, routing::get};

use crate::shared::state::DbState;

pub fn routes() -> Router<DbState> {
    Router::new()
        .route("/login", get(|| async { "login" }))
        .route("/register", get(|| async { "Register" }))
}
