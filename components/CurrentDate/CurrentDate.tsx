"use client";

import React from "react";
import { formatDate } from "@/utils/formatters";
import { getWeekday } from "@/utils/getWeekday";

const CurrentDate: React.FC = () => {
  const today = new Date();
  const isoDate = today.toISOString();

  const weekday = getWeekday(isoDate);
  const formatted = formatDate(isoDate);

  const displayDate =
    weekday.charAt(0).toLowerCase() + weekday.slice(1) + ", " + formatted;

  return (
    <p>
      {displayDate}
    </p>
  );
};

export default CurrentDate;
