import Hero from "../home/Hero"
import Trending from "../home/Trending"
import Devotional from "../home/Devotional"
import Creator from "../home/Creator"
import Technology from "../home/Technology"
export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Home = () => {
  console.log("Backend" , BACKEND_URL);
  return(
    <>
    <div>
      <Hero/>
      <Trending/>
      <Technology />
      <Devotional/>
      <Creator/>
    </div>
    </>
  )
}

export default Home
