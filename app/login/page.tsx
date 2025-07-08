import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const Page = ({}) => {
  return (
    <div className="container mx-auto min-h-screen flex flex-col items-center justify-center">
      <form className="w-lg mx-auto">
        <h2 className="font font-semibold text-3xl text-center mb-4">Login</h2>
        <Input placeholder="Email..." type="email" className="mb-2" />
        <Input placeholder="Password..." type="password" className="mb-2" />
        <Button className="w-lg bg-blue-400 border text-gray-800 hover:bg-blue-600 cursor-pointer">
          Login
        </Button>
      </form>
      <Separator className="max-w-lg my-2" />
      <Button className="w-lg bg-white border text-gray-800 hover:bg-blue-600 cursor-pointer">
        Login with Google
      </Button>
    </div>
  );
};

export default Page;
