use axum::Router;

use crate::features;

pub fn create_routes() -> Router {
    Router::new().nest("/api/v1/auth", features::auth::routes::routes())
}
