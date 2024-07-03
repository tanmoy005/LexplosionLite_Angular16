export interface StateListInterface {
    id:number,
    countryName: string,
    states ?:State[] | null; 
}

export interface State {
    id : number
    name: string
}

export const StateList:StateListInterface[] = [{
    "id": 1,
    "countryName": "India",
    "states": [
      {
        "id": 1,
        "name": "Maharashtra"
      },
      {
        "id": 2,
        "name": "Karnataka"
      },
      {
        "id": 3,
        "name": "Tamil Nadu"
      },
      {
        "id": 4,
        "name": "Uttar Pradesh"
      },
      {
        "id": 5,
        "name": "Gujarat"
      }
    ]
  },
  {
    "id": 2,
    "countryName": "Singapore",
    "states": null
  },
  {
    "id": 3,
    "countryName": "United States",
    "states": [
      {
        "id": 1,
        "name": "Alabama"
      },
      {
        "id": 2,
        "name": "California"
      },
      {
        "id": 3,
        "name": "Texas"
      },
      {
        "id": 4,
        "name": "Alaska"
      },
      {
        "id": 5,
        "name": "Arizona"
      }
    ]
  }
  ]
  