'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/features/cart/context/CartContext';
import { CreditCard, CheckCircle } from 'lucide-react';
import styles from './page.module.css';

export default function CheckoutPage() {
  const { items, subtotal, tax, total, clearCart } = useCart();
  const router = useRouter();

  const [step, setStep] = useState<'form' | 'success'>('form');
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (items.length === 0 && step !== 'success') {
      router.push('/cart');
    }
  }, [items, step, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);

    setTimeout(() => {
      setProcessing(false);
      setStep('success');
      clearCart();
    }, 2000);
  };

  if (step === 'success') {
    return (
      <div className={styles.successContainer}>
        <CheckCircle size={64} className={styles.successIcon} />

        <h1 className={styles.successTitle}>¡Pedido Confirmado!</h1>

        <p className={styles.successText}>
          Tu pedido ha sido procesado exitosamente.
        </p>

        <p className={styles.orderId}>
          Número de pedido:{' '}
          <strong>
            ORD-{String(Math.floor(Math.random() * 9000) + 1000)}
          </strong>
        </p>

        <p className={styles.note}>
          Nota: Este es un pago simulado. No se han realizado cargos reales.
        </p>

        <button
          onClick={() => router.push('/')}
          className={styles.primaryButton}
        >
          Volver a la Tienda
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Checkout</h1>

      <form onSubmit={handleSubmit} className={styles.grid}>
        {/* LEFT */}
        <div className={styles.left}>
          {/* Shipping */}
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Información de Envío</h3>

            <div className={styles.formGrid}>
              <input required placeholder="Nombre" className={styles.input} />
              <input required placeholder="Apellido" className={styles.input} />

              <input
                required
                placeholder="Email"
                type="email"
                className={`${styles.input} ${styles.full}`}
              />

              <input
                required
                placeholder="Dirección"
                className={`${styles.input} ${styles.full}`}
              />

              <input required placeholder="Ciudad" className={styles.input} />
              <input required placeholder="Código Postal" className={styles.input} />
            </div>
          </div>

          {/* Payment */}
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>
              <CreditCard size={18} /> Información de Pago
            </h3>

            <p className={styles.paymentNote}>
              Simulación de pago — no se realizarán cargos reales
            </p>

            <div className={styles.formGrid}>
              <input
                required
                placeholder="Número de tarjeta"
                defaultValue="4242 4242 4242 4242"
                className={`${styles.input} ${styles.full}`}
              />

              <input
                required
                placeholder="MM/AA"
                defaultValue="12/28"
                className={styles.input}
              />

              <input
                required
                placeholder="CVV"
                defaultValue="123"
                className={styles.input}
              />
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className={styles.right}>
          <div className={styles.summary}>
            <h3 className={styles.summaryTitle}>Tu Pedido</h3>

            <div className={styles.summaryItems}>
              {items.map(({ product, quantity }) => (
                <div key={product.id} className={styles.summaryItem}>
                  <span className={styles.productName}>
                    {product.name} x{quantity}
                  </span>
                  <span>
                    ${(product.price * quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className={styles.totals}>
              <div className={styles.row}>
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              <div className={styles.row}>
                <span>IVA (16%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>

              <div className={styles.totalRow}>
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={processing}
              className={styles.primaryButton}
            >
              {processing ? 'Procesando...' : `Pagar $${total.toFixed(2)}`}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

