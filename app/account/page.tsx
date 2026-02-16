import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { orders } from "@/lib/orders";
import AccountContent from "./AccountContent";

export default async function AccountPage() {
  const user = await currentUser();
  
  if (!user) {
    redirect("/sign-in");
  }

  const userOrders = orders.slice(0, 5);

  // Extract user information from Clerk
  const firstName = user.firstName || "";
  const lastName = user.lastName || "";
  const fullName = `${firstName} ${lastName}`.trim() || user.emailAddresses[0]?.emailAddress?.split("@")[0] || "User";
  const email = user.emailAddresses[0]?.emailAddress || "";
  const phoneNumber = user.phoneNumbers[0]?.phoneNumber || "";
  const imageUrl = user.imageUrl || "";

  return (
    <AccountContent 
      user={{
        id: user.id,
        firstName,
        lastName,
        fullName,
        email,
        phoneNumber,
        imageUrl,
      }}
      orders={userOrders}
    />
  );
}
