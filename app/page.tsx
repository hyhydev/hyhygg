import { Suspense } from "react";
import PrototypeGallery from "./_prototype/PrototypeGallery";

// PROTOTYPE — the root route currently hosts the direction-prototype gallery
// (wayfinder #10/#11/#12). The winning variant replaces this page; the
// _prototype folder is deleted when #13 is decided.

export const metadata = {
  title: "Harry Hartley — hyhy.gg (direction prototypes)",
  description: "Lead engineer, Bath/Bristol. I build and run production systems end to end.",
};

export default function Home() {
  return (
    <Suspense>
      <PrototypeGallery />
    </Suspense>
  );
}
