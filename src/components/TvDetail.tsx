import { useQuery } from "react-query";
import { useMatch } from "react-router-dom";
import styled from "styled-components";
import { getTvDetail, IGetTvDetail } from "../routes/api";
import { makeImagePath } from "../utils";

function TvDetail() {
  const TvDetailMatch = useMatch("/tvs/:id");
  const { data: detail, isLoading: detailIsLoading } = useQuery<IGetTvDetail>(
    "detail",
    () => getTvDetail(TvDetailMatch?.params.id || "")
  );
  const titleLen = detail?.name.length as any;
  return (
    <Wrapper>
      {detailIsLoading ? (
        "Loading..."
      ) : (
        <>
          <CoverImg
            src={
              detail?.backdrop_path
                ? `https://image.tmdb.org/t/p/w500/${detail?.backdrop_path}`
                : ""
            }
          />
          <Poster
            src={`https://image.tmdb.org/t/p/w500/${detail?.poster_path}`}
          />
          <Content>
            <Title marginTop={`${titleLen > 17 ? "-75px" : "-50px"}`}>
              {detail?.name}
            </Title>
            <Genres>
              {detail?.genres.map((i) => (
                <li key={i.id}>{i.name}</li>
              ))}
            </Genres>
            <SubInfo>
              <span>{detail?.number_of_seasons} Seasons</span>
              <span>{detail?.number_of_episodes} Episodes</span>
            </SubInfo>
          </Content>
        </>
      )}
    </Wrapper>
  );
}

export default TvDetail;

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

const Genres = styled.ul`
  display: flex;
  align-items: center;

  li {
    padding: 15px 0;
    margin-right: 10px;
    font-size: 13px;
    color: ${(props) => props.theme.white.darker};
  }
`;

const SubInfo = styled.div`
  span {
    margin-right: 10px;
  }
`;
