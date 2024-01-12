import { HttpException, HttpStatus } from '@nestjs/common';
import { addDays } from 'date-fns';

export function convertAndVerifyNumber(value: number): number {
  const valueConverted = Number(value);

  if (isNaN(valueConverted)) {
    throw new HttpException(
      'O valor informado deve ser do tipo numérico!',
      HttpStatus.BAD_REQUEST,
    );
  }

  return valueConverted;
}

export function resetHour(date: Date) {
  const frozenTime = 'T00:00:00.000Z';

  const dayMonthAndYearExtracted = date.toJSON();

  const dateWithZeroHour = new Date(
    dayMonthAndYearExtracted.substring(0, 10) + frozenTime,
  );

  return dateWithZeroHour;
}

export function addDay(date: Date, quantity: number) {
  return addDays(date, quantity);
}

export function addHour(date: Date, hours: number) {
  const hour = date.getHours() + hours;
  const dateAdded = date;
  dateAdded.setHours(hour);
  return dateAdded;
}
