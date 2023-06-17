MATCH (source: Node{id: 80}), (target: Node{id: 38})
CALL gds.shortestPath.dijkstra.stream("graph", {
    sourceNode: source,
    targetNode: target
})
YIELD nodeIds
RETURN nodeIds
