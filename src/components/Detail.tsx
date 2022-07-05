import { useQuery } from "react-query";
import { useMatch } from "react-router-dom";
import styled from "styled-components";
import { getMovieDetail, IGetMoiveDetail } from "../routes/api";

function Detail() {
  const MovieDetailMatch = useMatch("/movies/:id");
  const { data: detail, isLoading: detailIsLoading } =
    useQuery<IGetMoiveDetail>("detail", () =>
      getMovieDetail(MovieDetailMatch?.params.id || "")
    );
  const titleLen = detail?.title.length as any;
  console.log(titleLen);
  return (
    <Wrapper>
      {detailIsLoading ? (
        "Loading ..."
      ) : (
        <>
          <CoverImg
            src={`https://image.tmdb.org/t/p/w500/${detail?.backdrop_path}`}
          />
          <Poster
            src={`https://image.tmdb.org/t/p/original/${detail?.poster_path}`}
          />
          <Content>
            <Title marginTop={`${titleLen > 13 ? "-75px" : "-50px"}`}>
              {detail?.title}
              <p>{detail?.tagline}</p>
            </Title>
            <Overview>{`${detail?.overview.slice(0, 142)}...`}</Overview>
            <SubInfo>
              <ul>
                {detail?.genres.map((i) => (
                  <li key={i.id}>{i.name}</li>
                ))}
              </ul>
              <div>상영 시간 : {detail?.runtime}분</div>
              <div>
                {detail?.adult ? "청소년 관람 불가" : "청소년 관람 가능"}
              </div>
            </SubInfo>
          </Content>
        </>
      )}
    </Wrapper>
  );
}

export default Detail;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const CoverImg = styled.img`
  width: 100%;
  background-size: cover;
  background-position: center center;
  opacity: 0.4;
`;

const Poster = styled.img`
  height: 350px;
  margin: 40px;
  right: 0;
  position: absolute;
`;

const Content = styled.div`
  padding: 10px 20px;
`;

const Title = styled.h3<{ marginTop: string }>`
  color: ${(props) => props.theme.white.lighter};
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: ${(props) => props.marginTop};
  width: 50%;

  p {
    font-size: 13px;
    padding-top: 10px;
    height: 35px;
    color: gray;
  }
`;

const Overview = styled.p`
  padding: 20px 0 10px 0;
`;

const SubInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 0;

  ul {
    display: flex;
    margin: 5px 0;
    li {
      margin: 0 10px;
    }
  }

  div {
    margin: 5px 0;
  }
`;
