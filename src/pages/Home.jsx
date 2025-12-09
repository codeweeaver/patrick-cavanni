import AnimatedPage from "../components/AnimatedPage";
import Assurance from "../components/Home/Assurance";
import HauteCouture from "../components/Home/HauteCouture";

import Hero from "../components/Home/Hero";
import Intro from "../components/Home/Intro";
import JustForYou from "../components/Home/JustForYou";
import NewArrival from "../components/Home/NewArrival";
import Support from "../components/Home/SupportingBrands";

const Home = () => {
  return (
    <AnimatedPage>
      <Hero />
      <NewArrival />
      <HauteCouture />
      <Intro />
      <Support />
      <JustForYou />
      <Assurance />
    </AnimatedPage>
  );
};

export default Home;
