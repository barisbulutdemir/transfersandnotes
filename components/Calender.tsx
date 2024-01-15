"use client"

import * as React from "react"

import { Calendar } from "@/components/ui/calendar"
import { Card } from "./ui/card"

export function CalendarComponent() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  return (
    <>
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-md border shadow-lg"
      />
      <div>
        <Card className="h-[200px] mt-4 shadow-lg">
          
        </Card>
      </div>
      </>
  )
}
