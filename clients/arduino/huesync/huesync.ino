#include "Wire.h"

/*
 * PWR - -- gnd -- black -- Gnd
 * PWR + -- +5V -- red   -- 5V
 * I2C d -- SDA -- green -- SDA (A4 for Leonardo, 2 for Micro)
 * I2C c -- SCK -- blue  -- SCL (A5 for Leonardo, 3 for Micro)
 */

class BlinkM {
  public:
    BlinkM();
    BlinkM(byte address);
    void setRGB(byte r, byte g, byte b);
    void stopScript();
  private:
    byte address;
};

BlinkM::BlinkM() {
  address = 9;
}

BlinkM::BlinkM(byte addr) {
  address = addr;
}

void BlinkM::setRGB(byte r, byte g, byte b) {
  Wire.beginTransmission(address);
  Wire.write('n');
  Wire.write(r);
  Wire.write(g);
  Wire.write(b);
  Wire.endTransmission();
}

void BlinkM::stopScript() {
  Wire.beginTransmission(address);
  Wire.write('o');
  Wire.endTransmission();
}

BlinkM led = BlinkM();

void setup() {
  Wire.begin();
  led.stopScript();
  Serial.begin(9600);
}

byte r = 0, g = 0, b = 0;

void loop() {
  if (Serial.available() >= 3) {
    r = Serial.read();
    g = Serial.read();
    b = Serial.read();

    led.setRGB(r, g, b);
  }
}

