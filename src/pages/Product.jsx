import PageNav from '../components/PageNav'
import styles from './Product.module.css'

export default function Product() {
  return (
    <main className={styles.product}>
      <PageNav />
      <section>
        <img
          src="img-1.jpg"
          alt="person with dog overlooking mountain with sunset"
        />
        <div>
          <h2>About WorldTourer.</h2>
          <p>
            Welcome to World Tourer, your go-to platform for tracking and
            sharing your travel adventures! We believe that every trip is a
            story waiting to be told, and our tools empower you to document your
            journeys and pin your favorite destinations on an interactive map.
          </p>
          <p>
            Join our vibrant community of travelers and inspire others with your
            experiences. Whether you’re planning your next getaway or
            reminiscing about past trips, World Tourer is here to help you
            navigate the world, one adventure at a time. Happy exploring!
          </p>
        </div>
      </section>
    </main>
  )
}
