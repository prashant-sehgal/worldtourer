// Uses the same styles as Product
import PageNav from '../components/PageNav'
import styles from './Product.module.css'

export default function Product() {
  return (
    <main className={styles.product}>
      <PageNav />
      <section>
        <div>
          <h2>
            Simple pricing.
            <br />
            Just $9/month.
          </h2>
          <p>
            Pricing Unlock the full potential of your travel adventures for just
            $9! With our premium plan, you’ll gain access to exclusive features
            that enhance your experience, including advanced trip tracking,
            personalized maps, and the ability to share your journeys with
            fellow explorers. Start your journey with World Tourer today and
            make every trip unforgettable!
          </p>
        </div>
        <img src="img-2.jpg" alt="overview of a large city with skyscrapers" />
      </section>
    </main>
  )
}
