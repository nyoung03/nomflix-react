import { useQuery } from "react-query";
import { useMatch } from "react-router-dom";
import styled from "styled-components";
import { makeImagePath } from "../utils";
import { getMovieDetail, IGetMoiveDetail } from "../routes/api";

const Cover = styled.img<{ bgphoto: string }>`
  width: 100%;
  background-size: cover;
  background-position: center center;
  background-image: url(${(props) => props.bgphoto});
`;

const Title = styled.h3`
  color: ${(props) => props.theme.white.lighter};
`;

function Detail() {
  const MovieDetailMatch = useMatch("/movies/:id");
  const { data: detail, isLoading } = useQuery<IGetMoiveDetail>("detail", () =>
    getMovieDetail(MovieDetailMatch?.params.id || "")
  );
  return (
    <>
      <Cover bgphoto={makeImagePath(detail?.backdrop_path || "", "w500")} />
    </>
  );
}

export default Detail;
