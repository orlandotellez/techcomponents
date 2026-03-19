import { SlidersHorizontal, X } from "lucide-react"
import styles from "./TopBar.module.css"
import { Category, Product } from "@/shared/types"

interface TopBarProps {
  products: Product[]
  categories: Category[]
  categorySlug: string | null
  showFilters: boolean
  activeCategory: Category | undefined
  filtered: Product[]
  sortBy: string
  setSortBy: (e: React.ChangeEvent<HTMLSelectElement>) => void
  setShowFilters: (showFilters: boolean) => void
  updateCategory: (categorySlug?: string) => void

}

export const TopBar = ({
  products,
  categories,
  categorySlug,
  showFilters,
  setShowFilters,
  activeCategory,
  filtered,
  sortBy,
  setSortBy,
  updateCategory
}: TopBarProps) => {
  return (
    <>
      <div className={styles.topbar}>
        <div className={styles.title}>
          <h1 className={styles.heading}>
            {activeCategory?.name || 'Todos los Productos'}
          </h1>

          <span className={styles.count}>
            ({filtered.length} productos)
          </span>
        </div>

        <div className={styles.filters}>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={styles.mobileBtn}
          >
            <SlidersHorizontal size={14} /> Filtros
          </button>
          <select
            value={sortBy}
            onChange={setSortBy}
            className={styles.select}
          >
            <option value="featured">Destacados</option>
            <option value="price-asc">Precio: Menor a Mayor</option>
            <option value="price-desc">Precio: Mayor a Menor</option>
            <option value="rating">Mejor Valorados</option>
            <option value="name">Nombre A-Z</option>
          </select>
        </div>
      </div>

      {/* Mobile filters */}
      {showFilters && (
        <div className={styles.mobileFilters}>
          <div className={styles.mobileHeader}>
            <h3>Filtros</h3>
            <button onClick={() => setShowFilters(false)}>
              <X size={16} />
            </button>
          </div>

          <div className={styles.mobileCategories}>
            <button
              onClick={
                () => {
                  updateCategory()
                  setShowFilters(false)
                }
              }
              className={
                !categorySlug
                  ? styles.mobileActive
                  : styles.mobileInactive
              }
            >
              Todos ({products.length})
            </button>

            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  updateCategory(cat.slug);
                  setShowFilters(false);
                }}
                className={
                  categorySlug === cat.slug
                    ? styles.mobileActive
                    : styles.mobileInactive
                }
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div >
      )}
    </>
  )
}
