import { redirect } from "next/navigation";

// The site opens on Get started → Introduction.
export default function Home() {
  redirect("/styleguide/overview");
}
