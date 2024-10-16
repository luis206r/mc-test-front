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

const Items = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/items", { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        setItems(res.data.docs);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="w-full max-w-[700px] flex flex-col">
      {items.length > 0 ? ( // Aseguramos que el bloque condicional esté correctamente cerrado
        <Table aria-label="Example static collection table">
          <TableHeader>
            <TableColumn>imagen</TableColumn>
            <TableColumn>nombre</TableColumn>
            <TableColumn>precio</TableColumn>
            <TableColumn>descripcion</TableColumn>
            <TableColumn>calidad</TableColumn>
          </TableHeader>
          <TableBody>
            {items.map((item, i) => (
              <TableRow key={i}>
                <TableCell>
                  <img
                    src={`http://localhost:3001${item.image.url}`}
                    alt={item.image.alt}
                    className="w-[100px] h-[100px]"
                  />
                </TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell>{item.description[0].children[0].text}</TableCell>
                <TableCell>{item.quality}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : null}
    </div>
  );
};

export default Items;
