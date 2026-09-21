class Edge {
    constructor(id, weight, startPos, finishPos, highlight = false) {
        this.id = id;
        this.weight = weight;
        this.startPos = startPos;
        this.finishPos = finishPos;
        this.highlight = highlight;
    }
}

export default Edge;