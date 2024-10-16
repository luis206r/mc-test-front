import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";

import axios from "axios";
import React, { useEffect, useState } from "react";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/users", { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        setUsers(res.data.docs);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="w-full max-w-[500px] flex flex-col">
      {users.length > 0 ? ( // Aseguramos que el bloque condicional esté correctamente cerrado
        <Table aria-label="Example static collection table">
          <TableHeader>
            <TableColumn>nombre</TableColumn>
            <TableColumn>apellido</TableColumn>
            <TableColumn>email</TableColumn>
          </TableHeader>
          <TableBody>
            {users.map((user, i) => (
              <TableRow key={i}>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : null}
    </div>
  );
};

export default Users;
