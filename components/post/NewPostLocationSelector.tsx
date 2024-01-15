// NewPostLocationSelector.js
"use client";

import React, { useState } from "react";
import ReactCountryFlag from "react-country-flag";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CheckIcon, ChevronDown } from "lucide-react"; // CheckCheckIcon'un ismi yanlış olabilir, doğrusu CheckIcon
import { cityChoices } from "./NewPostLocationData";
import { ScrollArea } from "../ui/scroll-area";

export function NewPostLocationSelector() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  // Fonksiyonunuz burada
  const isNumericValue = (val: string) => !isNaN(Number(val));

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value ? cityChoices.find((i) => i.label === value)?.label : "Lokasyon seçin..."}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." className="h-9" />
          <CommandEmpty>No framework found.</CommandEmpty>
          <ScrollArea className="h-48">
            <CommandGroup>
              {cityChoices.map((i) => (
                <CommandItem
                  key={i.value}
                  value={i.value}
                  onSelect={() => {
                    setValue(i.value === value ? "" : i.value);
                    setOpen(false);
                    
                  }}
                >
                  {isNumericValue(i.value) ? (
                    <div className=" rounded-full flex items-center justify-center p-1 border border-gray-700 mr-2 w-8 h-auto">{i.value}</div> // Sayısal değilse gösterilecek içerik

                   
                  ) : (
                    <ReactCountryFlag countryCode={i.value} svg className="mr-2" />
                  )}
                  {i.label}
                  <CheckIcon
                    className={value === i.value ? "ml-auto h-4 w-4 opacity-100" : "ml-auto h-4 w-4 opacity-0"}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </ScrollArea>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
