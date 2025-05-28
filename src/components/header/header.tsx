import { Button } from "../ui/button";

export const Header = () => {
  return (
    <header className="flex items-center justify-center gap-6 p-4 shadow-md">
      <Button variant="ghost" className="hover:text-primary">
        Samsung
      </Button>
      <Button variant="ghost" className="hover:text-primary">
        Apple
      </Button>
      <Button variant="ghost" className="hover:text-primary">
        Motorola
      </Button>
      <Button variant="ghost" className="hover:text-primary">
        Xiaomi
      </Button>
    </header>
  );
};
