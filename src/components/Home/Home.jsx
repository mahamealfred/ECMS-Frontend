import React, { useEffect } from "react";
import styled from "styled-components";
import hero from "../../assets/hero.jpg";
import Button from "./Button";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Home() {
  const navigate = useNavigate();
  const { auth } = useAuth();

  useEffect(() => {
    if (auth) {
      navigate("/dashboard");
    }
  }, []);

  const handleSubmit = () => {
    navigate("/complaint-form");
  };

  return (
    <Section>
      <Navbar />
      <div className="ellipse"></div>
      <div className="container">
        <div className="content">
          <h1 >
            ENVIRONMENTAL{" "}
            <span>
              {/* <img src={hero} alt="Hero Text" /> */}
            </span>{" "}
            COMPLAINTS AND GRIEVANCES
            MANAGEMENT SYSTEM
          </h1>
          <p>
            It serves as a centralized hub where individuals, communities, or
            organizations can submit complaints or grievances related to
            environmental problems they encounter.
          </p>
          <div className="buttons">
            <Button onClick={handleSubmit} blue text="Start Now" />
          </div>
        </div>
        {/* <div className="image">
          <img src={hero} alt="hero" />
        </div> */}
      </div>
    </Section>
  );
}

const Section = styled.section`
  margin: 0.5rem;
  height: 100vh;
  background-image: radial-gradient(
    circle 580.6px at 10% 40%,
    rgb(26, 0, 61) 30%,
    rgb(0, 0, 0) 100%
  );
  border-radius: 1rem;
  position: relative;
  overflow: hidden;
  margin-bottom: 5rem;
  .ellipse {
    height: 30rem;
    width: 30rem;
    background-color: #ae54c27d;
    border-radius: 100%;
    filter: blur(2000px);
    opacity: 0.5;
    position: absolute;
    bottom: -30%;
    left: -10%;
    z-index: 1;
  }
  .container {
    padding: 2rem;
    margin: 0 2rem;
    display: flex;
    .content {
      z-index: 10;
      display: flex;
      flex-direction: column;
      gap: 2rem;
      margin-top: 5rem;
      padding-right: 2rem;
      h1 {
        color: white;
        font-size: 3rem;
        span {
          .img {
            height: 4rem;
          }
        }
      }
      p {
        color: #a6a6a6;
      }
      .buttons {
        display: flex;
        gap: 2rem;
      }
    }
    .image {
      img {
        height: 40rem;
      }
    }
  }
  @media screen and (max-width: 1080px) {
    margin: 0;
    border-radius: 0;
    .container {
      flex-direction: column;
      margin: 0;
      padding: 2rem;
      gap: 2rem;
      justify-content: center;
      align-items: center;
      .content {
        padding-right: 0;
        h1 {
          font-size: 3rem;
          span {
            img {
              height: 2rem;
            }
          }
        }
        .buttons {
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
      }
      .image {
        img {
          height: auto;
          max-width: 100%;
        }
      }
    }
  }
`;
