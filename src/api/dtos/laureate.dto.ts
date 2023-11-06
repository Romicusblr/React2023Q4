export interface LaureateDTO {
  id: string;
  knownName?: IntlString;
  givenName?: IntlString;
  familyName?: IntlString;
  fullName?: IntlString;
  fileName?: string;
  gender?: string;
  nobelPrizes?: NobelPrize[];
  birth?: Birth;
}

interface IntlString {
  en?: string;
  no?: string;
  se?: string;
}

interface NobelPrize {
  awardYear: string;
  category: IntlString;
  categoryFullName: IntlString;
  sortOrder: string;
  portion: string;
  dateAwarded: string;
  prizeStatus: string;
  motivation: IntlString;
  prizeAmount: number;
  prizeAmountAdjusted: number;
  residences: [
    {
      country: IntlString;
      countryNow: IntlString;
      continent: IntlString;
      locationString: IntlString;
    },
  ];
}

interface Birth {
  date: string;
  place: {
    city: IntlString;
    country: IntlString;
    cityNow: IntlString;
    countryNow: IntlString;
    continent: IntlString;
    locationString: IntlString;
  };
}
