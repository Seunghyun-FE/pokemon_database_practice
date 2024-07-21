import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import app from "../firebase";

const NavBar = () => {
  const auth = getAuth(app); //firebase.js와의 연결
  const provider = new GoogleAuthProvider();

  const [show, setShow] = useState(false);

  const { pathname } = useLocation(); //url 정보를 변수로 저장

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/login");
      } else if (user && pathname === "/login") {
        navigate("/");
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  signInWithPopup(auth, provider);

  const handleAuth = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.error(error);
      });
  }; // 구글 로그인 정보 가져오기

  const listener = () => {
    if (window.scrollY > 50) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", listener);

    return () => {
      window.removeEventListener("scroll", listener);
    };
  }, []);

  return (
    <NavWrapper show={show}>
      <Logo>
        <Image
          alt="pokelogo"
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/89.png"
          onClick={() => (window.location.href = "/")}
        />
      </Logo>
      {pathname === "/login" ? <Login onClick={handleAuth}>Login</Login> : null}
    </NavWrapper>
  );
};

const Login = styled.a`
  background-color: rgba(0, 0, 0, 0.6);
  padding: 8px 16px;
  text-transform: uppercase;
  letter-spacing: 1.55px;
  border: 1px solid #f9f9f9;
  border-radius: 4px;
  transition: all 0.2s ease 0s;
  color: white;

  &:hover {
    background-color: #f9f9f9;
    color: #000;
    border-color: transparent;
  }
`;

const Image = styled.img`
  cursor: pointer;
  width: 100%;
`;
const Logo = styled.a`
  padding: 0;
  width: 50px;
  margin-top: 4px;
`;

const NavWrapper = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  display:flex;
  justify-content: space-between;
  background-color: ${(props) => (props.show ? "#090b13 " : "transparent")};
  align-items: center;
  padding: 0: 36px;
  letter-spacing: 16px;
  z-index: 100;
`;
export default NavBar;
