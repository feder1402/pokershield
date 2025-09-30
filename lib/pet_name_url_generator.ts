import adjectives from "./data/adjectives.json";
import animals from "./data/animals.json";

  export function petNameUrlGenerator() {
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const animal = animals[Math.floor(Math.random() * animals.length)];
    return `${adjective}-${animal}-${Math.floor(Math.random() * 1000)}`.toLowerCase();
  }