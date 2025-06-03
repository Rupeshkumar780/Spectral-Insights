import Hero from "../home/Hero"
import Trending from "../home/Trending"
import Devotional from "../home/Devotional"
import Creator from "../home/Creator"
import Technology from "../home/Technology"

const Home = () => {
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
