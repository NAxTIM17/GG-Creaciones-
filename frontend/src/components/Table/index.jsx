import React from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue} from "@nextui-org/react";
import productos from "../../pages/Materiales/data";

const columns = [
  {
    key: "nombre",
    label: "NOMBRE",
  },
  {
    key: "cantidad",
    label: "CANTIDAD",
  },
  {
    key: "precio",
    label: "PRECIO",
  },
];

export default function TableTitle({filtro}) {
    const productosFiltrados = productos.filter(producto =>
        producto.nombre.toLocaleLowerCase().includes(filtro.toLocaleLowerCase())
      )

  return (
    <Table aria-label="Example table with dynamic content">
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={productosFiltrados}>
        {(item) => (
          <TableRow key={item.key}>
            {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
