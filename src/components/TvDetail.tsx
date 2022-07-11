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
  console.log(detail);
  return (
    <Wrapper>
      {detailIsLoading ? (
        "Loading..."
      ) : (
        <>
          <CoverImg
            bgphoto={makeImagePath(detail?.backdrop_path || "", "w500")}
          />
          <Poster
            src={`https://image.tmdb.org/t/p/original/${detail?.poster_path}`}
          />
          <Content>
            <Title marginTop={`${titleLen > 27 ? "-75px" : "-50px"}`}>
              {detail?.name}
            </Title>
            <Overview>{`${detail?.overview.slice(0, 320)}...`}</Overview>
            <SubInfo>
              <div>{detail?.last_air_date.split("-")[0]}</div>
              <div>시즌 {detail?.number_of_seasons} 개</div>
              <ul>
                {detail?.genres.map((i) => (
                  <li key={i.id}>{i.name}</li>
                ))}
              </ul>
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
`;

const CoverImg = styled.div<{ bgphoto: string }>`
  width: 100%;
  height: 55%;
  background-size: cover;
  background-position: center center;
  opacity: 0.4;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8)),
    url(${(props) => props.bgphoto});
  position: relative;
`;

const Poster = styled.img`
  height: 300px;
  margin: 40px;
  right: 0;
  top: 0;
  position: absolute;
`;

const Content = styled.div`
  padding: 10px 20px;
`;

const Title = styled.h3<{ marginTop: string }>`
  color: ${(props) => props.theme.white.lighter};
  font-size: 1.5rem;
  font-weight: bold;
  width: 55%;
  margin-top: ${(props) => props.marginTop};
`;

const SubInfo = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;

  div,
  ul {
    padding: 5px 8px;
    background-color: ${(props) => props.theme.black.darker};
    border-radius: 10px;
  }

  ul {
    display: flex;

    li {
      &:first-child {
        margin-right: 15px;
      }
    }
  }
`;

const Overview = styled.p`
  padding: 40px 0 10px 0;
  font-size: 15px;
`;
