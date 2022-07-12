import {
  AnimatePresence,
  motion,
  useTransform,
  useViewportScroll,
} from "framer-motion";
import { useQuery } from "react-query";
import { useLocation, useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import SearchDetail from "../components/SearchDetail";
import { makeImagePath } from "../utils";
import { getMulti, IGetMultiMedia } from "./api";

const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.1,
    transition: {
      delay: 0.3,
      type: "tween",
    },
  },
};

const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.3,
      type: "tween",
    },
  },
};

const personboxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    transition: {
      delay: 0.3,
      type: "tween",
    },
  },
};

const type = {
  movie: "movie",
  tv: "tv",
};

function Search() {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");
  const { data, isLoading } = useQuery<IGetMultiMedia>("keyword", () =>
    getMulti(keyword || "")
  );
  const navigation = useNavigate();
  const idMatch = useMatch("/search/:type/:id");
  const onBoxClicked = (mediaId: number, type: string) => {
    navigation(`/search/${type}/${mediaId}`);
  };
  const getkeyword = localStorage.getItem("keyword");
  const onOverlayClick = () => {
    navigation(`/search?keyword=${getkeyword}`);
  };
  const { scrollY } = useViewportScroll();
  const setScrollY = useTransform(scrollY, (value) => value + 70);
  const personList = data?.results.filter((i) => i.media_type === "person");
  console.log(personList);
  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <Content>
          <Title>검색 결과 : {keyword}</Title>
          <SearchResults>
            <h3>Movie</h3>
            <Row>
              {data?.results &&
                data?.results.map((movie) =>
                  movie.media_type === "movie" ? (
                    <Box
                      key={movie.id}
                      layoutId={`${movie.id}`}
                      bgphoto={
                        movie.poster_path
                          ? `${makeImagePath(movie.poster_path, "w500")}`
                          : ""
                      }
                      variants={boxVariants}
                      initial="normal"
                      whileHover="hover"
                      transition={{ type: "tween" }}
                      onClick={() => onBoxClicked(movie.id, type.movie)}
                    >
                      <Info variants={infoVariants} key={movie.id}>
                        <HoverImg
                          bgphoto={
                            movie.backdrop_path
                              ? `${makeImagePath(movie.backdrop_path, "w500")}`
                              : ""
                          }
                        />
                        <h4>{movie.title}</h4>
                        <div>개봉일 : {movie.release_date}</div>
                        <div>평점 : ⭐{movie.vote_average}</div>
                      </Info>
                    </Box>
                  ) : (
                    ""
                  )
                )}
            </Row>
          </SearchResults>
          <SearchResults>
            <h3>Tv Show</h3>
            <Row>
              {data?.results &&
                data?.results.map((tv) =>
                  tv.media_type === "tv" ? (
                    <Box
                      key={tv.id}
                      layoutId={`${tv.id}`}
                      bgphoto={
                        tv.poster_path
                          ? `${makeImagePath(tv.poster_path, "w500")}`
                          : ""
                      }
                      variants={boxVariants}
                      initial="normal"
                      whileHover="hover"
                      transition={{ type: "tween" }}
                      onClick={() => onBoxClicked(tv.id, type.tv)}
                    >
                      <Info variants={infoVariants} key={tv.id}>
                        <HoverImg
                          bgphoto={
                            tv.backdrop_path
                              ? `${makeImagePath(tv.backdrop_path, "w500")}`
                              : ""
                          }
                        />
                        <h4>{tv.name}</h4>
                        <div>첫 방송 : {tv.first_air_date}</div>
                        <div>평점 : ⭐{tv.vote_average}</div>
                      </Info>
                    </Box>
                  ) : (
                    ""
                  )
                )}
            </Row>
          </SearchResults>
          <SearchResults>
            <h3>People</h3>
            <Row>
              {data?.results &&
                data?.results.map((person) =>
                  person.media_type === "person" ? (
                    <Box
                      key={person.id}
                      bgphoto={
                        person.profile_path
                          ? `${makeImagePath(person.profile_path, "w500")}`
                          : ""
                      }
                      variants={personboxVariants}
                      initial="normal"
                      whileHover="hover"
                      transition={{ type: "tween" }}
                    >
                      <PersonInfo variants={infoVariants} key={person.id}>
                        <h4>{person.name}</h4>
                        <Job>
                          {(person.known_for_department === "Acting" &&
                            "Acter") ||
                            (person.known_for_department === "Directing" &&
                              "Director") ||
                            (person.known_for_department === "Writing" &&
                              "Writer")}
                        </Job>
                        <WorkList>
                          <div>Tv Show</div>
                          <ul>
                            {person.known_for.map(
                              (i) =>
                                i.media_type === "tv" && (
                                  <li key={i.id}>{i.name}</li>
                                )
                            )}
                          </ul>
                          <div>Movie</div>
                          <ul>
                            {person.known_for.map(
                              (i) =>
                                i.media_type === "movie" && (
                                  <li key={i.id}>{i.title}</li>
                                )
                            )}
                          </ul>
                        </WorkList>
                      </PersonInfo>
                    </Box>
                  ) : (
                    ""
                  )
                )}
            </Row>
          </SearchResults>
          <>
            {idMatch ? (
              <>
                <Overlay
                  onClick={onOverlayClick}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 1 }}
                />
                <Detail
                  style={{ top: setScrollY }}
                  layoutId={idMatch?.params.id}
                >
                  <SearchDetail />
                </Detail>
              </>
            ) : null}
          </>
        </Content>
      )}
    </Wrapper>
  );
}

export default Search;

const Wrapper = styled.div`
  /* background-color: rebeccapurple; */
`;

const Loader = styled.div`
  height: 40vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  padding: 80px 60px;
`;

const Title = styled.h2`
  font-size: 30px;
  padding-left: 10px;
  padding-bottom: 15px;
  border-bottom: 3px solid ${(props) => props.theme.black.deepDark};
`;

const SearchResults = styled.div`
  font-size: 20px;
  font-weight: bold;
  padding-bottom: 50px;
  border-bottom: 3px solid ${(props) => props.theme.black.deepDark};

  h3 {
    padding: 20px 0;
  }
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(auto-fill, 4, 1fr);
  gap: 10px;
  row-gap: 10px;
  position: relative;
`;

const Box = styled(motion.div)<{ bgphoto: string }>`
  background-color: ${(props) => props.theme.black.deepDark};
  height: 300px;
  color: black;
  background-image: url(${(props) => props.bgphoto});
  background-position: center center;
  background-size: cover;
`;

const Info = styled(motion.div)`
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  width: 100%;
  height: 100%;

  h4 {
    text-align: center;
    font-size: 17px;
    margin: 20px 0;
    padding: 0 10px;
  }

  div {
    font-size: 13px;
    text-align: center;
    margin: 10px;
  }
`;

const PersonInfo = styled(motion.div)`
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  color: ${(props) => props.theme.white.darker};
  text-align: center;

  h4 {
    font-size: 20px;
    margin: 20px 0;
  }
`;

const Job = styled.div`
  font-size: 13px;
`;

const WorkList = styled.div`
  height: 60%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 17px;

  div {
    padding: 10px 0;
  }

  ul {
    width: 80%;
    font-size: 13px;
    padding-bottom: 10px;
    border-bottom: 2px solid ${(props) => props.theme.black.darker};
  }

  li {
    padding: 3px 0;
  }
`;

const HoverImg = styled(motion.svg)<{ bgphoto: string }>`
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
  width: 100%;
`;

const Detail = styled(motion.div)`
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

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;
