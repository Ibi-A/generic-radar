class Radar {
    sections: Array<Section>;
    rings: Array<Ring>;
}

class Section {
    id: number;
    title: String;
}

class Ring {
    id: number;
    title: String;
}

class Item {
    title: String;
    section: Section;
    ring: Ring;
}