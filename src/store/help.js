function parseProducts(raw) {
  // Split on blank lines (one or more) to get each product block
  const blocks = raw
    .trim()
    .split(/\n{2,}/)
    .map((b) => b.trim());

  return blocks.map((block, idx) => {
    // Each block has 3 lines: name, reviews, price
    const [nameLine, reviewsLine, priceLine] = block.split("\n").map((l) => l.trim());
    return {
      id: idx + 1,
      name: nameLine,
      reviews: reviewsLine,
      price: priceLine,
      imageUrl: `https://placehold.co/150x100/E0E0E0/white?text=Product`,
    };
  });
}

// Example usage:
const raw = `
L7805CV
(0)
 ₦300.00

IC socket 28 pins
(0)
 ₦100.00

NE555 Timer
(0)
 ₦150.00

Hub360 Arduino starter kit with SMD UNO
Rated 4.00 out of 5
(1)
 ₦40,000.00

L293 Motor driver IC
(0)
 ₦550.00

ic socket 16 pin
(0)
 ₦90.00

74HC595 Shift Register
(0)
 ₦250.00

Atmega 328P-PU with bootloader
(0)
 ₦6,500.00

Atmega 328P-PU
(0)
 ₦6,200.00
`;

console.log(parseProducts(raw));
