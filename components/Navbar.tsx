import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <div className="flex gap-3 p-2 shadow-lg ">
      <Button>Add Post</Button>
      <Button>All Posts</Button>
    </div>
  );
};

export default Navbar;
