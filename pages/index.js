import Head from 'next/head';
import classes from '../styles/Home.module.scss';
import { Navbar } from '../components';
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className={classes.container}>
      <Head>
        <title>Beyond Looks</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={classes.main}>
        <motion.div
        className={classes.titleContainer}
        initial={{ opacity: 0, x: -400 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.5 }}
        >
          <h1 >
            Welcome Pyper Song
          </h1>
        </motion.div>

      </main>
    </div>
  )
}
