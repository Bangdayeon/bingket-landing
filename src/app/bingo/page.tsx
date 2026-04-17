import { Suspense } from "react";
import Bingo from "../(route)/Bingo";

export default function BingoPage() {
  return (
    <Suspense>
      <Bingo />
    </Suspense>
  );
}
