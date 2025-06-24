"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenuSeparator,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import supabase from "@/lib/db";
import { IMenu } from "@/types/menu";
import { Ellipsis } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const Page = ({}) => {
  const [menus, setMenus] = useState<IMenu[]>([]);

  useEffect(() => {
    const fecthMenus = async () => {
      const { data, error } = await supabase.from("menus").select("*");

      if (error) {
        console.log("Error: ", error);
      } else {
        setMenus(data);
        console.log(data[0].name);
      }
    };

    fecthMenus();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <div className="mb-4 w-full flex justify-between">
        <h1 className="text-3xl font-bold">Menu</h1>
        <Button className="font-bold">Add Menu</Button>
      </div>
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {menus.map((menu: IMenu) => (
              <TableRow key={menu.id}>
                <TableCell>
                  <Image
                    src={menu.image}
                    alt={menu.name}
                    width={50}
                    height={50}
                    className="aspect-square object-cover rounded-lg"
                  />
                  {menu.name}
                </TableCell>
                <TableCell>
                  {menu.description.split(" ").slice(0, 5).join(" ")}
                </TableCell>
                <TableCell>{menu.category}</TableCell>
                <TableCell>${menu.price}.00</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild className="cursor-pointer">
                      <Ellipsis />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="start">
                      <DropdownMenuLabel className="font-bold">
                        Action
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-400">
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Page;
