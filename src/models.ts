export interface Location {
  lat: number,
  long: number
}

export interface Campsite {
  title: string,
  location: Location,
  datesAvailable: string[],
  elevation: string,
  detailsLink: string
}
