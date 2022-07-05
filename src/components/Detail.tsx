import { type } from "os";
import { useQuery } from "react-query";
import { useMatch } from "react-router-dom";
import styled from "styled-components";
import { getMovieDetail, IGetMoiveDetail } from "../routes/api";

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

const Title = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: -50px;
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
  /* background-color: red; */
`;

const SubInfo = styled.div`
  /* background-color: red; */
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

function Detail() {
  const MovieDetailMatch = useMatch("/movies/:id");
  const { data: detail, isLoading } = useQuery<IGetMoiveDetail>("detail", () =>
    getMovieDetail(MovieDetailMatch?.params.id || "")
  );
  console.log(detail);
  return (
    <Wrapper>
      <CoverImg
        src={`https://image.tmdb.org/t/p/w500/${detail?.backdrop_path}`}
      />
      <Poster
        src={`https://image.tmdb.org/t/p/original/${detail?.poster_path}`}
      />
      <Content>
        <Title>
          {detail?.title}
          <p>{detail?.tagline}</p>
        </Title>
        <Overview>{`${detail?.overview.slice(0, 142)}...`}</Overview>
        <SubInfo>
          <ul>
            {detail?.genres.map((i) => (
              <li>{i.name}</li>
            ))}
          </ul>
          <div>상영 시간 : {detail?.runtime}분</div>
          <div>{detail?.adult ? "청소년 관람 불가" : "청소년 관람 가능"}</div>
        </SubInfo>
      </Content>
    </Wrapper>
  );
}

export default Detail;
