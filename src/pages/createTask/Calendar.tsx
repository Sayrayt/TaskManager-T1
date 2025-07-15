import { forwardRef } from "react";
import { Input, InputGroup } from "@chakra-ui/react";
import { FaRegCalendarAlt } from "react-icons/fa";
import DatePicker from "react-datepicker";
import { type Ref } from "react";

import "react-datepicker/dist/react-datepicker.css";

interface CalendarProps {
  selectedDate: Date | null;
  onDateChange: (date: Date | null) => void;
}

const CustomInput = forwardRef<
  HTMLInputElement,
  { value?: string; onClick?: () => void }
>(({ value, onClick }, ref) => (
  <InputGroup
    startElement={<FaRegCalendarAlt color="gray.500" />}
    onClick={onClick}
    cursor="pointer"
  >
    <Input
      placeholder="Выберите дату"
      value={value}
      readOnly
      ref={ref as Ref<HTMLInputElement>}
    />
  </InputGroup>
));
CustomInput.displayName = "CustomInput";

export function Calendar({ selectedDate, onDateChange }: CalendarProps) {
  return (
    <DatePicker
      selected={selectedDate}
      onChange={onDateChange}
      dateFormat="dd.MM.yyyy"
      customInput={<CustomInput />}
    />
  );
}
