export interface Location {
  lat: number,
  long: number
}

export interface Campsite {
  title: string,
  location: Location,
  groupSite: boolean,
  datesAvailable: string[],
}
