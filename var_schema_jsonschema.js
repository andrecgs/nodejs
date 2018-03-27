var schema =
{
  //"title": "pdvs",
  //"description": "schema for pdvs validation",
  //"type": "object",
  "properties": {

  "id": {
    "type": "string"
  },

  "tradingName": {
    "type": "string"
  },

  "ownerName": {
    "type": "string"
  },

  "document": {
    "type": "string"
  },

  "coverageArea": {
        "type": "object",
        "properties": {
          "type": { // tipo da entrada de dados da coordenadas
            "type": "string",
            "enum": ["MultiPolygon"] //somente "MultiPolygon" eh aceita
          },
          "coordinates": {
            "type": "array",
            "items": [
              {
                "type": "array",//array com diversas coordenadas dentro
                "items": [
                  {
                    "type": "array",
                    "minItems": 3, //eh necessario pelo menos 3 coordenada NAO LINEARES para definir uma coverage area
                    "items": [
                      {
                        "type": "array", //array com coordenadas
                        "minItems": 2, //array que define um ponto so pode ter duas coordenadas
                        "maxItems": 2, //array que define um ponto so pode ter duas coordenadas
                        "items": [
                          {
                            "type": "number",   //longitude
                            "minimum": -180,  //validate coordinate
                            "maximum":+180,   //validate coordinate
                          },
                          {
                            "type": "number", //longitude
                              "minimum": -90,   //validate coordinate
                              "maximum":+90,    //validate coordinate
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        }
    },

    "address": {
      "type": "object",
      "properties": {
        "type": { //tipo da entrada de dados da coordenada
          "type": "string",
          "enum": ["Point"] //somente "Point" eh aceita
        },
        "coordinates": {
          "type": "array", //array com coordenadas
          "minItems": 2, //array que define um ponto so pode ter duas coordenadas
          "maxItems": 2, //array que define um ponto so pode ter duas coordenadas
          "items": [
            {
              "type": "number", //longitude
              "minimum": -180,  //validate coordinate
              "maximum":+180,   //validate coordinate
            },
            {
              "type": "number", //longitude
              "minimum": -90,   //validate coordinate
              "maximum":+90,    //validate coordinate
            }
          ]
        }
      },
      "required": ["type","coordinates"]
    }
  },
"required": ["id","tradingName","ownerName","document","coverageArea","address"]
};
