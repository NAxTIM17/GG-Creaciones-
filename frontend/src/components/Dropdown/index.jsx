import React from "react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";

export default function DropDownPiola() {
  const [selectedKeys, setSelectedKeys] = React.useState(new Set(["Unidad"]));

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button 
          variant="bordered" 
          className="capitalize w-full"
        >
          {selectedValue}
        </Button>
      </DropdownTrigger>
      <DropdownMenu 
        aria-label="Single selection example"
        variant="flat"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
      >
        <DropdownItem key="metros">Metros</DropdownItem>
        <DropdownItem key="unidades">Unidades</DropdownItem>
        <DropdownItem key="centimetros">Centrimetros</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
