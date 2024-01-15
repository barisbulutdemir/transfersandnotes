import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "../ui/scroll-area";

interface Post {
  status: string;
  pickup_location: string;
  dropoff_location: string;
  shipping_date: string;
  trailer_type: string;
}

interface Props {
  post?: Post[];
}

export function DashboardPostList({ post }: Props) {
  return (
          <ScrollArea>
            <div className="max-h-screen">

    <Table className="">
      <TableCaption>A list of your recent posts.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Status</TableHead>
          <TableHead>Pickup Location</TableHead>
          <TableHead>Dropoff Location</TableHead>
          <TableHead>Trailer Type</TableHead>
          <TableHead>Shipping Date</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody className="">
          {post?.map((p, index) => (
            <TableRow key={index}>
              <TableCell>{p.status}</TableCell>
              <TableCell>{p.pickup_location}</TableCell>
              <TableCell>{p.dropoff_location}</TableCell>
              <TableCell>{p.trailer_type}</TableCell>
              <TableCell>{p.shipping_date}</TableCell>
            </TableRow>
          ))}
          </TableBody>
    </Table>
    </div>

    </ScrollArea>
    );
}
