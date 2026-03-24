use axum::{Router, routing::get};

pub fn routes() -> Router {
    Router::new()
        .route("/login", get(|| async { "login" }))
        .route("/register", get(|| async { "Register" }))
}
