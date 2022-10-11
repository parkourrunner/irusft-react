import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import data from "../data/dataMap-v2.js";
import speakerImg from "../img/speaker.png";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin: 48px 0;
`;

const HeaderLine = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const EnDate = styled.div`
  font-family: IRANSansEn !important;
`;

const Speak = styled.div`
  margin-left: 8px;
  display: inline-block;
`;

const SpeakImg = styled.img`
  vertical-align: middle;
  cursor: pointer;
`;

const DescWrapper = styled.div`
  margin-top: 48px;
`;

const GalleryWrapper = styled.div``;

const NavigationWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 24px;
`;

const Button = styled.button`
  background-color: #00818b;
  color: white;
  width: 25%;
  display: inline-block;
  font-family: inherit;
  font-weight: 400;
  line-height: 1.5;
  text-align: center;
  text-decoration: none;
  vertical-align: middle;
  cursor: pointer;
  user-select: none;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  border-radius: 0.25rem;
`;

const Page = () => {
  const [result, setResult] = useState({});
  const navigate = useNavigate();
  const path = useLocation();
  const id = Number(path.pathname.split("/")[2]);
  useEffect(() => {
    if (!id) {
      navigate("/");
    }
    setResult(data.filter((item) => item.id === id)[0]);

    if (!result) {
      navigate("/");
    }
  }, [id, navigate, result]);
  const handleClick = (event) => {
    const change = event.target.dataset.change;
    if (change === 0) {
      navigate("/");
    } else {
      navigate(`/page/${id + Number(change)}`);
    }
  };
  return (
    <Container>
      <HeaderLine>
        <div>
          <span>{result.faName}</span>
        </div>
        <div>
          <Speak>
            <SpeakImg src={speakerImg} />
          </Speak>
          <span>{result.ruName}</span>
        </div>
      </HeaderLine>
      <HeaderLine>
        <div>
          <span>{result.faDate}</span>
        </div>
        <EnDate>
          <span>{result.enDate}</span>
        </EnDate>
      </HeaderLine>
      <DescWrapper>
        <span dangerouslySetInnerHTML={{ __html: result.description }}></span>
      </DescWrapper>
      <NavigationWrapper>
        <Button data-change="1" onClick={handleClick}>
          بعدی
        </Button>
        <Button data-change="0" onClick={handleClick}>
          خانه
        </Button>
        {id !== 1 && (
          <Button data-change="-1" onClick={handleClick}>
            قبلی
          </Button>
        )}
      </NavigationWrapper>
    </Container>
  );
};

export default Page;
