import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TbExternalLink, TbLogout2 } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import { useSelector } from "react-redux";

const NavBar = () => {
  const auth = useSelector((state) => state.auth);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const navigate = useNavigate();
  const logout = () => {
    axios
      .post(
        "http://localhost:3001/api/users/logout",
        {},
        { withCredentials: true }
      )
      .then((res) => {
        navigate("/login");
      })
      .catch((err) => console.error(err));
  };
  return (
    <div className="w-full flex rounded-b-xl shadow-md mb-2 p-2 justify-between">
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                User info
              </ModalHeader>
              <ModalBody>
                <p>Nombre: {auth.user.firstName}</p>
                <p>Apellido: {auth.user.lastName}</p>
                <p>Email: {auth.user.email}</p>
                <p>Rol de usuario: {auth.user.roles[0]}</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <div>
        <Button isIconOnly color="danger" aria-label="salir" onClick={logout}>
          <TbLogout2 className="p-0 m-0 w-[20px] h-[20px]" />
        </Button>
        <Button
          className="ml-[2px]"
          isIconOnly
          variant="flat"
          aria-label="salir"
          onClick={onOpen}
        >
          <CgProfile className="p-0 m-0 w-[20px] h-[20px]" />
        </Button>
      </div>

      <h2>Test Project</h2>
      <Button
        aria-label="salir"
        className="bg-[#006FEE] text-white"
        onClick={() =>
          window.open("https://github.com/luis206r/mc-test-back", "_blank")
        }
      >
        Repo
        <TbExternalLink className="p-0 m-0 w-[20px] h-[20px]" />
      </Button>
    </div>
  );
};

export default NavBar;
