interface Navigator extends Navigator {
  getBattery?: () => Promise<void>;
}
