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

const Consumptions = () => {
  const [consumptions, setConsumptions] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/consumptions", { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        setConsumptions(res.data.docs);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="w-full max-w-[500px] flex flex-col ">
      {consumptions.length > 0 ? ( // Aseguramos que el bloque condicional esté correctamente cerrado
        <Table aria-label="Example static collection table">
          <TableHeader>
            <TableColumn>fecha</TableColumn>
            <TableColumn>cantidad(L)</TableColumn>
            <TableColumn>tarifa</TableColumn>
          </TableHeader>
          <TableBody>
            {consumptions.map((consumption, i) => (
              <TableRow key={i}>
                <TableCell>{consumption.consumptionDay}</TableCell>
                <TableCell>{consumption.quantity}</TableCell>
                <TableCell>{consumption.charge}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : null}
    </div>
  );
};

export default Consumptions;
