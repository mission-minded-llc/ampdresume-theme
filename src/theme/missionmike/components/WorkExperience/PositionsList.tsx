"use client";

import { Company } from "@/types";
import { PositionSingle } from "./PositionSingle";

export const PositionsList = ({ company }: { company: Company }) =>
  company?.positions?.map((position) => (
    <PositionSingle
      key={`position-single-${position.id}`}
      position={position}
      company={company}
      showDates={company?.positions?.length ? company.positions.length > 1 : false}
    />
  ));
