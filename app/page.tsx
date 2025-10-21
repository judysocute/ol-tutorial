import MyMap from "@/components/MyMap";
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <MyMap /> {/* default projection EPSG:3857 */}
      {/* <MyMap projection="ESRI:54030" /> */}
      <Button>hihi</Button>
    </div>
  );
}
