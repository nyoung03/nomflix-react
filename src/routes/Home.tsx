import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { makeImagePath } from "../utils";
import { getNowMovies, getPopularMovies, IGetNowMovies } from "./api";

const Wrapper = styled.div`
  background-color: black;
`;

const Loader = styled.div`
  height: 40vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{ bgphoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8)),
    url(${(props) => props.bgphoto});
  background-size: cover;
`;

const Title = styled.h2`
  font-size: 2.8em;
  width: 50%;
  margin-bottom: 20px;
`;

const Overview = styled.p`
  font-size: 1.2em;
  width: 40%;
`;

const Slider = styled.div`
  position: relative;
  top: -70px;
  display: flex;
  justify-content: space-between;
`;

const SliderTitle = styled.div`
  position: absolute;
  top: -50px;
  left: 80px;
  font-size: 30px;
`;

const Row = styled(motion.div)`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(6, 1fr);
  width: 90%;
  position: absolute;
  right: 0;
  left: 0;
  margin: 0 auto;
`;

const Box = styled(motion.div)<{ bgphoto: string }>`
  background-color: wheat;
  height: 300px;
  background-size: cover;
  background-position: center center;
  background-image: url(${(props) => props.bgphoto});
`;

const Arrow = styled(motion.div)`
  width: 50px;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  z-index: 9;

  &:last-child {
    justify-content: flex-start;
  }

  svg {
    height: 50px;
    fill: ${(props) => props.theme.white.darker};
  }
`;

const Info = styled(motion.div)`
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: absolute;

  h4 {
    text-align: center;
    font-size: 10px;
  }
`;

const HoverImg = styled(motion.svg)<{ bgphoto: string }>`
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
  width: 100%;
`;

const leftrowVariants = {
  hidden: {
    x: window.innerWidth,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -window.innerWidth,
  },
};

const rightrowVariants = {
  hidden: {
    x: -window.innerWidth + 10,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: window.innerWidth - 10,
  },
};

const BoxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.2,
    y: -20,
    transition: {
      delay: 0.3,
      type: "tween",
    },
  },
};

const InfoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.3,
      type: "tween",
    },
  },
};

const catagory = {
  nowPlay: "nowPlay",
  popular: "popular",
};

const offset = 6;

function Home() {
  const { data: nowPlay, isLoading: nowPlayIsLoading } =
    useQuery<IGetNowMovies>([catagory.nowPlay, "nowPlaying"], getNowMovies);
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [direction, setDirection] = useState(false);
  const toggleLeaving = () => setLeaving((prev) => !prev);
  const incraseIndex = () => {
    if (nowPlay) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = nowPlay.results.length;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  const decreaseIndex = () => {
    if (nowPlay) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = nowPlay.results.length;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
    }
  };
  return (
    <Wrapper>
      {nowPlayIsLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            bgphoto={makeImagePath(nowPlay?.results[0].backdrop_path || "")}
          >
            <Title>{nowPlay?.results[0].title}</Title>
            <Overview>{nowPlay?.results[0].overview}</Overview>
          </Banner>
          <Slider>
            <SliderTitle>Now Playing</SliderTitle>
            <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
              <Arrow
                onClick={incraseIndex}
                onMouseOver={() => setDirection(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512">
                  <path d="M192 448c-8.188 0-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L77.25 256l137.4 137.4c12.5 12.5 12.5 32.75 0 45.25C208.4 444.9 200.2 448 192 448z" />
                </svg>
              </Arrow>
              <Row
                key={index}
                variants={direction ? rightrowVariants : leftrowVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ type: "tween", duration: 1 }}
              >
                {nowPlay?.results
                  .slice(1)
                  .slice(offset * index, offset * index + offset)
                  .map((movie) => (
                    <Box
                      key={movie.id}
                      variants={BoxVariants}
                      whileHover="hover"
                      initial="normal"
                      transition={{ type: "tween" }}
                      bgphoto={makeImagePath(movie.poster_path, "w500")}
                    >
                      <Info variants={InfoVariants}>
                        <HoverImg
                          bgphoto={makeImagePath(movie.backdrop_path, "w500")}
                        />
                        <h4>{movie.title}</h4>
                      </Info>
                    </Box>
                  ))}
              </Row>
              <Arrow
                onClick={decreaseIndex}
                onMouseOver={() => setDirection(true)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512">
                  <path d="M64 448c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L178.8 256L41.38 118.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l160 160c12.5 12.5 12.5 32.75 0 45.25l-160 160C80.38 444.9 72.19 448 64 448z" />
                </svg>
              </Arrow>
            </AnimatePresence>
          </Slider>
        </>
      )}
    </Wrapper>
  );
}

export default Home;
