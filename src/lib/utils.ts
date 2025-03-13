import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { DateTime } from "luxon"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function formatNumber(num: number): string {
  return (num / 100).toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function setCookie(cname: string, cvalue: string, exdays: number) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  let expires = "expires=" + d.toUTCString();
  //name=value;expires=value;path=value;
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export function getCookie(cname: string) {
  let name = cname + "=";
  let ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
export function formatDateTOYMD(date: string, format = 'yyyy-MM-dd') {
  if (format === 'yyyy-MM-dd') {
    return DateTime.fromJSDate(new Date(date)).toFormat('yyyy-MM-dd')
  } else if (format === 'dd/MM/yyyy') {
    return DateTime.fromJSDate(new Date(date)).toFormat('dd/MM/yyyy')
  }

}