import { AnimatePresence, motion } from "framer-motion";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
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

function Search() {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");
  const { data, isLoading } = useQuery<IGetMultiMedia>("keyword", () =>
    getMulti(keyword || "")
  );
  console.log(data);
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
              {data?.results.map((i) =>
                i.media_type === "movie" ? (
                  <Box
                    key={i.id}
                    bgphoto={makeImagePath(i.poster_path, "w500")}
                    variants={boxVariants}
                    initial="normal"
                    whileHover="hover"
                    transition={{ type: "tween" }}
                  >
                    <Info variants={infoVariants} key={i.id}>
                      <HoverImg
                        bgphoto={makeImagePath(i.backdrop_path, "w500")}
                      />
                      <h4>{i.title}</h4>
                      <div>개봉일 : </div>
                      <div>평점 : ⭐</div>
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
              {data?.results.map((i) =>
                i.media_type === "tv" ? (
                  <Box
                    key={i.id}
                    bgphoto={makeImagePath(i.poster_path, "w500")}
                    variants={boxVariants}
                    initial="normal"
                    whileHover="hover"
                    transition={{ type: "tween" }}
                  ></Box>
                ) : (
                  ""
                )
              )}
            </Row>
          </SearchResults>
          <SearchResults>
            <h3>People</h3>
            <Row>
              {data?.results.map((i) =>
                i.media_type === "person" ? (
                  <Box
                    key={i.id}
                    bgphoto={makeImagePath(i.profile_path, "w500")}
                    variants={boxVariants}
                    initial="normal"
                    whileHover="hover"
                    transition={{ type: "tween" }}
                  ></Box>
                ) : (
                  ""
                )
              )}
            </Row>
          </SearchResults>
          <AnimatePresence></AnimatePresence>
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

const HoverImg = styled(motion.svg)<{ bgphoto: string }>`
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
  width: 100%;
`;
