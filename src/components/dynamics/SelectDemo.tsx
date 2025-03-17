import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SelectDemo({ data, placeholder }) {
  return (
    <Select>
      <SelectTrigger className="w-full border-0 shadow-none">
        <SelectValue placeholder={placeholder || "Select"} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {data?.map((data, idx) => {
            return (
              <SelectItem key={idx} value={data?.title || data}>
                {data?.title || data}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
