import { useMatch } from "react-router-dom";
import styled from "styled-components";

function SearchDetail() {
  const idMatch = useMatch("/search/:id");
  return <Wrapper>dd</Wrapper>;
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
