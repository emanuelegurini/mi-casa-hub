import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@radix-ui/react-navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { createClient } from "@/utils/supabase/server";

export default async function MainHeader() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error, status } = await supabase
    .from("profiles")
    .select(`full_name, avatar_url`)
    .eq("id", user?.id)
    .single();

  return (
    <NavigationMenu className="pb-8 pt-4 flex justify-between items-center">
      <NavigationMenuList className="flex space-x-4">
        <NavigationMenuItem>
          <NavigationMenuLink
            href="/"
            className="text-gray-700 hover:font-bold transition-colors duration-300"
          >
            Home
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            href="/account"
            className="text-gray-700 hover:font-bold transition-colors duration-300"
          >
            Account
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
      <div className="flex items-center space-x-2">
        <span className="text-gray-700 capitalize">{data?.full_name}</span>
        <Avatar>
          <AvatarImage src={data?.avatar_url} />
          <AvatarFallback>
            {data?.full_name
              .split(" ")
              .slice(0, 2)
              .map((name: string) => name[0].toUpperCase())
              .join("")}
          </AvatarFallback>
        </Avatar>
      </div>
    </NavigationMenu>
  );
}
