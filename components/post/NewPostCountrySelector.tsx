// CountrySelector.js
"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ChevronDown } from "lucide-react";
import { countries } from "./NewPostLocationData";
import { ScrollArea } from "../ui/scroll-area";

interface CountrySelectorProps {
    selectedCountry: string | undefined; // selectedCountry için string veya undefined tipi
    onSelectCountry: (country: string) => void; // onSelectCountry için fonksiyon tipi
  }

export const CountrySelector = ({ selectedCountry, onSelectCountry }: CountrySelectorProps) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
    <PopoverTrigger asChild>
      <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
        {  "Şehir seçin..."}
        <ChevronDown className="ml-2 h-4 w-4 shrink-0" />
      </Button>
    </PopoverTrigger>

    <PopoverContent className="w-full p-0">
      <Command>
        <CommandInput placeholder="Ara..." className="h-9" />
        <CommandEmpty>Şehir bulunamadı.</CommandEmpty>
        <ScrollArea className="h-96">
          <CommandGroup title="Türkiye Şehirleri">
            {countries.map(city => (
              <CommandItem
                key={city.value}
                value={city.value}
                onSelect={() => {
                  setOpen(false);
                  onSelectCountry(city.value);
                }}
              >
                {city.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </ScrollArea>
      </Command>
    </PopoverContent>
  </Popover>
  );
};
