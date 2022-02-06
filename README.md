# Free Phone Number Validation API

Wordplex.io is providing this API to empower your international ambitions: Focus on your developments while we take care of the complexity for multilanguage websites & apps.

## Documentation

Base URL

```
http://geo.wordplex.io/v4/phone? n=PHONE_NUMBER& c=COUNTRY_CODE
```

If this was a successful request, the valid phone number and details associated with it are returned, as shown below:

```
{
  "is_number_possible": true,
  "is_number_valid": true,
  "type": "mobile",
  "number_parts": {
    "country_code": 386,
    "e164": "+38631376475",
    "nat": "031 376 475",
    "intl": "+386 31 376 475"
  },
  "carrier": {
    "name": "Mobitel"
  },
  "location": {
    "iso2": "SI",
    "name": "Slovenia"
  },
  "info": {
    "response_time": "0.97 ms",
    "human": "This API is provided by wordplex.io to make the web more international, and the life of developers easier.",
    "node": "de.n2.geo.wordplex.infra.qwape.com"
  }
}
```

## Request Parameters

`n` _String_ (required) - The phone number to validate and verify.

`c` _String_ (optional) - Country code (if provided, phone number can be used without +XXX)

## Response (json)

`is_number_possible` _Boolean_ - Will tell if the format of the phone number is correct in theory for the country

`is_valid_number` _Boolean_ - Result of the phone number attribution verification

`type` _String_ - Describes the type of line (land, mobile, voip, etc.)

`number_parts.country_code` _String_ - TCountry Code as defined by the ITU (without the leading “+”)

`number_parts.e164` _String_ - ITU’s E164 formatted phone number

`number_parts.nat` _String_ - Locally formatted phone number

`number_parts.intl` _String_ - Internationally promatted readable phone number containing spaces

`carrier.name` _String_ - Name of the carrier or provider for the verified phone number

`location.iso2` _String_ - Alpha-2 formatted country code (2 letters)

`location.name` _String_ - Country name, or sub-region if known (eg. for overseas territories)

`info.response_time` _String_ - Request execution time in milliseconds

`info.human` _String_ - General information sent by the API provider

`info.node` _String_ - Actual server node that provided verification
