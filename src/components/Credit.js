import React, { Component } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const Link = styled.a`
  color: inherit;
  text-decoration: none;#61dafb
`;

const StyledCredit = styled.h3`
  /* position: absolute; */
  position: relative;
  /* bottom: -50px; */
  left: 0;
  color: rgba(255, 255, 255, 0.5);
  font-family: "Helvetica Now Text Regular", sans-serif;
  font-weight: 500;
  /* text-transform: uppercase; */
  /* letter-spacing: 0.08rem; */
  font-size: 0.8rem;
  width: 100%;
  @media screen and (max-width: 500px) {
    font-size: 0.7rem;
  }
  & > *:not(:last-child) {
    float: left;
    vertical-align: middle;
  }
`;

class Credit extends Component {
  render() {
    return (
      <StyledCredit>
        <span>
          Made with{" "}
          <FontAwesomeIcon
            icon={faHeart}
            pulse
            style={{ color: "#f44336", opacity: "1", margin: "0 2px" }}
          />{" "}
          by{" "}
          <Link
            href="http://imsolitude.github.io"
            style={{ color: "rgba(255, 255, 255, 1)" }}
            target="_blank"
          >
            MuhammadJ
          </Link>
          <Link
            href={this.props.href}
            target="_blank"
            style={{ opacity: "1", float: "right" }}
          >
            <FontAwesomeIcon
              icon={faGithub}
              size="2x"
              style={{ color: "white" }}
            />
          </Link>
        </span>
      </StyledCredit>
    );
  }
}

export default Credit;
