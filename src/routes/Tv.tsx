import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { makeImagePath } from "../utils";
import { getOnAirTv, IGetTvs } from "./api";

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
    x: -window.innerWidth,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: window.innerWidth,
  },
};

const categories = {
  onAir: "onAir",
};

const offset = 6;

function Tv() {
  const { data: onAirTv, isLoading: onAirIsLoading } = useQuery<IGetTvs>(
    ["tvs", categories.onAir],
    getOnAirTv
  );
  const [direction, setDirection] = useState(false);
  const [onAirIndex, setOnAirIndex] = useState(0);
  const incraseIndex = () => {
    if (onAirTv) {
      const totalTvs = onAirTv?.results.length;
      const maxIndex = Math.floor(totalTvs / offset) - 1;
      setOnAirIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  const decreaseIndex = () => {
    if (onAirTv) {
      const totalTvs = onAirTv.results.length;
      const maxIndex = Math.floor(totalTvs / offset) - 1;
      setOnAirIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
    }
  };
  return (
    <Wrapper>
      {onAirIsLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            bgphoto={makeImagePath(onAirTv?.results[0].backdrop_path || "")}
          >
            <Title>{onAirTv?.results[0].name}</Title>
            <Overview>{onAirTv?.results[0].overview}</Overview>
          </Banner>
          <Slider>
            <SliderTitle>On the air</SliderTitle>
            <Arrow
              onClick={incraseIndex}
              onMouseOver={() => setDirection(true)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512">
                <path d="M192 448c-8.188 0-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L77.25 256l137.4 137.4c12.5 12.5 12.5 32.75 0 45.25C208.4 444.9 200.2 448 192 448z" />
              </svg>
            </Arrow>
            <AnimatePresence initial={false}>
              <Row
                key={onAirIndex}
                variants={direction ? leftrowVariants : rightrowVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ type: "tween" }}
              >
                {onAirTv?.results
                  .slice(1)
                  .slice(offset * onAirIndex, offset * onAirIndex + offset)
                  .map((tv) => (
                    <Box
                      key={tv.id}
                      bgphoto={makeImagePath(tv.poster_path, "w500")}
                    />
                  ))}
              </Row>
            </AnimatePresence>
            <Arrow
              onClick={decreaseIndex}
              onMouseOver={() => setDirection(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512">
                <path d="M64 448c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L178.8 256L41.38 118.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l160 160c12.5 12.5 12.5 32.75 0 45.25l-160 160C80.38 444.9 72.19 448 64 448z" />
              </svg>
            </Arrow>
          </Slider>
        </>
      )}
    </Wrapper>
  );
}

export default Tv;

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
  font-size: 2.7em;
  width: 50%;
  margin-bottom: 20px;
`;

const Overview = styled.p`
  font-size: 1em;
  width: 40%;
  line-height: 1.3;
`;

const Slider = styled.div`
  position: relative;
  top: -70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SliderTitle = styled.div`
  position: absolute;
  top: -50px;
  left: 80px;
  font-size: 30px;
  font-weight: bold;
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
  color: red;
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
  width: 100%;

  h4 {
    text-align: center;
    font-size: 15px;
    margin: 10px 0;
    padding: 0 10px;
  }

  div {
    font-size: 10px;
    text-align: center;
    margin: 10px;
  }
`;

const Icon = styled(motion.div)`
  display: flex;
  justify-content: space-evenly;
  padding: 15px 0 5px 15px;
  cursor: pointer;

  svg {
    height: 35px;
    fill: ${(props) => props.theme.white.darker};
  }
`;

const HoverImg = styled(motion.svg)<{ bgphoto: string }>`
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
  width: 100%;
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const TvDetail = styled(motion.div)`
  position: absolute;
  width: 40vw;
  height: 80vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
  background-color: ${(props) => props.theme.black.lighter};
`;
