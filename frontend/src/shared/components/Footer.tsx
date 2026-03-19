import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Brand */}
        <div>
          <h3 className={styles.logo}>TECHCOMPONENTS</h3>
          <p className={styles.text}>
            Tu tienda de hardware y tecnología de confianza.
            Los mejores componentes al mejor precio.
          </p>
        </div>

        {/* Categories */}
        <div>
          <h4 className={styles.title}>Categorías</h4>
          <ul className={styles.list}>
            <li>
              <Link href="/shop?categoria=procesadores">
                Procesadores
              </Link>
            </li>
            <li>
              <Link href="/shop?categoria=tarjetas-graficas">
                Tarjetas Gráficas
              </Link>
            </li>
            <li>
              <Link href="/shop?categoria=memoria-ram">
                Memoria RAM
              </Link>
            </li>
            <li>
              <Link href="/shop?categoria=almacenamiento">
                Almacenamiento
              </Link>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className={styles.title}>Soporte</h4>
          <ul className={styles.list}>
            <li>Contacto</li>
            <li>Garantías</li>
            <li>Envíos</li>
            <li>Devoluciones</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className={styles.title}>Contacto</h4>
          <ul className={styles.list}>
            <li>orlandogabrieltellez@gmail.c.com</li>
            <li>+52 55 1234 5678</li>
            <li>Lun - Vie: 9am - 7pm</li>
          </ul>
        </div>

      </div>

      {/* Bottom */}
      <div className={styles.bottom}>
        <p>
          © 2026 TechForge. Todos los derechos reservados.
          Simulación de e-commerce.
        </p>
      </div>
    </footer>
  );
};
