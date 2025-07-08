"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenuSeparator,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import supabase from "@/lib/db";
import { IMenu } from "@/types/menu";
import { Ellipsis } from "lucide-react";
import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";

const Page = ({}) => {
  const [menus, setMenus] = useState<IMenu[]>([]);
  const [createDialog, setCreateDialog] = useState(false);

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

  const handleAddMenu = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      const { data, error } = await supabase
        .from("menus")
        .insert(Object.fromEntries(formData))
        .select();

      if (error) {
        console.error("Error adding menu: ", error);
      } else {
        if (data) {
          setMenus((prev) => [...data, ...prev]);
        }
        toast("Menu added successfully!");
        setCreateDialog(false);
      }
    } catch (error) {
      console.error("Unexpected error: ", error);
      toast.error("Failed to add menu. Please try again.");
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="mb-4 w-full flex justify-between">
        <h1 className="text-3xl font-bold">Menu</h1>
        <Dialog open={createDialog} onOpenChange={setCreateDialog}>
          <DialogTrigger asChild>
            <Button className="font-bold">Add Menu</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <form onSubmit={handleAddMenu}>
              <DialogHeader>
                <DialogTitle>Add Menu</DialogTitle>
                <DialogDescription>
                  Create a new menu by insert data in this form
                </DialogDescription>
              </DialogHeader>
              <div className="grid w-full gap-4 mt-4">
                <div className="grid w-full gap-1.5">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Insert Name..."
                    required
                  />
                </div>
                <div className="grid w-full gap-1.5">
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    name="price"
                    placeholder="Insert Price..."
                    required
                  />
                </div>
                <div className="grid w-full gap-1.5">
                  <Label htmlFor="price">Image</Label>
                  <Input
                    id="image"
                    name="image"
                    placeholder="Insert Image..."
                    required
                  />
                </div>
                <div className="grid w-full gap-1.5">
                  <Label htmlFor="price">Category</Label>
                  <Select name="category" required>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Categories</SelectLabel>
                        <SelectItem value="food">Food</SelectItem>
                        <SelectItem value="drink">Drink</SelectItem>
                        <SelectItem value="snack">Snack</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid w-full gap-1.5">
                  <Label htmlFor="price">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Insert Description..."
                    className="resize-none h-32"
                    required
                  />
                </div>
              </div>

              <DialogFooter>
                <DialogClose asChild>
                  <Button variant={"secondary"} className="cursor-pointer">
                    Cancel
                  </Button>
                </DialogClose>
                <Button
                  type="submit"
                  variant={"secondary"}
                  className="cursor-pointer"
                >
                  Create
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
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
