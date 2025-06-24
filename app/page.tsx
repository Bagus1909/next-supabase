"use client";
import supabase from "@/lib/db";
import { IMenu } from "@/types/menu";
import { useEffect, useState } from "react";

export default function Home() {
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
    <div>
      <h1>Home</h1>
      <ul>
        {menus.map((menu) => (
          <li key={menu.id}>{menu.name}</li>
        ))}
      </ul>
    </div>
  );
}
