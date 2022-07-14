import { useQuery } from "react-query";
import { useMatch } from "react-router-dom";
import styled from "styled-components";
import { getMultiDetail, IGetSearch } from "../routes/api";
import { makeImagePath } from "../utils/imgPath";

function SearchDetail() {
  const idMatch = useMatch("/search/:type/:id");
  const { data, isLoading } = useQuery<IGetSearch>("type", () =>
    getMultiDetail(idMatch?.params.id || "", idMatch?.params.type || "")
  );
  return (
    <Wrapper>
      {isLoading ? (
        "Loading..."
      ) : (
        <>
          <CoverImg
            bgphoto={makeImagePath(data?.backdrop_path || "", "w500")}
          />
          <Poster bgphoto={makeImagePath(data?.poster_path || "", "w500")} />
          <Content>
            <Title>
              {data?.name || data?.title}
              <p>{data?.tagline}</p>
            </Title>
            <Overview>{`${data?.overview.slice(0, 320)}...`}</Overview>
            <SubInfo>
              <ul>
                {data?.genres.map((i) => (
                  <li key={i.id}>{i.name}</li>
                ))}
              </ul>
              <div>상영 시간 : {data?.runtime}분</div>
            </SubInfo>
          </Content>
        </>
      )}
    </Wrapper>
  );
}

export default SearchDetail;

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

const Poster = styled.div<{ bgphoto: string }>`
  height: 330px;
  width: 250px;
  margin: 40px;
  right: 0;
  top: 0;
  background-size: cover;
  background-position: center center;
  position: absolute;
  background-image: url(${(props) => props.bgphoto});
`;

const Content = styled.div`
  padding: 10px 20px;
`;

const Title = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  font-size: 1.5rem;
  font-weight: bold;
  width: 55%;
  margin-top: -45px;

  p {
    font-size: 13px;
    padding-top: 10px;
    height: 35px;
    color: gray;
  }
`;

const SubInfo = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
  font-size: 14px;

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
