class Radar {
  sections: Array<Section>;
  rings: Array<Ring>;
  items: Array<Item>;

  constructor() {
    this.sections = new Array<Section>();
    this.rings = new Array<Ring>();
    this.items = new Array<Item>();
  }

  addSection(sectionTitle: String) {
    const section = new Section(this.sections.length, sectionTitle, this);

    this.sections.push(section);
  }

  addRing(ringTitle: String) {
    let ring = new Ring(this.rings.length, ringTitle, this);

    this.rings.push(ring);
  }

  addItem(title: String, section: Section, ring: Ring) {
    const item = new Item(this, title, section, ring);

    this.items.push(item);
  }
}

class Section {
  id: number;
  title: String;
  radar: Radar;

  constructor(id: number, title: String, radar: Radar) {
    this.id = id;
    this.title = title;
    this.radar = radar;
  }

  getSectionAngleMinMax() {
    return [
      (this.id * 2 * Math.PI) / this.radar.sections.length,
      ((this.id + 1) * 2 * Math.PI) / this.radar.sections.length,
    ];
  }
}

class Ring {
  id: number;
  title: String;
  radar: Radar;

  constructor(id: number, title: String, radar: Radar) {
    this.id = id;
    this.title = title;
    this.radar = radar;
  }

  getRingRadiusMinMax() {
    return [this.id, this.id + 1];
  }
}

class Item {
  title: String;
  section: Section;
  ring: Ring;
  radar: Radar;
  x: Number;
  y: Number;

  constructor(radar: Radar, title: String, section: Section, ring: Ring) {
    this.radar = radar;
    this.title = title;
    this.section = section;
    this.ring = ring;

    const randomCoordinates = this.getRandomCoordinates();
    this.x = randomCoordinates[0];
    this.y = randomCoordinates[1];
  }

  getRandomAngle() {
    const angleMinMax = this.section.getSectionAngleMinMax();

    return Math.random() * (angleMinMax[1] - angleMinMax[0]) + angleMinMax[0];
  }

  getRandomRadius() {
    const radiusMinMax = this.ring.getRingRadiusMinMax();

    return (
      Math.random() * (radiusMinMax[1] - radiusMinMax[0]) + radiusMinMax[0]
    );
  }

  getRandomCoordinates() {
    const randomAngle = this.getRandomAngle();
    const randomRadius = this.getRandomRadius();

    const defaultX = Math.cos(randomAngle);
    const defaultY = Math.sin(randomAngle);

    const x = defaultX + randomRadius * Math.cos(randomAngle);
    const y = defaultY + randomRadius * Math.sin(randomAngle);

    return [x, y];
  }
}

