"use client";

import { Button } from "@/components/ui/button";
import supabase from "@/lib/db";
import { IMenu } from "@/types/menu";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const Page = ({}) => {
  const params = useParams();
  const [menu, setMenu] = useState<IMenu | null>(null);

  useEffect(() => {
    if (params.id) {
      const fetchMenu = async () => {
        const { data, error } = await supabase
          .from("menus")
          .select("*")
          .eq("id", params.id)
          .single();

        console.log("Data: ", data);
        if (error) {
          console.error("Error fetching menu: ", error);
        } else {
          setMenu(data);
        }
      };

      fetchMenu();
    }
  }, [params.id]);

  return (
    <div className="container mx-auto py-8">
      <div className="flex gap-16">
        {menu && (
          <div className="w-full">
            <div className="">
              <Image
                src={menu.image}
                alt={menu.name}
                width={360}
                height={1080}
                className="w-full h-[70vh] object-cover rounded-2xl object-center shadow-xl"
              />
            </div>
            <div className="mt-8 w-full">
              <h1 className="text-5xl font-bold mb-4">{menu.name}</h1>
              <p className="text-xl mb-4 text-neutral-700">
                {menu.description}
              </p>
              <div className="flex gap-4 items-center justify-between mt-4">
                <p className="text-4xl font-bold">${menu.price}.00</p>
                <Button className="">Buy Now</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
