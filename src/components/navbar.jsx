import React from "react";
import { FaGithub , FaLinkedin } from "react-icons/fa";
const navbar = () => {
  return (
    <nav className="absolute w-full flex h-14 bg-purple-950 justify-between  mx-auto  items-center px-4 py-5">
      <div className="font-bold text-xl  text-white">Passkeeper</div>
      <ul className="gap-5 flex">
        <li className="text-white pr-3"><a className="hover:font-bold fill-white " href="https://github.com/gourigahane" ><FaGithub /></a></li>
        <li className="text-white pr-3"><a className="hover:font-bold fill-white " href="https://www.linkedin.com/in/gourisha-gahane-720908310/"><FaLinkedin /></a></li>
        </ul>
    </nav>
  );
};

export default navbar;
