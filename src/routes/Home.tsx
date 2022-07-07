import {
  motion,
  AnimatePresence,
  useViewportScroll,
  useTransform,
} from "framer-motion";
import { useState } from "react";
import { useQuery } from "react-query";
import { useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Detail from "../components/Detail";
import { makeImagePath } from "../utils";
import {
  getNowMovies,
  getPopularMovies,
  getTopMovies,
  getUpcomingMovies,
  IGetMovies,
} from "./api";

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

const categories = {
  nowPlay: "nowPlay",
  upcoming: "upcoming",
  topRated: "topRated",
  popular: "popular",
};

const offset = 6;

function Home() {
  const navigation = useNavigate();
  const MovieDetailMatch = useMatch("/movies/:id");
  const { scrollY } = useViewportScroll();
  const setScrollY = useTransform(scrollY, (value) => value + 70);
  const { data: nowPlayMovie, isLoading: nowPlayIsLoading } =
    useQuery<IGetMovies>(["movies", categories.nowPlay], getNowMovies);
  const { data: topRatedMovie, isLoading: topRatedIsLoading } =
    useQuery<IGetMovies>(["movies", categories.topRated], getTopMovies);
  const { data: upcomingMovie, isLoading: upcomingIsLoading } =
    useQuery<IGetMovies>(["movies", categories.upcoming], getUpcomingMovies);
  const { data: popularMovie, isLoading: popularIsLoading } =
    useQuery<IGetMovies>(["movies", categories.popular], getPopularMovies);
  const [nowPlayIndex, setNowPlayIndex] = useState(0);
  const [topRatedIndex, setTopRatedIndex] = useState(0);
  const [upcomingIndex, setUpcomingIndex] = useState(0);
  const [popularIndex, setPopularIndex] = useState(0);
  const [rowName, setRowName] = useState("");
  const [leaving, setLeaving] = useState(false);
  const [direction, setDirection] = useState(false);
  const toggleLeaving = () => setLeaving((prev) => !prev);
  const incraseIndex = (catagory: string, data: any) => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = data.results.length;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      if (catagory === categories.nowPlay) {
        setNowPlayIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
      } else if (catagory === categories.topRated) {
        setTopRatedIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
      } else if (catagory === categories.upcoming) {
        setUpcomingIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
      } else if (catagory === categories.popular) {
        setPopularIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
      }
    }
  };
  const decreaseIndex = (catagory: string, data: any) => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = data.results.length;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      if (catagory === categories.nowPlay) {
        setNowPlayIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
      } else if (catagory === categories.topRated) {
        setTopRatedIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
      } else if (catagory === categories.upcoming) {
        setUpcomingIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
      } else if (catagory === categories.popular) {
        setPopularIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
      }
    }
  };
  const onBoxClicked = (category: string, movieId: number) => {
    navigation(`/movies/${movieId}`);
    setRowName(category);
    if (category === categories.nowPlay) {
      setRowName(categories.nowPlay);
    } else if (category === categories.topRated) {
      setRowName(categories.topRated);
    } else if (category === categories.upcoming) {
      setRowName(categories.upcoming);
    } else if (category === categories.popular) {
      setRowName(categories.popular);
    }
  };
  const onOverlayClick = () => {
    navigation("/home");
  };
  return (
    <Wrapper>
      {nowPlayIsLoading ||
      topRatedIsLoading ||
      upcomingIsLoading ||
      popularIsLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            bgphoto={makeImagePath(
              nowPlayMovie?.results[0].backdrop_path || ""
            )}
          >
            <Title>{nowPlayMovie?.results[0].title}</Title>
            <Overview>{`${nowPlayMovie?.results[0].overview.slice(
              0,
              192
            )}...`}</Overview>
          </Banner>
          <Slider>
            <SliderTitle>Now Playing</SliderTitle>
            <Arrow
              onClick={() => incraseIndex(categories.nowPlay, nowPlayMovie)}
              onMouseOver={() => setDirection(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512">
                <path d="M192 448c-8.188 0-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L77.25 256l137.4 137.4c12.5 12.5 12.5 32.75 0 45.25C208.4 444.9 200.2 448 192 448z" />
              </svg>
            </Arrow>
            <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
              <Row
                key={nowPlayIndex}
                variants={direction ? rightrowVariants : leftrowVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ type: "tween", duration: 1 }}
              >
                {nowPlayMovie?.results
                  .slice(1)
                  .slice(offset * nowPlayIndex, offset * nowPlayIndex + offset)
                  .map((movie) => (
                    <Box
                      layoutId={movie.id + categories.nowPlay}
                      key={movie.id}
                      variants={BoxVariants}
                      onClick={() => onBoxClicked(categories.nowPlay, movie.id)}
                      whileHover="hover"
                      initial="normal"
                      transition={{ type: "tween" }}
                      bgphoto={makeImagePath(movie.poster_path, "w500")}
                    >
                      <Info variants={InfoVariants} key={movie.id}>
                        <HoverImg
                          bgphoto={makeImagePath(movie.backdrop_path, "w500")}
                        />
                        <h4>{movie.title}</h4>
                        <Icon>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                          >
                            <path d="M96 32.04H32c-17.67 0-32 14.32-32 31.1v223.1c0 17.67 14.33 31.1 32 31.1h64c17.67 0 32-14.33 32-31.1V64.03C128 46.36 113.7 32.04 96 32.04zM467.3 240.2C475.1 231.7 480 220.4 480 207.9c0-23.47-16.87-42.92-39.14-47.09C445.3 153.6 448 145.1 448 135.1c0-21.32-14-39.18-33.25-45.43C415.5 87.12 416 83.61 416 79.98C416 53.47 394.5 32 368 32h-58.69c-34.61 0-68.28 11.22-95.97 31.98L179.2 89.57C167.1 98.63 160 112.9 160 127.1l.1074 160c0 0-.0234-.0234 0 0c.0703 13.99 6.123 27.94 17.91 37.36l16.3 13.03C276.2 403.9 239.4 480 302.5 480c30.96 0 49.47-24.52 49.47-48.11c0-15.15-11.76-58.12-34.52-96.02H464c26.52 0 48-21.47 48-47.98C512 262.5 492.2 241.9 467.3 240.2z" />
                          </svg>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                          >
                            <path d="M128 447.1V223.1c0-17.67-14.33-31.1-32-31.1H32c-17.67 0-32 14.33-32 31.1v223.1c0 17.67 14.33 31.1 32 31.1h64C113.7 479.1 128 465.6 128 447.1zM512 224.1c0-26.5-21.48-47.98-48-47.98h-146.5c22.77-37.91 34.52-80.88 34.52-96.02C352 56.52 333.5 32 302.5 32c-63.13 0-26.36 76.15-108.2 141.6L178 186.6C166.2 196.1 160.2 210 160.1 224c-.0234 .0234 0 0 0 0L160 384c0 15.1 7.113 29.33 19.2 38.39l34.14 25.59C241 468.8 274.7 480 309.3 480H368c26.52 0 48-21.47 48-47.98c0-3.635-.4805-7.143-1.246-10.55C434 415.2 448 397.4 448 376c0-9.148-2.697-17.61-7.139-24.88C463.1 347 480 327.5 480 304.1c0-12.5-4.893-23.78-12.72-32.32C492.2 270.1 512 249.5 512 224.1z" />
                          </svg>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                          >
                            <path d="M432 256c0 17.69-14.33 32.01-32 32.01H256v144c0 17.69-14.33 31.99-32 31.99s-32-14.3-32-31.99v-144H48c-17.67 0-32-14.32-32-32.01s14.33-31.99 32-31.99H192v-144c0-17.69 14.33-32.01 32-32.01s32 14.32 32 32.01v144h144C417.7 224 432 238.3 432 256z" />
                          </svg>
                        </Icon>
                        <div>개봉일 : {movie.release_date}</div>
                        <div>평점 : ⭐{movie.vote_average}</div>
                      </Info>
                    </Box>
                  ))}
              </Row>
            </AnimatePresence>
            <Arrow
              onClick={() => decreaseIndex(categories.nowPlay, nowPlayMovie)}
              onMouseOver={() => setDirection(true)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512">
                <path d="M64 448c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L178.8 256L41.38 118.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l160 160c12.5 12.5 12.5 32.75 0 45.25l-160 160C80.38 444.9 72.19 448 64 448z" />
              </svg>
            </Arrow>
          </Slider>
          <Slider style={{ marginTop: "100px" }}>
            <SliderTitle>Top Rated</SliderTitle>
            <Arrow
              onClick={() => incraseIndex(categories.topRated, topRatedMovie)}
              onMouseOver={() => setDirection(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512">
                <path d="M192 448c-8.188 0-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L77.25 256l137.4 137.4c12.5 12.5 12.5 32.75 0 45.25C208.4 444.9 200.2 448 192 448z" />
              </svg>
            </Arrow>
            <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
              <Row
                key={topRatedIndex}
                variants={direction ? rightrowVariants : leftrowVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ type: "tween", duration: 1 }}
              >
                {topRatedMovie?.results
                  .slice(1)
                  .slice(
                    offset * topRatedIndex,
                    offset * topRatedIndex + offset
                  )
                  .map((movie) => (
                    <Box
                      layoutId={movie.id + categories.topRated}
                      key={movie.id}
                      variants={BoxVariants}
                      onClick={() =>
                        onBoxClicked(categories.topRated, movie.id)
                      }
                      whileHover="hover"
                      initial="normal"
                      transition={{ type: "tween" }}
                      bgphoto={makeImagePath(movie.poster_path, "w500")}
                    >
                      <Info variants={InfoVariants} key={movie.id}>
                        <HoverImg
                          bgphoto={makeImagePath(movie.backdrop_path, "w500")}
                        />
                        <h4>{movie.title}</h4>
                        <Icon>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                          >
                            <path d="M96 32.04H32c-17.67 0-32 14.32-32 31.1v223.1c0 17.67 14.33 31.1 32 31.1h64c17.67 0 32-14.33 32-31.1V64.03C128 46.36 113.7 32.04 96 32.04zM467.3 240.2C475.1 231.7 480 220.4 480 207.9c0-23.47-16.87-42.92-39.14-47.09C445.3 153.6 448 145.1 448 135.1c0-21.32-14-39.18-33.25-45.43C415.5 87.12 416 83.61 416 79.98C416 53.47 394.5 32 368 32h-58.69c-34.61 0-68.28 11.22-95.97 31.98L179.2 89.57C167.1 98.63 160 112.9 160 127.1l.1074 160c0 0-.0234-.0234 0 0c.0703 13.99 6.123 27.94 17.91 37.36l16.3 13.03C276.2 403.9 239.4 480 302.5 480c30.96 0 49.47-24.52 49.47-48.11c0-15.15-11.76-58.12-34.52-96.02H464c26.52 0 48-21.47 48-47.98C512 262.5 492.2 241.9 467.3 240.2z" />
                          </svg>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                          >
                            <path d="M128 447.1V223.1c0-17.67-14.33-31.1-32-31.1H32c-17.67 0-32 14.33-32 31.1v223.1c0 17.67 14.33 31.1 32 31.1h64C113.7 479.1 128 465.6 128 447.1zM512 224.1c0-26.5-21.48-47.98-48-47.98h-146.5c22.77-37.91 34.52-80.88 34.52-96.02C352 56.52 333.5 32 302.5 32c-63.13 0-26.36 76.15-108.2 141.6L178 186.6C166.2 196.1 160.2 210 160.1 224c-.0234 .0234 0 0 0 0L160 384c0 15.1 7.113 29.33 19.2 38.39l34.14 25.59C241 468.8 274.7 480 309.3 480H368c26.52 0 48-21.47 48-47.98c0-3.635-.4805-7.143-1.246-10.55C434 415.2 448 397.4 448 376c0-9.148-2.697-17.61-7.139-24.88C463.1 347 480 327.5 480 304.1c0-12.5-4.893-23.78-12.72-32.32C492.2 270.1 512 249.5 512 224.1z" />
                          </svg>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                          >
                            <path d="M432 256c0 17.69-14.33 32.01-32 32.01H256v144c0 17.69-14.33 31.99-32 31.99s-32-14.3-32-31.99v-144H48c-17.67 0-32-14.32-32-32.01s14.33-31.99 32-31.99H192v-144c0-17.69 14.33-32.01 32-32.01s32 14.32 32 32.01v144h144C417.7 224 432 238.3 432 256z" />
                          </svg>
                        </Icon>
                        <div>개봉일 : {movie.release_date}</div>
                        <div>평점 : ⭐{movie.vote_average}</div>
                      </Info>
                    </Box>
                  ))}
              </Row>
            </AnimatePresence>
            <Arrow
              onClick={() => decreaseIndex(categories.topRated, topRatedMovie)}
              onMouseOver={() => setDirection(true)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512">
                <path d="M64 448c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L178.8 256L41.38 118.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l160 160c12.5 12.5 12.5 32.75 0 45.25l-160 160C80.38 444.9 72.19 448 64 448z" />
              </svg>
            </Arrow>
          </Slider>
          <Slider style={{ marginTop: "100px" }}>
            <SliderTitle>Upcoming</SliderTitle>
            <Arrow
              onClick={() => incraseIndex(categories.upcoming, upcomingMovie)}
              onMouseOver={() => setDirection(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512">
                <path d="M192 448c-8.188 0-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L77.25 256l137.4 137.4c12.5 12.5 12.5 32.75 0 45.25C208.4 444.9 200.2 448 192 448z" />
              </svg>
            </Arrow>
            <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
              <Row
                key={upcomingIndex}
                variants={direction ? rightrowVariants : leftrowVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ type: "tween", duration: 1 }}
              >
                {upcomingMovie?.results
                  .slice(1)
                  .slice(
                    offset * upcomingIndex,
                    offset * upcomingIndex + offset
                  )
                  .map((movie) => (
                    <Box
                      layoutId={movie.id + categories.upcoming}
                      key={movie.id}
                      variants={BoxVariants}
                      onClick={() =>
                        onBoxClicked(categories.upcoming, movie.id)
                      }
                      whileHover="hover"
                      initial="normal"
                      transition={{ type: "tween" }}
                      bgphoto={makeImagePath(movie.poster_path, "w500")}
                    >
                      <Info variants={InfoVariants} key={movie.id}>
                        <HoverImg
                          bgphoto={makeImagePath(movie.backdrop_path, "w500")}
                        />
                        <h4>{movie.title}</h4>
                        <Icon>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                          >
                            <path d="M96 32.04H32c-17.67 0-32 14.32-32 31.1v223.1c0 17.67 14.33 31.1 32 31.1h64c17.67 0 32-14.33 32-31.1V64.03C128 46.36 113.7 32.04 96 32.04zM467.3 240.2C475.1 231.7 480 220.4 480 207.9c0-23.47-16.87-42.92-39.14-47.09C445.3 153.6 448 145.1 448 135.1c0-21.32-14-39.18-33.25-45.43C415.5 87.12 416 83.61 416 79.98C416 53.47 394.5 32 368 32h-58.69c-34.61 0-68.28 11.22-95.97 31.98L179.2 89.57C167.1 98.63 160 112.9 160 127.1l.1074 160c0 0-.0234-.0234 0 0c.0703 13.99 6.123 27.94 17.91 37.36l16.3 13.03C276.2 403.9 239.4 480 302.5 480c30.96 0 49.47-24.52 49.47-48.11c0-15.15-11.76-58.12-34.52-96.02H464c26.52 0 48-21.47 48-47.98C512 262.5 492.2 241.9 467.3 240.2z" />
                          </svg>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                          >
                            <path d="M128 447.1V223.1c0-17.67-14.33-31.1-32-31.1H32c-17.67 0-32 14.33-32 31.1v223.1c0 17.67 14.33 31.1 32 31.1h64C113.7 479.1 128 465.6 128 447.1zM512 224.1c0-26.5-21.48-47.98-48-47.98h-146.5c22.77-37.91 34.52-80.88 34.52-96.02C352 56.52 333.5 32 302.5 32c-63.13 0-26.36 76.15-108.2 141.6L178 186.6C166.2 196.1 160.2 210 160.1 224c-.0234 .0234 0 0 0 0L160 384c0 15.1 7.113 29.33 19.2 38.39l34.14 25.59C241 468.8 274.7 480 309.3 480H368c26.52 0 48-21.47 48-47.98c0-3.635-.4805-7.143-1.246-10.55C434 415.2 448 397.4 448 376c0-9.148-2.697-17.61-7.139-24.88C463.1 347 480 327.5 480 304.1c0-12.5-4.893-23.78-12.72-32.32C492.2 270.1 512 249.5 512 224.1z" />
                          </svg>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                          >
                            <path d="M432 256c0 17.69-14.33 32.01-32 32.01H256v144c0 17.69-14.33 31.99-32 31.99s-32-14.3-32-31.99v-144H48c-17.67 0-32-14.32-32-32.01s14.33-31.99 32-31.99H192v-144c0-17.69 14.33-32.01 32-32.01s32 14.32 32 32.01v144h144C417.7 224 432 238.3 432 256z" />
                          </svg>
                        </Icon>
                        <div>개봉일 : {movie.release_date}</div>
                        <div>평점 : ⭐{movie.vote_average}</div>
                      </Info>
                    </Box>
                  ))}
              </Row>
            </AnimatePresence>
            <Arrow
              onClick={() => decreaseIndex(categories.upcoming, upcomingMovie)}
              onMouseOver={() => setDirection(true)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512">
                <path d="M64 448c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L178.8 256L41.38 118.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l160 160c12.5 12.5 12.5 32.75 0 45.25l-160 160C80.38 444.9 72.19 448 64 448z" />
              </svg>
            </Arrow>
          </Slider>
          <Slider style={{ marginTop: "100px" }}>
            <SliderTitle>Popular</SliderTitle>
            <Arrow
              onClick={() => incraseIndex(categories.popular, popularMovie)}
              onMouseOver={() => setDirection(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512">
                <path d="M192 448c-8.188 0-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L77.25 256l137.4 137.4c12.5 12.5 12.5 32.75 0 45.25C208.4 444.9 200.2 448 192 448z" />
              </svg>
            </Arrow>
            <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
              <Row
                key={popularIndex}
                variants={direction ? rightrowVariants : leftrowVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ type: "tween", duration: 1 }}
              >
                {popularMovie?.results
                  .slice(1)
                  .slice(offset * popularIndex, offset * popularIndex + offset)
                  .map((movie) => (
                    <Box
                      layoutId={movie.id + categories.popular}
                      key={movie.id}
                      variants={BoxVariants}
                      onClick={() => onBoxClicked(categories.popular, movie.id)}
                      whileHover="hover"
                      initial="normal"
                      transition={{ type: "tween" }}
                      bgphoto={makeImagePath(movie.poster_path, "w500")}
                    >
                      <Info variants={InfoVariants} key={movie.id}>
                        <HoverImg
                          bgphoto={makeImagePath(movie.backdrop_path, "w500")}
                        />
                        <h4>{movie.title}</h4>
                        <Icon>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                          >
                            <path d="M96 32.04H32c-17.67 0-32 14.32-32 31.1v223.1c0 17.67 14.33 31.1 32 31.1h64c17.67 0 32-14.33 32-31.1V64.03C128 46.36 113.7 32.04 96 32.04zM467.3 240.2C475.1 231.7 480 220.4 480 207.9c0-23.47-16.87-42.92-39.14-47.09C445.3 153.6 448 145.1 448 135.1c0-21.32-14-39.18-33.25-45.43C415.5 87.12 416 83.61 416 79.98C416 53.47 394.5 32 368 32h-58.69c-34.61 0-68.28 11.22-95.97 31.98L179.2 89.57C167.1 98.63 160 112.9 160 127.1l.1074 160c0 0-.0234-.0234 0 0c.0703 13.99 6.123 27.94 17.91 37.36l16.3 13.03C276.2 403.9 239.4 480 302.5 480c30.96 0 49.47-24.52 49.47-48.11c0-15.15-11.76-58.12-34.52-96.02H464c26.52 0 48-21.47 48-47.98C512 262.5 492.2 241.9 467.3 240.2z" />
                          </svg>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                          >
                            <path d="M128 447.1V223.1c0-17.67-14.33-31.1-32-31.1H32c-17.67 0-32 14.33-32 31.1v223.1c0 17.67 14.33 31.1 32 31.1h64C113.7 479.1 128 465.6 128 447.1zM512 224.1c0-26.5-21.48-47.98-48-47.98h-146.5c22.77-37.91 34.52-80.88 34.52-96.02C352 56.52 333.5 32 302.5 32c-63.13 0-26.36 76.15-108.2 141.6L178 186.6C166.2 196.1 160.2 210 160.1 224c-.0234 .0234 0 0 0 0L160 384c0 15.1 7.113 29.33 19.2 38.39l34.14 25.59C241 468.8 274.7 480 309.3 480H368c26.52 0 48-21.47 48-47.98c0-3.635-.4805-7.143-1.246-10.55C434 415.2 448 397.4 448 376c0-9.148-2.697-17.61-7.139-24.88C463.1 347 480 327.5 480 304.1c0-12.5-4.893-23.78-12.72-32.32C492.2 270.1 512 249.5 512 224.1z" />
                          </svg>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                          >
                            <path d="M432 256c0 17.69-14.33 32.01-32 32.01H256v144c0 17.69-14.33 31.99-32 31.99s-32-14.3-32-31.99v-144H48c-17.67 0-32-14.32-32-32.01s14.33-31.99 32-31.99H192v-144c0-17.69 14.33-32.01 32-32.01s32 14.32 32 32.01v144h144C417.7 224 432 238.3 432 256z" />
                          </svg>
                        </Icon>
                        <div>개봉일 : {movie.release_date}</div>
                        <div>평점 : ⭐{movie.vote_average}</div>
                      </Info>
                    </Box>
                  ))}
              </Row>
            </AnimatePresence>
            <Arrow
              onClick={() => decreaseIndex(categories.popular, popularMovie)}
              onMouseOver={() => setDirection(true)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512">
                <path d="M64 448c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L178.8 256L41.38 118.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l160 160c12.5 12.5 12.5 32.75 0 45.25l-160 160C80.38 444.9 72.19 448 64 448z" />
              </svg>
            </Arrow>
          </Slider>
          <AnimatePresence>
            {MovieDetailMatch ? (
              <>
                <Overlay
                  onClick={onOverlayClick}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 1 }}
                />
                <MovieDetail
                  layoutId={MovieDetailMatch.params.id + rowName}
                  style={{ top: setScrollY }}
                >
                  <Detail />
                </MovieDetail>
              </>
            ) : null}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}

export default Home;

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

const MovieDetail = styled(motion.div)`
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
