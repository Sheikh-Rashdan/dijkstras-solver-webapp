class Edge {
    constructor(id, startPos, finishPos, highlight = false) {
        this.id = id;
        this.startPos = startPos;
        this.finishPos = finishPos;
        this.highlight = highlight;
    }
}

export default Edge;