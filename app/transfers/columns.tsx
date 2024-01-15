"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown, ChevronRight } from "lucide-react";

import { ColumnDef } from "@tanstack/react-table";

export type Transfers = {
  id: string;
  status: "pending" | " " | "success";
  pickupLocation: string;
  dropOffLocation: string;
  cargoType: string;
  cargoWeight: string;
  vehicleType: string;
  contactInfo: string;
};

export const columns: ColumnDef<Transfers>[] = [
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          className="-ml-4"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "pickup_location",
    header: ({ column }) => {
      return (
        <Button
          className="-ml-4"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Pickup
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: "arrow",
    cell: ({ row }) => {
      const transfer = row.original;

      return <ChevronRight className="-ml-14" />;
    },
  },
  {
    accessorKey: "dropoff_location",
    header: ({ column }) => {
      return (
        <Button
          className="-ml-4"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Dropoff
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "cargo_type",
    header: ({ column }) => {
      return (
        <Button
          className="-ml-4"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Type
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "cargo_weight",
    header: "Cargo Weight",
  },
  {
    accessorKey: "trailer_type",
    header: ({ column }) => {
      return (
        <Button
          className="-ml-4"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tip
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "shipping_date",
    header: "Shipping Date",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const transfer = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="bg-blue-500">
              <span className="">Contact</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(transfer.id)}
            >
              Copy transfer ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  {
    id: "details",
    cell: ({ row }) => {
      const transfer = row.original;

      return (
        <Button variant={"ghost"} className="p-2 -mx-8 lg:-mx-14">
          <span className="hidden lg:block text-xs">Details</span>
          <ChevronRight />
        </Button>
      );
    },
  },
];
