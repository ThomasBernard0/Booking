export default function getDefaultAvailabilityByDay(
  dayAsNumber: number,
): string[][] {
  let dayAsString;
  switch (dayAsNumber) {
    case 0:
      dayAsString = 'sunday';
      break;
    case 1:
      dayAsString = 'monday';
      break;
    case 2:
      dayAsString = 'tuesday';
      break;
    case 3:
      dayAsString = 'wednesday';
      break;
    case 4:
      dayAsString = 'thursday';
      break;
    case 5:
      dayAsString = 'friday';
      break;
    case 6:
      dayAsString = 'saturday';
      break;
    default:
      return [];
  }
  return availabilityConstant[dayAsString];
}

interface availabilityConstant {
  [key: string]: string[][];
}

const availabilityConstant: {
  [key: string]: string[][];
  monday: string[][];
  tuesday: string[][];
  wednesday: string[][];
  thursday: string[][];
  friday: string[][];
  saturday: string[][];
  sunday: string[][];
} = {
  monday: [
    ['8:00', '10:00'],
    ['10:00', '12:00'],
    ['12:00', '14:00'],
    ['14:00', '16:00'],
    ['16:00', '18:00'],
    ['18:00', '20:00'],
    ['20:00', '22:00'],
  ],
  tuesday: [
    ['8:00', '10:00'],
    ['10:00', '12:00'],
    ['12:00', '14:00'],
    ['14:00', '16:00'],
    ['16:00', '18:00'],
    ['18:00', '20:00'],
    ['20:00', '22:00'],
  ],
  wednesday: [
    ['8:00', '10:00'],
    ['10:00', '12:00'],
    ['12:00', '14:00'],
    ['14:00', '16:00'],
    ['16:00', '18:00'],
    ['18:00', '20:00'],
    ['20:00', '22:00'],
  ],
  thursday: [
    ['8:00', '10:00'],
    ['10:00', '12:00'],
    ['12:00', '14:00'],
    ['14:00', '16:00'],
    ['16:00', '18:00'],
    ['18:00', '20:00'],
    ['20:00', '22:00'],
  ],
  friday: [
    ['8:00', '10:00'],
    ['10:00', '12:00'],
    ['12:00', '14:00'],
    ['14:00', '16:00'],
    ['16:00', '18:00'],
    ['18:00', '20:00'],
    ['20:00', '22:00'],
  ],
  saturday: [
    ['8:00', '10:00'],
    ['10:00', '12:00'],
    ['12:00', '14:00'],
    ['14:00', '16:00'],
    ['16:00', '18:00'],
    ['18:00', '20:00'],
    ['20:00', '22:00'],
  ],
  sunday: [
    ['8:00', '10:00'],
    ['10:00', '12:00'],
    ['12:00', '14:00'],
    ['14:00', '16:00'],
    ['16:00', '18:00'],
    ['18:00', '20:00'],
    ['20:00', '22:00'],
  ],
};
