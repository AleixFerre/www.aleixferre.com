export function ageOn(birthDate: Date, now = new Date()): number {
  const age = now.getUTCFullYear() - birthDate.getUTCFullYear();
  const monthDiff = now.getUTCMonth() - birthDate.getUTCMonth();
  const hadBirthday = monthDiff > 0 || (monthDiff === 0 && now.getUTCDate() >= birthDate.getUTCDate());
  return hadBirthday ? age : age - 1;
}
