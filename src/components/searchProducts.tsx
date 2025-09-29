"use client"

import { useState } from "react"

const mockProducts_Later = [
  { name: "Accessories",
    items: [ 
      {id: 1,name: "20w hot glue stick",reviews: "(0)",price: "₦270.00",imageUrl: "https://placehold.co/150x100/E0E0E0/white?text=Product",quantity: 9},
      {id: 2,name: "Male-male jumper wire (single)",reviews: "(0)",price: "₦100.00",imageUrl: "https://placehold.co/150x100/E0E0E0/white?text=Product",quantity: 9},
      {id: 3,name: "Male-female jumper wire (single)",reviews: "(0)",price: "₦100.00",imageUrl: "https://placehold.co/150x100/E0E0E0/white?text=Product",quantity: 9},
      {id: 4,name: "Male-female jumper wire (set)",reviews: "(0)",price: "₦1,500.00",imageUrl: "https://placehold.co/150x100/E0E0E0/white?text=Product",quantity: 9},
      {id: 5,name: "Hot glue sticks-60w",reviews: "(0)",price: "₦400.00",imageUrl: "https://placehold.co/150x100/E0E0E0/white?text=Product",quantity: 9},
      {id: 6,name: "Neodymium super magnet 8x5mm",reviews: "(0)",price: "₦350.00",imageUrl: "https://placehold.co/150x100/E0E0E0/white?text=Product",quantity: 9},
      {id: 7,name: "Female-female jumper wire (single)",reviews: "(0)",price: "₦100.00",imageUrl: "https://placehold.co/150x100/E0E0E0/white?text=Product",quantity: 9},
      {id: 8,name: "Female-female jumper wire (set)",reviews: "(0)",price: "₦1,400.00",imageUrl: "https://placehold.co/150x100/E0E0E0/white?text=Product",quantity: 9},
      {id: 9,name: "Tact switch 12*12*6",reviews: "(0)",price: "₦100.00",imageUrl: "https://placehold.co/150x100/E0E0E0/white?text=Product",quantity: 9}
    ]
  },
  { name: "Modules",
    items: [ 
      {id: 2,name: "HC-SR04 UltraSonic Sensor",reviews: "(0)",price: "₦2,500.00",imageUrl: "https://placehold.co/150x100/E0E0E0/white?text=Product",quantity: 9},
      {id: 4,name: "Blue LCD 1602",reviews: "(0)",price: "₦3,000.00",imageUrl: "https://placehold.co/150x100/E0E0E0/white?text=Product",quantity: 9},
      {id: 6,name: "PIR motion sensor",reviews: "(0)",price: "₦2,000.00",imageUrl: "https://placehold.co/150x100/E0E0E0/white?text=Product",quantity: 9},
      {id: 8,name: "Relay module 1 channel",reviews: "(0)",price: "₦1,400.00",imageUrl: "https://placehold.co/150x100/E0E0E0/white?text=Product",quantity: 9},
      {id: 10,name: "LM2596 Buck DC-DC power module",reviews: "(0)",price: "₦2,000.00",imageUrl: "https://placehold.co/150x100/E0E0E0/white?text=Product",quantity: 9},
      {id: 12,name: "sim800L GSM module",reviews: "(0)",price: "₦8,800.00",imageUrl: "https://placehold.co/150x100/E0E0E0/white?text=Product",quantity: 9},
      {id: 14,name: "DHT11 Temperature and humidity sensor",reviews: "(0)",price: "₦1,700.00",imageUrl: "https://placehold.co/150x100/E0E0E0/white?text=Product",quantity: 9},
      {id: 16,name: "L298N Dual H Bridge DC Stepper Motor Driver",reviews: "(0)",price: "₦5,500.00",imageUrl: "https://placehold.co/150x100/E0E0E0/white?text=Product",quantity: 9},
      {id: 18,name: "HC-05 bluetooth Module",reviews: "(0)",price: "₦6,000.00",imageUrl: "https://placehold.co/150x100/E0E0E0/white?text=Product",quantity: 9},
    ]
  },
  { name: "Board",
    items: [ 
      {id: 11,name: "Breadboard MB102",reviews: "(0)",price: "₦2,000.00",imageUrl: "https://placehold.co/150x100/E0E0E0/white?text=Product",quantity: 9},
      {id: 13,name: "Arduino uno r3 with cable",reviews: "(0)",price: "₦14,000.00",imageUrl: "https://placehold.co/150x100/E0E0E0/white?text=Product",quantity: 9},
      {id: 15,name: "Hub360 Arduino starter kit with SMD UNO",reviews: "Rated 4.00 out of 5",price: "(1)",imageUrl: "https://placehold.co/150x100/E0E0E0/white?text=Product",quantity: 9},
      {id: 17,name: "TP4056 18650 1A lipo Battery Charger with Protection module",reviews: "(0)",price: "₦500.00",imageUrl: "https://placehold.co/150x100/E0E0E0/white?text=Product",quantity: 9},
      {id: 19,name: "vero board small size stripped",reviews: "(0)",price: "₦500.00",imageUrl: "https://placehold.co/150x100/E0E0E0/white?text=Product",quantity: 9},
      {id: 21,name: "400 hole mini breadboard",reviews: "(0)",price: "₦1,200.00",imageUrl: "https://placehold.co/150x100/E0E0E0/white?text=Product",quantity: 9},
      {id: 23,name: "vero board big size stripped",reviews: "(0)",price: "₦1,000.00",imageUrl: "https://placehold.co/150x100/E0E0E0/white?text=Product",quantity: 9},
      {id: 25,name: "vero board big size dotted",reviews: "(0)",price: "₦900.00",imageUrl: "https://placehold.co/150x100/E0E0E0/white?text=Product",quantity: 9},
      {id: 27,name: "Arduino UNO R3 SMD with cable",reviews: "(0)",price: "₦8,000.00",imageUrl: "https://placehold.co/150x100/E0E0E0/white?text=Product",quantity: 9},
    ]
  },
  { name: "Resistors",
    items: [ 
      {id: 20,name: "10KΩ 1/4W resistor",reviews: "(0)",price: "₦20.00",imageUrl: "https://placehold.co/150x100/E0E0E0/white?text=Product",quantity: 9},
      {id: 22,name: "1KΩ 1/4W resistor",reviews: "(0)",price: "₦15.00",imageUrl: "https://placehold.co/150x100/E0E0E0/white?text=Product",quantity: 9},
      {id: 24,name: "220Ω 1/4W resistor",reviews: "(0)",price: "₦15.00",imageUrl: "https://placehold.co/150x100/E0E0E0/white?text=Product",quantity: 9},
      {id: 26,name: "100Ω 1/4W resistors",reviews: "(0)",price: "₦10.00",imageUrl: "https://placehold.co/150x100/E0E0E0/white?text=Product",quantity: 9},
      {id: 28,name: "330Ω 1/4W resistor",reviews: "(0)",price: "₦10.00",imageUrl: "https://placehold.co/150x100/E0E0E0/white?text=Product",quantity: 9},
      {id: 30,name: "4.7KΩ 1/4W resistor",reviews: "(0)",price: "₦10.00",imageUrl: "https://placehold.co/150x100/E0E0E0/white?text=Product",quantity: 9},
      {id: 32,name: "100KΩ 1/4W resistor",reviews: "(0)",price: "₦10.00",imageUrl: "https://placehold.co/150x100/E0E0E0/white?text=Product",quantity: 9},
      {id: 34,name: "Photoresistor LDR",reviews: "(0)",price: "₦100.00",imageUrl: "https://placehold.co/150x100/E0E0E0/white?text=Product",quantity: 9},
      {id: 36,name: "470Ω 1/4W resistor",reviews: "(0)",price: "₦10.00",imageUrl: "https://placehold.co/150x100/E0E0E0/white?text=Product",quantity: 9},
    ]
  },
  { name: "IC’s",
    items: [ 
      {id: 29,name: "L7805CV",reviews: "(0)",price: "₦300.00",imageUrl: "https://placehold.co/150x100/E0E0E0/white?text=Product",quantity: 9},
      {id: 31,name: "IC socket 28 pins",reviews: "(0)",price: "₦100.00",imageUrl: "https://placehold.co/150x100/E0E0E0/white?text=Product",quantity: 9},
      {id: 33,name: "NE555 Timer",reviews: "(0)",price: "₦150.00",imageUrl: "https://placehold.co/150x100/E0E0E0/white?text=Product",quantity: 9},
      {id: 35,name: "Hub360 Arduino starter kit with SMD UNO",reviews: "Rated 4.00 out of 5",price: "(1)",imageUrl: "https://placehold.co/150x100/E0E0E0/white?text=Product",quantity: 9},
      {id: 37,name: "L293 Motor driver IC",reviews: "(0)",price: "₦550.00",imageUrl: "https://placehold.co/150x100/E0E0E0/white?text=Product",quantity: 9},
      {id: 39,name: "ic socket 16 pin",reviews: "(0)",price: "₦90.00",imageUrl: "https://placehold.co/150x100/E0E0E0/white?text=Product",quantity: 9},
      {id: 41,name: "74HC595 Shift Register",reviews: "(0)",price: "₦250.00",imageUrl: "https://placehold.co/150x100/E0E0E0/white?text=Product",quantity: 9},
      {id: 43,name: "Atmega 328P-PU with bootloader",reviews: "(0)",price: "₦6,500.00",imageUrl: "https://placehold.co/150x100/E0E0E0/white?text=Product",quantity: 9},
      {id: 45,name: "Atmega 328P-PU",reviews: "(0)",price: "₦6,200.00",imageUrl: "https://placehold.co/150x100/E0E0E0/white?text=Product",quantity: 9},
    ]
  },
  { name: "Sensors",
    items: [ 
      {id: 38,name: "RC522 13.56MHz RFID card",reviews: "(0)",price: "₦300.00",imageUrl: "https://placehold.co/150x100/E0E0E0/white?text=Product",quantity: 9},
      {id: 40,name: "Photoresistor LDR",reviews: "(0)",price: "₦100.00",imageUrl: "https://placehold.co/150x100/E0E0E0/white?text=Product",quantity: 9},
      {id: 42,name: "HC-SR04 UltraSonic Sensor",reviews: "(0)",price: "₦2,500.00",imageUrl: "https://placehold.co/150x100/E0E0E0/white?text=Product",quantity: 9},
      {id: 44,name: "IR proximity sensor",reviews: "(0)",price: "₦850.00",imageUrl: "https://placehold.co/150x100/E0E0E0/white?text=Product",quantity: 9},
      {id: 46,name: "125KHZ RFID Card",reviews: "(0)",price: "₦300.00",imageUrl: "https://placehold.co/150x100/E0E0E0/white?text=Product",quantity: 9},
      {id: 48,name: "Hub360 Arduino starter kit with SMD UNO",reviews: "Rated 4.00 out of 5",price: "(1)",imageUrl: "https://placehold.co/150x100/E0E0E0/white?text=Product",quantity: 9},
      {id: 50,name: "PIR motion sensor",reviews: "(0)",price: "₦2,000.00",imageUrl: "https://placehold.co/150x100/E0E0E0/white?text=Product",quantity: 9},
      {id: 52,name: "Piezoelectric Transducer 27mm",reviews: "(0)",price: "₦200.00",imageUrl: "https://placehold.co/150x100/E0E0E0/white?text=Product",quantity: 9},
      {id: 54,name: "IR LED transmitter",reviews: "(0)",price: "₦70.00",imageUrl: "https://placehold.co/150x100/E0E0E0/white?text=Product",quantity: 9},
    ]
  },
  { name: "Others",
    items: [ 
      {id: 48,name: "PIR motion sensor",reviews: "(0)",price: "₦2,000.00",imageUrl: "https://placehold.co/150x100/E0E0E0/white?text=Product",quantity: 9},
      {id: 50,name: "Big LDR",reviews: "(0)",price: "₦800.00",imageUrl: "https://placehold.co/150x100/E0E0E0/white?text=Product",quantity: 9},
      {id: 52,name: "NTC-MF52AT 10k Thermistor",reviews: "(0)",price: "₦100.00",imageUrl: "https://placehold.co/150x100/E0E0E0/white?text=Product",quantity: 9},
      {id: 54,name: "Soil moisture sensor",reviews: "(0)",price: "₦1,800.00",imageUrl: "https://placehold.co/150x100/E0E0E0/white?text=Product",quantity: 9},
      {id: 56,name: "NRF24L01 RF Transceiver",reviews: "(0)",price: "₦1,700.00",imageUrl: "https://placehold.co/150x100/E0E0E0/white?text=Product",quantity: 9},
      {id: 58,name: "NTC 10D-9 thermistor",reviews: "(0)",price: "₦100.00",imageUrl: "https://placehold.co/150x100/E0E0E0/white?text=Product",quantity: 9},
      {id: 60,name: "HX711 Weighing sensor",reviews: "(0)",price: "₦1,500.00",imageUrl: "https://placehold.co/150x100/E0E0E0/white?text=Product",quantity: 9},
      {id: 62,name: "50kg load cell",reviews: "(0)",price: "₦1,300.00",imageUrl: "https://placehold.co/150x100/E0E0E0/white?text=Product",quantity: 9},
      {id: 64,name: "HYSRF05 5pin Ultrasonic sensor",reviews: "(0)",price: "₦4,300.00",imageUrl: "https://placehold.co/150x100/E0E0E0/white?text=Product",quantity: 9},
    ],
  },
]

export default function SearchProducts() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isFocused, setIsFocused] = useState(false)

  // Filter products by category
  const filteredCategories = mockProducts_Later
    .map((category) => {
      const filteredItems = category.items.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      return { ...category, items: filteredItems }
    })
    .filter((category) => category.items.length > 0)

  return (
      <div className="relative w-full ">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 150)} // slight delay for click
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
        />

        {/* Autocomplete Dropdown */}
        {isFocused && searchTerm.trim() && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-80 overflow-y-auto z-50">
            {filteredCategories.length === 0 ? (
              <div className="p-4 text-gray-500 text-sm">No results found.</div>
            ) : (
              filteredCategories.map((category) => (
                <div key={category.name} className="border-b last:border-none">
                  <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase bg-gray-50">
                    {category.name}
                  </div>
                  {category.items.map((item) => (
                    <button
                      key={`${category.name}-${item.id}`}
                      onClick={() => alert(`Selected: ${item.name}`)}
                      className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-100 text-left"
                    >
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-10 h-10 object-cover rounded"
                      />
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">{item.name}</span>
                        <span className="text-xs text-gray-500">{item.price}</span>
                      </div>
                    </button>
                  ))}
                </div>
              ))
            )}
          </div>
        )}
      </div>
  )
}
