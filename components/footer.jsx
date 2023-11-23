import Form from "./form"

import styles from '@/styles/Footer.module.css'


const Footer =() => {
return ( 
<footer>
    <div className={styles.description}>
            <h3 className={styles.title}>Lets work together</h3>
                <p className={styles.paragraph}>Lorem ipsum dolor sit amet consectetur
                adipisicing elit.
                Veritatis ad alias quos fuga neque numquam illo,
                iure ullam ipsam dolorum nisi odio dicta id.
                Magnam quasi aliquam est minima nulla.</p>
    <div className={styles.social}>
    <a href='#'>Facebook</a> 
    <a href='#'>Instagram</a>
    <a href='#'>Tiktok</a>
</div>
</div>
<Form />
</footer>
)
}
export default Footer