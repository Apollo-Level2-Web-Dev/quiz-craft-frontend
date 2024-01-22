import { Navbar, Typography } from "@material-tailwind/react";

export function NavbarDefault() {
  return (
    <Navbar
      variant="gradient"
      color="deep-purple"
      placeholder={""}
      className="mx-auto max-w-screen-xl px-4 py-2 lg:px-8 lg:py-4 my-4"
    >
      <div className="container mx-auto flex items-center justify-between text-white">
        <Typography
          placeholder={""}
          variant="h5"
          className="mr-4 cursor-pointer py-1.5 font-medium"
        >
          Quiz Craft
        </Typography>
      </div>
    </Navbar>
  );
}
