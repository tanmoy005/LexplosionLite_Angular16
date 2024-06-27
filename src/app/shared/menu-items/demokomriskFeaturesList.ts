
export interface komriskFeaturesInterface {
    feature:string,
    description:string
} 

export interface komriskFeaturesCollectionInterface {
    name:string,
    features:komriskFeaturesInterface[]
}

export interface demoKomriskFeaturesListInterface {
   products:komriskFeaturesCollectionInterface[]
}


export const demoKomriskAndKomriskLiteAPIFeaturesList = {
    "products": [
      {
        "name": "Komrisk Lite",
        "features": [
          {
            "feature": "Feature Name 1",
            "description": "Feature Description 1."
          },
          
          {
            "feature": "Feature Name 2",
            "description": "Feature Description 2."
          },
  
          {
            "feature": "Feature Name 3",
            "description": "Feature Description 3."
          },
  
          {
            "feature": "Feature Name 4",
            "description": "Feature Description 4."
          },
          {
            "feature": "Feature Name 5",
            "description": "Feature Description 5."
          }
  
        ]
      },
      {
        "name": "Komrisk",
        "features": [
          {
            "feature": "Feature Name 1",
            "description": "Feature Description 1."
          },
          {
            "feature": "Feature Name 2",
            "description": "Feature Description 2."
          },
          {
            "feature": "Feature Name 3",
            "description": "Feature Description 3."
          },
          {
            "feature": "Feature Name 4",
            "description": "Feature Description 4."
          },
          {
            "feature": "Feature Name 5",
            "description": "Feature Description 5."
          }
        ]
      }
    ]
  }